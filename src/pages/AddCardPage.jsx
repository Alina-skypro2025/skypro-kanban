import React from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header/Header";
import PopNewCard from "../components/PopNewCard/PopNewCard";
import "../main.scss";

export default function AddCardPage() {
  const navigate = useNavigate();

  const handleClose = () => {
    navigate("/"); // при закрытии возвращаемся на главную
  };

  const handleCreate = (newTask) => {
    console.log("Создана задача:", newTask);
    
    navigate("/");
  };

  return (
    <div className="wrapper">
      <Header />
      <main className="main">
        <PopNewCard onClose={handleClose} onCreate={handleCreate} />
      </main>
    </div>
  );
}