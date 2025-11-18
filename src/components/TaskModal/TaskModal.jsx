import React, { useMemo, useState } from "react";
import styled from "styled-components";
import { deleteTask, updateTask } from "../../services/tasks";

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
  width: 760px;
  max-width: 95%;
  background: #fff;
  border-radius: 10px;
  padding: 32px 36px 28px;
  box-shadow: 0 10px 39px rgba(26, 56, 101, 0.21);
  border: 0.7px solid #d4dbe5;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 26px;
`;

const Title = styled.h3`
  font-size: 20px;
  font-weight: 600;
  color: #000;
`;

const Tag = styled.div`
  background: ${(p) =>
    p.$topic === "Web Design"
      ? "#FFE4C2"
      : p.$topic === "Research"
      ? "#B4FDD1"
      : p.$topic === "Copywriting"
      ? "#E9D4FF"
      : "#EAEEF6"};
  color: ${(p) =>
    p.$topic === "Web Design"
      ? "#FF6D00"
      : p.$topic === "Research"
      ? "#06B16E"
      : p.$topic === "Copywriting"
      ? "#9A48F1"
      : "#94A6BE"};
  font-size: 12px;
  font-weight: 600;
  padding: 6px 14px;
  border-radius: 24px;
`;

const Layout = styled.div`
  display: grid;
  grid-template-columns: 1fr 260px;
  gap: 36px;
  @media (max-width: 720px) {
    grid-template-columns: 1fr;
  }
`;

const Label = styled.p`
  font-size: 14px;
  font-weight: 600;
  color: #000;
  margin-bottom: 10px;
`;

const StatusList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-bottom: 18px;
`;

const StatusButton = styled.button`
  padding: 10px 14px;
  border-radius: 20px;
  border: 0.7px solid rgba(148, 166, 190, 0.4);
  background: ${(p) => (p.$active ? "#94A6BE" : "#fff")};
  color: ${(p) => (p.$active ? "#fff" : "#000")};
  font-size: 14px;
  font-weight: 500;
  cursor: ${(p) => (p.$disabled ? "default" : "pointer")};
  pointer-events: ${(p) => (p.$disabled ? "none" : "auto")};
  &:hover {
    background: ${(p) => (p.$active ? "#94A6BE" : "#EAEEF6")};
  }
`;

const Textarea = styled.textarea`
  width: 100%;
  height: 160px;
  border: 0.7px solid rgba(148, 166, 190, 0.4);
  border-radius: 8px;
  padding: 14px;
  font-size: 14px;
  color: #000;
  resize: none;
  background: ${(p) => (p.disabled ? "#f5f7fb" : "#fff")};
  &::placeholder {
    color: #94a6be;
  }
`;

const CalendarWrap = styled.div``;
const CalendarHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #94a6be;
  font-size: 14px;
  font-weight: 600;
  margin-bottom: 8px;
`;
const NavButton = styled.button`
  width: 28px;
  height: 28px;
  border-radius: 6px;
  border: 0.7px solid rgba(148, 166, 190, 0.4);
  background: #fff;
  cursor: pointer;
`;

const Weekdays = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  margin: 6px 0 4px;
`;
const Weekday = styled.div`
  text-align: center;
  font-size: 10px;
  color: #94a6be;
  font-weight: 500;
`;
const DaysGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 4px;
  margin-bottom: 12px;
`;
const DayCell = styled.button`
  height: 28px;
  border-radius: 50%;
  border: none;
  background: ${(p) => (p.$selected ? "#94A6BE" : "transparent")};
  color: ${(p) => (p.$muted ? "#C9D3E3" : p.$selected ? "#fff" : "#000")};
  font-size: 12px;
  cursor: ${(p) => (p.disabled ? "default" : "pointer")};
  &:hover {
    background: ${(p) => (p.$selected ? "#94A6BE" : "#EAEEF6")};
  }
`;

const CalendarFooter = styled.p`
  color: #94a6be;
  font-size: 12px;
`;

const ButtonsRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 24px;
  flex-wrap: wrap;
  gap: 10px;
`;

const LeftGroup = styled.div`
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
`;

const Button = styled.button`
  height: 36px;
  padding: 0 18px;
  border-radius: 4px;
  border: ${(p) =>
    p.$type === "outline" ? "1px solid #565EEF" : "none"};
  background: ${(p) =>
    p.$type === "filled" ? "#565EEF" : "transparent"};
  color: ${(p) =>
    p.$type === "filled" ? "#fff" : "#565EEF"};
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: 0.2s ease;
  &:hover {
    opacity: 0.9;
  }
`;

function getMonthMatrix(year, month) {
  const firstDay = new Date(year, month, 1);
  const start = new Date(firstDay);
  start.setDate(firstDay.getDate() - ((firstDay.getDay() + 6) % 7));
  return Array.from({ length: 42 }, (_, i) => {
    const d = new Date(start);
    d.setDate(start.getDate() + i);
    return d;
  });
}

export default function TaskModal({ task, token, onClose, onUpdate, onDelete }) {
  const [isEditing, setIsEditing] = useState(false);
  const [status, setStatus] = useState(task.status);
  const [description, setDescription] = useState(task.description || "");
  const initial = task.date ? new Date(task.date) : new Date();
  const [currentYM, setCurrentYM] = useState({
    y: initial.getFullYear(),
    m: initial.getMonth(),
  });
  const [selected, setSelected] = useState(initial);

  const days = useMemo(() => getMonthMatrix(currentYM.y, currentYM.m), [currentYM]);

  // === Сохранение ===
  const handleSave = async () => {
    try {
      const updated = await updateTask(token, task.id || task._id, {
        title: task.title,
        description,
        status,
        topic: task.topic,
        date: selected.toISOString().split("T")[0],
      });

      const updatedTask = Array.isArray(updated) ? updated[0] : updated;
      if (onUpdate) onUpdate(updatedTask);

      setIsEditing(false);
      onClose(); 
    } catch (error) {
      console.error("Ошибка при сохранении:", error);
      alert("Ошибка при сохранении: " + error.message);
    }
  };

  // === Удаление ===
  const handleDelete = async () => {
    if (!window.confirm("Удалить задачу?")) return;
    await deleteTask(token, task.id || task._id);
    if (onDelete) onDelete(task.id || task._id);
    onClose();
  };

  const isSameDay = (a, b) =>
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate();

  return (
    <Overlay>
      <Modal>
        <Header>
          <Title>{task.title}</Title>
          <Tag $topic={task.topic}>{task.topic || "Web Design"}</Tag>
        </Header>

        <Layout>
          <div>
            <Label>Статус</Label>
            <StatusList>
              {["Без статуса", "Нужно сделать", "В работе", "Тестирование", "Готово"].map(
                (s) => (
                  <StatusButton
                    key={s}
                    $active={s === status}
                    onClick={() => isEditing && setStatus(s)}
                    $disabled={!isEditing}
                  >
                    {s}
                  </StatusButton>
                )
              )}
            </StatusList>

            <Label>Описание задачи</Label>
            <Textarea
              placeholder="Введите описание задачи..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              disabled={!isEditing}
            />
          </div>

          {/* Календарь */}
          <CalendarWrap>
            <Label>Даты</Label>
            <CalendarHeader>
              {new Intl.DateTimeFormat("ru-RU", {
                month: "long",
                year: "numeric",
              }).format(new Date(currentYM.y, currentYM.m, 1))}
              <div style={{ display: "flex", gap: 6 }}>
                <NavButton
                  onClick={() =>
                    setCurrentYM((p) => ({
                      y: p.m === 0 ? p.y - 1 : p.y,
                      m: (p.m + 11) % 12,
                    }))
                  }
                >
                  ‹
                </NavButton>
                <NavButton
                  onClick={() =>
                    setCurrentYM((p) => ({
                      y: p.m === 11 ? p.y + 1 : p.y,
                      m: (p.m + 1) % 12,
                    }))
                  }
                >
                  ›
                </NavButton>
              </div>
            </CalendarHeader>

            <Weekdays>
              {["пн", "вт", "ср", "чт", "пт", "сб", "вс"].map((d) => (
                <Weekday key={d}>{d}</Weekday>
              ))}
            </Weekdays>

            <DaysGrid>
              {days.map((d, i) => (
                <DayCell
                  key={i}
                  $muted={d.getMonth() !== currentYM.m}
                  $selected={isSameDay(d, selected)}
                  disabled={!isEditing}
                  onClick={() => isEditing && setSelected(d)}
                >
                  {d.getDate()}
                </DayCell>
              ))}
            </DaysGrid>

            <CalendarFooter>
              Срок исполнения:{" "}
              {selected.toLocaleDateString("ru-RU", {
                day: "2-digit",
                month: "2-digit",
                year: "2-digit",
              })}
            </CalendarFooter>
          </CalendarWrap>
        </Layout>

        <ButtonsRow>
          <LeftGroup>
            {!isEditing ? (
              <>
                <Button $type="outline" onClick={() => setIsEditing(true)}>
                  Редактировать задачу
                </Button>
                <Button $type="outline" onClick={handleDelete}>
                  Удалить задачу
                </Button>
              </>
            ) : (
              <>
                <Button $type="filled" onClick={handleSave}>
                  Сохранить
                </Button>
                <Button $type="outline" onClick={() => setIsEditing(false)}>
                  Отменить
                </Button>
                <Button $type="outline" onClick={handleDelete}>
                  Удалить задачу
                </Button>
              </>
            )}
          </LeftGroup>

          <Button $type="filled" onClick={onClose}>
            Закрыть
          </Button>
        </ButtonsRow>
      </Modal>
    </Overlay>
  );
}
