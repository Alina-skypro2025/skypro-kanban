
import React from "react";
import { useNavigate } from "react-router-dom";
import PopNewCard from "../components/PopNewCard/PopNewCard";
import { createTask } from "../services/tasks";
import { useTasks } from "../context/TaskContext"; 

export default function AddCardPage() {
  const navigate = useNavigate();
  const { loadTasks } = useTasks?.() || {};

  const handleCreate = async (payload) => {
    const token = localStorage.getItem("token");
    if (!token) throw new Error("Не авторизованы");

    await createTask(
      {
        title: payload.title,
        description: payload.description,
        topic: payload.topic,
        status: payload.status, 
        date: payload.date, 
      },
      token
    );

   
    if (typeof loadTasks === "function") {
      await loadTasks(token);
    }

    navigate("/");
  };

  return (
    <div className="pop-wrap">
      <PopNewCard onCreate={handleCreate} onClose={() => navigate("/")} />
    </div>
  );
}
