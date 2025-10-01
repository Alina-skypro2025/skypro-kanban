// src/components/TaskCard/TaskCard.jsx
import React from "react";

export default function TaskCard({ task }) {
  return (
    <div className="cards__item">
      <div className="cards__card">
        {/* Верхняя часть карточки */}
        <div className="card__group">
          {/* Категория */}
          <div className={`card__theme`}>
            <p>{task.topic}</p>
          </div>

          {/* Три точки справа */}
          <div className="card__btn">
            <div></div>
            <div></div>
            <div></div>
          </div>
        </div>

        {/* Заголовок */}
        <div className="card__title">{task.title}</div>

        {/* Дата */}
        <div className="card__content">
          <div className="card__date">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="13"
              viewBox="0 0 24 24"
              width="13"
              fill="#94A6BE"
            >
              <path d="M19 4h-1V2h-2v2H8V2H6v2H5c-1.11 0-2 
              .9-2 2v14c0 1.1.89 2 2 
              2h14c1.1 0 2-.9 
              2-2V6c0-1.1-.9-2-2-2zm0 
              16H5V9h14v11zM7 11h5v5H7z" />
            </svg>
            <p>{new Date(task.date).toLocaleDateString()}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
