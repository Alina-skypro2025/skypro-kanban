import React, { useState } from "react";

export default function TaskModalCreate({ onClose, onCreate }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("Web Design");
  const [selectedDate, setSelectedDate] = useState(new Date());

  const categories = [
    { name: "Web Design", class: "_orange" },
    { name: "Research", class: "_green" },
    { name: "Copywriting", class: "_purple" },
  ];

  const monthNames = [
    "Январь",
    "Февраль",
    "Март",
    "Апрель",
    "Май",
    "Июнь",
    "Июль",
    "Август",
    "Сентябрь",
    "Октябрь",
    "Ноябрь",
    "Декабрь",
  ];

  const currentYear = selectedDate.getFullYear();
  const currentMonth = selectedDate.getMonth();
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

  const handlePrevMonth = () =>
    setSelectedDate(new Date(currentYear, currentMonth - 1, 1));

  const handleNextMonth = () =>
    setSelectedDate(new Date(currentYear, currentMonth + 1, 1));

  const handleSelectDay = (day) =>
    setSelectedDate(new Date(currentYear, currentMonth, day));

  
  const formatLocalDate = (d) =>
    `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(
      d.getDate()
    ).padStart(2, "0")}`;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return alert("Введите название задачи");

    onCreate({
      title,
      description,
      topic: category,
      status: "Без статуса",
     
      date: formatLocalDate(selectedDate),
    });
  };

  return (
    <div className="pop-new-card" style={{ display: "block" }}>
      <div className="pop-new-card__container">
        <div className="pop-new-card__block">
          <div className="pop-new-card__content">
            <h3 className="pop-new-card__ttl">Создание задачи</h3>

            <form className="form-new" onSubmit={handleSubmit}>
              <div className="pop-new-card__wrap">
                {/* Левая колонка */}
                <div className="pop-new-card__form">
                  <div className="form-new__block">
                    <label className="subttl">Название задачи</label>
                    <input
                      type="text"
                      className="form-new__input"
                      placeholder="Введите название задачи..."
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                    />

                    <label className="subttl">Описание задачи</label>
                    <textarea
                      className="form-new__area"
                      placeholder="Введите описание задачи..."
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                    />

                    {/* Категории */}
                    <div className="categories">
                      <p className="categories__p subttl">Категория</p>
                      <div className="categories__themes">
                        {categories.map((c) => (
                          <div
                            key={c.name}
                            className={`categories__theme ${c.class} ${
                              category === c.name ? "_active-category" : ""
                            }`}
                            onClick={() => setCategory(c.name)}
                            style={{ cursor: "pointer" }}
                          >
                            <p>{c.name}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Правая колонка — календарь */}
                <div className="calendar">
                  <div className="calendar__ttl subttl">Дата</div>

                  <div className="calendar__block">
                    <div className="calendar__content">
                      <div className="calendar__month">
                        {monthNames[currentMonth]} {currentYear}
                      </div>

                      <div className="calendar__nav">
                        <div className="nav__action" onClick={handlePrevMonth}>
                          <svg width="10" height="10" viewBox="0 0 20 20">
                            <path
                              d="M12 15L7 10L12 5"
                              stroke="#94A6BE"
                              strokeWidth="2"
                            />
                          </svg>
                        </div>

                        <div className="nav__action" onClick={handleNextMonth}>
                          <svg width="10" height="10" viewBox="0 0 20 20">
                            <path
                              d="M8 5L13 10L8 15"
                              stroke="#94A6BE"
                              strokeWidth="2"
                            />
                          </svg>
                        </div>
                      </div>
                    </div>

                    <div className="calendar__days-names">
                      {["пн", "вт", "ср", "чт", "пт", "сб", "вс"].map((day) => (
                        <div key={day} className="calendar__day-name">
                          {day}
                        </div>
                      ))}
                    </div>

                    <div className="calendar__cells">
                      {[...Array(daysInMonth)].map((_, i) => {
                        const day = i + 1;
                        const isSelected =
                          day === selectedDate.getDate() &&
                          currentMonth === selectedDate.getMonth();

                        return (
                          <div
                            key={day}
                            className={`calendar__cell ${
                              isSelected ? "_active-day" : "_cell-day"
                            }`}
                            onClick={() => handleSelectDay(day)}
                          >
                            {day}
                          </div>
                        );
                      })}
                    </div>

                    <div className="calendar__p">
                      Выбрано: {formatLocalDate(selectedDate)}
                    </div>
                  </div>
                </div>
              </div>

              <button type="submit" className="form-new__create">
                Создать задачу
              </button>
            </form>

            <div className="pop-new-card__close" onClick={onClose}>
              ✕
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
