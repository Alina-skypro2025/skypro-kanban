import React, { useState } from 'react';
import Header from './components/Header/Header';
import Main from './components/Main/Main';
import PopNewCard from './components/PopNewCard/PopNewCard';
import PopBrowse from './components/PopBrowse/PopBrowse'; // если есть
import ExitPopup from './components/ExitPopup/ExitPopup'; // если есть
import './main.scss';

export default function App() {
  const [isPopExitOpen, setIsPopExitOpen] = useState(false);
  const [isPopNewCardOpen, setIsPopNewCardOpen] = useState(false);
  const [isPopBrowseOpen, setIsPopBrowseOpen] = useState(false);

  // ===== Управление попапами =====
  const openPopExit = () => setIsPopExitOpen(true);
  const closePopExit = () => setIsPopExitOpen(false);

  const openPopNewCard = () => setIsPopNewCardOpen(true);
  const closePopNewCard = () => setIsPopNewCardOpen(false);

  const openPopBrowse = () => setIsPopBrowseOpen(true);
  const closePopBrowse = () => setIsPopBrowseOpen(false);

  // ===== Данные для всех колонок =====
  // Колонки и задачи сделаны так, чтобы соответствовать макету
  const columnsData = [
    {
      title: 'Без статуса',
      tasks: [
        { category: 'Web Design', title: 'Название задачи 1', date: '30.10.23' },
        { category: 'Research', title: 'Название задачи 2', date: '30.10.23' },
        { category: 'Copywriting', title: 'Название задачи 3', date: '30.10.23' },
      ],
    },
    {
      title: 'Нужно сделать',
      tasks: [
        { category: 'Research', title: 'Название задачи 4', date: '30.10.23' },
        { category: 'Web Design', title: 'Название задачи 5', date: '30.10.23' },
      ],
    },
    {
      title: 'В работе',
      tasks: [
        { category: 'Copywriting', title: 'Название задачи 6', date: '30.10.23' },
        { category: 'Research', title: 'Название задачи 7', date: '30.10.23' },
      ],
    },
    {
      title: 'Тестирование',
      tasks: [
        { category: 'Web Design', title: 'Название задачи 8', date: '30.10.23' },
        { category: 'Research', title: 'Название задачи 9', date: '30.10.23' },
      ],
    },
    {
      title: 'Готово',
      tasks: [
        { category: 'Copywriting', title: 'Название задачи 10', date: '30.10.23' },
        { category: 'Web Design', title: 'Название задачи 11', date: '30.10.23' },
      ],
    },
  ];

  return (
    <div className="wrapper">
      <Header onOpenPopNewCard={openPopNewCard} onOpenPopExit={openPopExit} />

      {/* Основной контент с нужным числом колонок */}
      <Main columns={columnsData} onOpenPopBrowse={openPopBrowse} />

      {/* Попапы */}
      {isPopNewCardOpen && <PopNewCard onClose={closePopNewCard} />}
      {isPopBrowseOpen && <PopBrowse onClose={closePopBrowse} />}
      {isPopExitOpen && <ExitPopup onClose={closePopExit} />}
    </div>
  );
}
