// src/App.jsx
import './App.css';
import ExitPopup from './components/ExitPopup/ExitPopup';
import PopNewCard from './components/PopNewCard/PopNewCard';
import PopBrowse from './components/PopBrowse/PopBrowse';
import Header from './components/Header/Header';
import Main from './components/Main/Main';
import Column from './components/Column/Column';
import Card from './components/Card/Card';

// Данные для колонок и карточек (можно вынести в state или props позже)
const columnsData = [
  {
    title: "Без статуса",
    tasks: [
      { category: "Web Design", title: "Название задачи 1", date: "30.10.23" },
      { category: "Research", title: "Название задачи 2", date: "30.10.23" },
      { category: "Web Design", title: "Название задачи 3", date: "30.10.23" },
      { category: "Copywriting", title: "Название задачи 4", date: "30.10.23" },
      { category: "Web Design", title: "Название задачи 5", date: "30.10.23" },
    ]
  },
  {
    title: "Нужно сделать",
    tasks: [
      { category: "Research", title: "Название задачи 6", date: "30.10.23" },
    ]
  },
  {
    title: "В работе",
    tasks: [
      { category: "Research", title: "Название задачи 7", date: "30.10.23" },
      { category: "Copywriting", title: "Название задачи 8", date: "30.10.23" },
      { category: "Web Design", title: "Название задачи 9", date: "30.10.23" },
    ]
  },
  {
    title: "Тестирование",
    tasks: [
      { category: "Research", title: "Название задачи 10", date: "30.10.23" },
    ]
  },
  {
    title: "Готово",
    tasks: [
      { category: "Research", title: "Название задачи 11", date: "30.10.23" },
    ]
  }
];

function App() {
  return (
    <div className="wrapper">
      {/* Popups */}
      <ExitPopup />
      <PopNewCard />
      <PopBrowse />

      {/* Основной контент */}
      <Header />
      <Main>
        {columnsData.map((column, index) => (
          <Column key={index} title={column.title}>
            {column.tasks.map((task, taskIndex) => (
              <Card
                key={taskIndex}
                category={task.category}
                title={task.title}
                date={task.date}
              />
            ))}
          </Column>
        ))}
      </Main>
    </div>
  );
}

export default App;