// src/components/Main/Main.jsx
import React from "react";
import { MainWrapper, Content } from "./Main.styled";
import Column from "../Column/Column";
import TaskCard from "../TaskCard/TaskCard";

export default function Main({ tasks }) {
  const statuses = ["Без статуса", "Нужно сделать", "В работе", "Тестирование", "Готово"];

  return (
    <MainWrapper>
      <div className="container">
        <Content>
          {statuses.map((status) => (
            <Column key={status} title={status}>
              {tasks
                .filter((task) => task.status === status)
                .map((task) => (
                  <TaskCard key={task.id} task={task} />
                ))}
            </Column>
          ))}
        </Content>
      </div>
    </MainWrapper>
  );
}
