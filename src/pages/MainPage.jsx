import React, { useState } from "react";
import Header from "../components/Header/Header";
import Main from "../components/Main/Main";
import PopNewCard from "../components/PopNewCard/PopNewCard";
import PopBrowse from "../components/PopBrowse/PopBrowse";
import ExitPopup from "../components/ExitPopup/ExitPopup";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "../main.scss";

export default function MainPage() {
  const [isPopExitOpen, setIsPopExitOpen] = useState(false);
  const [isPopNewCardOpen, setIsPopNewCardOpen] = useState(false);
  const [isPopBrowseOpen, setIsPopBrowseOpen] = useState(false);

  const navigate = useNavigate();
  const { logout } = useAuth();

  const openPopExit = () => setIsPopExitOpen(true);
  const closePopExit = () => setIsPopExitOpen(false);

  const openPopNewCard = () => setIsPopNewCardOpen(true);
  const closePopNewCard = () => setIsPopNewCardOpen(false);

  const openPopBrowse = () => setIsPopBrowseOpen(true);
  const closePopBrowse = () => setIsPopBrowseOpen(false);

  // ✅ подтверждение выхода
  const handleConfirmExit = () => {
    logout();
    closePopExit();
    navigate("/login");
  };

  const columnsData = [
    {
      title: "Без статуса",
      tasks: [
        { category: "Web Design", title: "Название задачи 1", date: "30.10.23" },
        { category: "Research", title: "Название задачи 2", date: "30.10.23" },
        { category: "Copywriting", title: "Название задачи 3", date: "30.10.23" },
      ],
    },
    {
      title: "Нужно сделать",
      tasks: [
        { category: "Research", title: "Название задачи 4", date: "30.10.23" },
        { category: "Web Design", title: "Название задачи 5", date: "30.10.23" },
      ],
    },
    {
      title: "В работе",
      tasks: [
        { category: "Copywriting", title: "Название задачи 6", date: "30.10.23" },
        { category: "Research", title: "Название задачи 7", date: "30.10.23" },
      ],
    },
    {
      title: "Тестирование",
      tasks: [
        { category: "Web Design", title: "Название задачи 8", date: "30.10.23" },
        { category: "Research", title: "Название задачи 9", date: "30.10.23" },
      ],
    },
    {
      title: "Готово",
      tasks: [
        { category: "Copywriting", title: "Название задачи 10", date: "30.10.23" },
        { category: "Web Design", title: "Название задачи 11", date: "30.10.23" },
      ],
    },
  ];

  return (
    <div className="wrapper">
      {/* Передаём колбэк выхода в Header */}
      <Header onOpenPopNewCard={openPopNewCard} onOpenPopExit={openPopExit} />
      <Main columns={columnsData} onOpenPopBrowse={openPopBrowse} />

      {isPopNewCardOpen && <PopNewCard onClose={closePopNewCard} />}
      {isPopBrowseOpen && <PopBrowse onClose={closePopBrowse} />}
      {isPopExitOpen && (
        <ExitPopup
          onClose={closePopExit}
          onConfirm={handleConfirmExit} // ✅ добавлен колбэк
        />
      )}
    </div>
  );
}
