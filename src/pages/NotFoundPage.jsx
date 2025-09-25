import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Wrap = styled.div`padding:48px; text-align:center;`;

export default function NotFoundPage() {
  return (
    <Wrap>
      <h1>404</h1>
      <p>Страница не найдена</p>
      <p><Link to="/">На главную</Link></p>
    </Wrap>
  );
}
