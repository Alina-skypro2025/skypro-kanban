import React from 'react';
import { useParams, Link } from 'react-router-dom';
import styled from 'styled-components';

const Wrap = styled.div`padding:24px;`;

export default function CardPage() {
  const { id } = useParams();
  return (
    <Wrap>
      <h2>Просмотр/редактирование карточки</h2>
      <p>ID карточки: <strong>{id}</strong></p>
      <p><Link to="/">← Назад на доску</Link></p>
    </Wrap>
  );
}
