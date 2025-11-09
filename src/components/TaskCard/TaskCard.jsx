// src/components/TaskCard/TaskCard.jsx
import React, { useState } from "react";
import { Card, TopRow, Badge, DotsBtn, Title, DateRow } from "./TaskCard.styled";
import TaskModal from "../TaskModal/TaskModal";

export default function TaskCard({ task, token, onTaskDeleted, onTaskUpdated }) {
  const [showModal, setShowModal] = useState(false);

  const toneKey =
    task.topic?.toLowerCase() === "web design"
      ? "web"
      : task.topic?.toLowerCase() === "research"
      ? "research"
      : task.topic?.toLowerCase() === "copywriting"
      ? "copy"
      : "none";

  const formattedDate = task.date
    ? new Date(task.date).toLocaleDateString("ru-RU", {
        day: "2-digit",
        month: "2-digit",
        year: "2-digit",
      })
    : "";

  return (
    <>
      <Card onClick={() => setShowModal(true)}>
        <TopRow>
          <Badge $tone={toneKey}>{task.topic}</Badge>
          <DotsBtn>
            <span></span>
            <span></span>
            <span></span>
          </DotsBtn>
        </TopRow>
        <Title>{task.title}</Title>
        <DateRow>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
            <line x1="16" y1="2" x2="16" y2="6" />
            <line x1="8" y1="2" x2="8" y2="6" />
            <line x1="3" y1="10" x2="21" y2="10" />
          </svg>
          <span>{formattedDate}</span>
        </DateRow>
      </Card>

      {showModal && (
        <TaskModal
          task={task}
          token={token}
          onClose={() => setShowModal(false)}
          onUpdate={onTaskUpdated}
          onDelete={onTaskDeleted}
        />
      )}
    </>
  );
}
