import React, { useMemo, useState } from "react";
import styled from "styled-components";
import { updateTask, deleteTask } from "../../services/tasks";


const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.35);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

const Modal = styled.div`
  width: 780px;
  max-width: 95%;
  background: #ffffff;
  border-radius: 10px;
  padding: 32px 36px 28px;
  box-shadow: 0 10px 39px rgba(26, 56, 101, 0.21);
  border: 0.7px solid #d4dbe5;
  font-family: inherit;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 26px;
`;

const TitleInput = styled.input`
  font-size: 20px;
  font-weight: 600;
  border: none;
  width: 100%;
  outline: none;
  padding: 2px 4px 4px;
  color: #000;
  background: ${({ disabled }) => (disabled ? "transparent" : "#f4f6fa")};
  border-radius: 4px;
`;

const Tag = styled.div`
  min-width: 110px;
  text-align: center;
  background: ${({ $topic }) =>
    $topic === "Web Design"
      ? "#FFE4C2"
      : $topic === "Research"
      ? "#B4FDD1"
      : $topic === "Copywriting"
      ? "#E9D4FF"
      : "#EAEEF6"};
  color: ${({ $topic }) =>
    $topic === "Web Design"
      ? "#FF6D00"
      : $topic === "Research"
      ? "#06B16E"
      : $topic === "Copywriting"
      ? "#9A48F1"
      : "#94A6BE"};
  font-size: 12px;
  font-weight: 600;
  padding: 6px 16px;
  border-radius: 24px;
`;

const Layout = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 1.1fr) 260px;
  gap: 40px;
`;

const Label = styled.p`
  font-size: 14px;
  font-weight: 600;
  color: #000;
  margin: 0 0 10px;
`;

const StatusList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 20px;
`;

const StatusButton = styled.button`
  padding: 9px 14px;
  border-radius: 20px;
  border: 0.7px solid rgba(148, 166, 190, 0.4);
  background: ${({ $active }) => ($active ? "#94A6BE" : "#ffffff")};
  color: ${({ $active }) => ($active ? "#ffffff" : "#000000")};
  font-size: 13px;
  cursor: ${({ $disabled }) => ($disabled ? "default" : "pointer")};
  pointer-events: ${({ $disabled }) => ($disabled ? "none" : "auto")};
  transition: background 0.12s ease, color 0.12s ease;

  &:hover {
    background: ${({ $disabled }) => ($disabled ? undefined : "#e1e7f2")};
  }
`;

const Textarea = styled.textarea`
  width: 100%;
  min-height: 160px;
  resize: vertical;
  border: 0.7px solid rgba(148, 166, 190, 0.4);
  border-radius: 8px;
  padding: 12px 14px;
  font-size: 14px;
  line-height: 1.4;
  outline: none;

  &:focus {
    box-shadow: 0 0 0 2px rgba(86, 94, 239, 0.12);
    border-color: #565eef;
  }
`;


const CalendarWrap = styled.div``;

const CalendarHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 6px;
`;

const CalendarMonth = styled.div`
  font-size: 14px;
  font-weight: 600;
  color: #000;
`;

const CalendarNavBtn = styled.button`
  width: 24px;
  height: 24px;
  border-radius: 50%;
  border: none;
  background: #f4f6fa;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #94a6be;
  cursor: ${({ disabled }) => (disabled ? "default" : "pointer")};
  pointer-events: ${({ disabled }) => (disabled ? "none" : "auto")};

  svg {
    width: 10px;
    height: 10px;
  }
`;

const WeekDaysRow = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  margin-bottom: 4px;
`;

const Weekday = styled.div`
  text-align: center;
  font-size: 10px;
  color: #94a6be;
`;

const DaysGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 4px;
  margin-bottom: 6px;
`;

const DayCell = styled.button`
  height: 28px;
  border-radius: 50%;
  border: none;
  background: ${({ $selected }) => ($selected ? "#94A6BE" : "transparent")};
  color: ${({ $selected, $muted }) =>
    $selected ? "#ffffff" : $muted ? "#C9D3E3" : "#000000"};
  font-size: 12px;
  cursor: ${({ disabled }) => (disabled ? "default" : "pointer")};
  pointer-events: ${({ disabled }) => (disabled ? "none" : "auto")};

  &:hover {
    background: ${({ disabled, $selected }) =>
      disabled || $selected ? undefined : "#e1e7f2"};
  }
`;

const SelectedInfo = styled.p`
  margin: 0;
  margin-top: 4px;
  color: #94a6be;
  font-size: 12px;
`;


const Footer = styled.div`
  margin-top: 26px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
`;

const FooterLeft = styled.div`
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
`;

const FooterRight = styled.div`
  display: flex;
  gap: 10px;
`;

const FooterButton = styled.button`
  min-width: 120px;
  padding: 9px 16px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  border: ${({ $variant }) =>
    $variant === "primary"
      ? "none"
      : $variant === "danger"
      ? "1px solid #ff5c5c"
      : "1px solid rgba(148, 166, 190, 0.7)"};
  background: ${({ $variant }) =>
    $variant === "primary"
      ? "#565EEF"
      : $variant === "danger"
      ? "#ffffff"
      : "#ffffff"};
  color: ${({ $variant }) =>
    $variant === "primary"
      ? "#ffffff"
      : $variant === "danger"
      ? "#ff5c5c"
      : "#565eef"};

  &:hover {
    background: ${({ $variant }) =>
      $variant === "primary" ? "#474fd8" : "#f4f6fa"};
  }
`;


const STATUSES = [
  "Без статуса",
  "Нужно сделать",
  "В работе",
  "Тестирование",
  "Готово",
];


function getMonthMatrix(year, month) {
  const first = new Date(year, month, 1);
  const start = new Date(first);
  start.setDate(first.getDate() - ((first.getDay() + 6) % 7)); 

  return Array.from({ length: 42 }, (_, i) => {
    const d = new Date(start);
    d.setDate(start.getDate() + i);
    return d;
  });
}


const formatDate = (d) =>
  `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(
    d.getDate()
  ).padStart(2, "0")}`;


function parseTaskDate(value) {
  if (!value) return new Date();

  if (typeof value === "string") {
    const [datePart] = value.split("T"); 
    const [y, m, d] = datePart.split("-");
    const yy = Number(y),
      mm = Number(m),
      dd = Number(d);
    if (!isNaN(yy) && !isNaN(mm) && !isNaN(dd)) {
      
      return new Date(yy, mm - 1, dd);
    }
  }

  const parsed = new Date(value);
  return isNaN(parsed.getTime()) ? new Date() : parsed;
}

const MONTH_FORMAT = new Intl.DateTimeFormat("ru-RU", {
  month: "long",
  year: "numeric",
});


export default function TaskModal({ task, token, onClose, onUpdate, onDelete }) {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(task.title);
  const [status, setStatus] = useState(task.status);
  const [description, setDescription] = useState(task.description || "");

  
  const safeDate = parseTaskDate(task.date);

  const [selected, setSelected] = useState(safeDate);
  const [currentYM, setCurrentYM] = useState({
    y: safeDate.getFullYear(),
    m: safeDate.getMonth(),
  });

  const days = useMemo(
    () => getMonthMatrix(currentYM.y, currentYM.m),
    [currentYM]
  );

  const isSameDay = (a, b) =>
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate();

  // ===== Сохранение =====
  const handleSave = async () => {
    if (!title.trim()) {
      alert("Название задачи не может быть пустым");
      return;
    }

    const body = {
      title,
      description,
      status,
      topic: task.topic,
      
      date: formatDate(selected),
    };

    try {
      const updated = await updateTask(task._id || task.id, body, token);
      if (onUpdate) onUpdate(updated);
      setIsEditing(false);
      onClose();
    } catch (e) {
      alert("Ошибка при сохранении: " + e.message);
    }
  };

  
  const handleDelete = async () => {
    if (!window.confirm("Удалить задачу?")) return;

    try {
      await deleteTask(task._id || task.id, token);
      if (onDelete) onDelete(task._id || task.id);
      onClose();
    } catch (e) {
      alert("Ошибка при удалении: " + e.message);
    }
  };

  const goPrevMonth = () => {
    if (!isEditing) return;
    setCurrentYM((p) => ({
      y: p.m === 0 ? p.y - 1 : p.y,
      m: (p.m + 11) % 12,
    }));
  };

  const goNextMonth = () => {
    if (!isEditing) return;
    setCurrentYM((p) => ({
      y: p.m === 11 ? p.y + 1 : p.y,
      m: (p.m + 1) % 12,
    }));
  };

  const handleSelectDay = (d) => {
    if (!isEditing) return;
    setSelected(d);
  };

  return (
    <Overlay>
      <Modal>
        {/* HEADER */}
        <Header>
          <TitleInput
            disabled={!isEditing}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <Tag $topic={task.topic}>{task.topic}</Tag>
        </Header>

        {/* CONTENT */}
        <Layout>
          {/* LEFT COLUMN */}
          <div>
            <Label>Статус</Label>
            <StatusList>
              {STATUSES.map((s) => (
                <StatusButton
                  key={s}
                  $active={s === status}
                  $disabled={!isEditing}
                  onClick={() => isEditing && setStatus(s)}
                >
                  {s}
                </StatusButton>
              ))}
            </StatusList>

            <Label>Описание задачи</Label>
            <Textarea
              disabled={!isEditing}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Введите описание задачи..."
            />
          </div>

          {/* RIGHT COLUMN — CALENDAR */}
          <CalendarWrap>
            <Label>Дата</Label>

            <CalendarHeader>
              <CalendarNavBtn disabled={!isEditing} onClick={goPrevMonth}>
                <svg viewBox="0 0 20 20">
                  <path d="M12 15L7 10L12 5" stroke="#94A6BE" strokeWidth="2" />
                </svg>
              </CalendarNavBtn>

              <CalendarMonth>
                {MONTH_FORMAT.format(new Date(currentYM.y, currentYM.m, 1))}
              </CalendarMonth>

              <CalendarNavBtn disabled={!isEditing} onClick={goNextMonth}>
                <svg viewBox="0 0 20 20">
                  <path d="M8 5L13 10L8 15" stroke="#94A6BE" strokeWidth="2" />
                </svg>
              </CalendarNavBtn>
            </CalendarHeader>

            <WeekDaysRow>
              {["пн", "вт", "ср", "чт", "пт", "сб", "вс"].map((d) => (
                <Weekday key={d}>{d}</Weekday>
              ))}
            </WeekDaysRow>

            <DaysGrid>
              {days.map((d, i) => (
                <DayCell
                  key={i}
                  $muted={d.getMonth() !== currentYM.m}
                  $selected={isSameDay(d, selected)}
                  disabled={!isEditing}
                  onClick={() => handleSelectDay(d)}
                >
                  {d.getDate()}
                </DayCell>
              ))}
            </DaysGrid>

            <SelectedInfo>Выбрано: {formatDate(selected)}</SelectedInfo>
          </CalendarWrap>
        </Layout>

        {/* FOOTER */}
        <Footer>
          <FooterLeft>
            {!isEditing ? (
              <>
                <FooterButton
                  $variant="secondary"
                  onClick={() => setIsEditing(true)}
                >
                  Редактировать задачу
                </FooterButton>
                <FooterButton $variant="danger" onClick={handleDelete}>
                  Удалить задачу
                </FooterButton>
              </>
            ) : (
              <>
                <FooterButton $variant="primary" onClick={handleSave}>
                  Сохранить
                </FooterButton>
                <FooterButton
                  $variant="secondary"
                  onClick={() => {
                    setTitle(task.title);
                    setStatus(task.status);
                    setDescription(task.description || "");
                    const resetDate = parseTaskDate(task.date);
                    setSelected(resetDate);
                    setCurrentYM({
                      y: resetDate.getFullYear(),
                      m: resetDate.getMonth(),
                    });
                    setIsEditing(false);
                  }}
                >
                  Отменить
                </FooterButton>
                <FooterButton $variant="danger" onClick={handleDelete}>
                  Удалить задачу
                </FooterButton>
              </>
            )}
          </FooterLeft>

          <FooterRight>
            <FooterButton $variant="secondary" onClick={onClose}>
              Закрыть
            </FooterButton>
          </FooterRight>
        </Footer>
      </Modal>
    </Overlay>
  );
}
