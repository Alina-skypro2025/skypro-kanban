
import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {
  Overlay,
  Modal,
  LeftSide,
  Title,
  Label,
  Input,
  Textarea,
  CategoryList,
  CategoryItem,
  colors,
  CalendarWrap,
  CreateBtn,
  CloseBtn,
} from "./PopNewCard.styled";

export default function PopNewCard({ onClose, onCreate }) {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [date, setDate] = useState(null);
  const [category, setCategory] = useState("");

  const categories = [
    { name: "Web Design", color: colors.web },
    { name: "Research", color: colors.research },
    { name: "Copywriting", color: colors.copy },
  ];

  const handleCreate = async () => {
    if (!title.trim() || !date || !category) {
      alert("Заполните название, дату и категорию");
      return;
    }
    const payload = {
      title: title.trim(),
      description: desc || "",
      topic: category, 
      status: "Без статуса",
      date, 
    };

    try {
      await onCreate?.(payload);
      onClose?.();
    } catch (e) {
      alert(e.message || "Не удалось создать задачу. Попробуйте позже.");
    }
  };

  return (
    <Overlay>
      <Modal>
        <CloseBtn onClick={onClose}>×</CloseBtn>

        <LeftSide>
          <Title>Создание задачи</Title>

          <div>
            <Label>Название задачи</Label>
            <Input
              placeholder="Введите название задачи…"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div>
            <Label>Описание задачи</Label>
            <Textarea
              placeholder="Введите описание задачи…"
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
            />
          </div>

          <div>
            <Label>Категория</Label>
            <CategoryList>
              {categories.map((c) => (
                <CategoryItem
                  key={c.name}
                  color={c.color}
                  $active={category === c.name} 
                  type="button"
                  onClick={() => setCategory(c.name)}
                >
                  {c.name}
                </CategoryItem>
              ))}
            </CategoryList>
          </div>

          <CreateBtn onClick={handleCreate}>Создать задачу</CreateBtn>
        </LeftSide>

        <CalendarWrap>
          <Label>Даты</Label>
          <DatePicker selected={date} onChange={(d) => setDate(d)} inline />
          <p style={{ marginTop: 8, color: "#888", fontSize: 14 }}>
            Выберите срок исполнения
          </p>
        </CalendarWrap>
      </Modal>
    </Overlay>
  );
}
