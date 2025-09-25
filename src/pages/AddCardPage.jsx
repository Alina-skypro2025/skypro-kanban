import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const Wrap = styled.div`padding:24px;`;

export default function AddCardPage() {
  const navigate = useNavigate();

  const handleAdd = (e) => {
    e.preventDefault();
    // логика добавления (пока заглушка)
    alert('Задача добавлена (заглушка)');
    navigate('/');
  };

  return (
    <Wrap>
      <h2>Добавить задачу</h2>
      <form onSubmit={handleAdd}>
        <div style={{marginBottom:12}}>
          <input placeholder="Название" required />
        </div>
        <div style={{marginBottom:12}}>
          <input placeholder="Категория" />
        </div>
        <button type="submit">Добавить</button>
      </form>
    </Wrap>
  );
}
