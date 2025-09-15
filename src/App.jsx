
import './App.css';

import { useState, useEffect } from 'react';
import { initialCards } from './data';
import ExitPopup from './components/ExitPopup/ExitPopup';
import PopNewCard from './components/PopNewCard/PopNewCard';
import PopBrowse from './components/PopBrowse/PopBrowse';
import Header from './components/Header/Header';
import Main from './components/Main/Main';
import Column from './components/Column/Column';
import Card from './components/Card/Card';

function App() {

  const [cards, setCards] = useState([]);
  const [isLoading, setIsLoading] = useState(true);


  const columnTitles = ['Без статуса', 'Нужно сделать', 'В работе', 'Тестирование', 'Готово'];

  useEffect(() => {

    const timer = setTimeout(() => {
      console.log("Имитация загрузки завершена. Устанавливаем данные.");

      setCards(initialCards);
      setIsLoading(false);

    }, 1000);


    return () => {
      console.log("Очистка таймера.");
      clearTimeout(timer);
    };
  }, []);

  return (
    <div className="wrapper">
      {/* Popups */}
      <ExitPopup />
      <PopNewCard />
      <PopBrowse />

      {/* Основной контент */}
      <Header />
      <Main>
        {/* --- Логика отображения с тернарным оператором --- */}
        {isLoading ? (

          <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100%',
            fontSize: '24px',
            color: '#666'
          }}>
            Данные загружаются...
          </div>

        ) : (

          <>
            {columnTitles.map((title) => {

              const columnCards = cards.filter(card => card.status === title);
              console.log(`Отрисовка колонки "${title}" с ${columnCards.length} карточками.`);
              return (
                <Column key={title} title={title}>
                  {columnCards.map((card) => (
                    <Card
                      key={card.id}
                      category={card.topic}
                      title={card.title}
                      date={card.date}
                    />
                  ))}
                </Column>
              );
            })}
          </>

        )}
        {/* ---------------------------------------------------- */}
      </Main>
    </div>
  );
}

export default App;