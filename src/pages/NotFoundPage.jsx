import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const Wrapper = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: #f4f6fa;
  text-align: center;
  padding: 20px;
`;

const Title = styled.h1`
  font-size: 120px;
  margin: 0;
  font-weight: 700;
  color: #565eef;
`;

const Text = styled.p`
  font-size: 20px;
  color: #94a6be;
  margin: 10px 0 30px;
`;

const Button = styled.button`
  padding: 12px 26px;
  font-size: 16px;
  font-weight: 500;
  background: #565eef;
  border: none;
  color: #fff;
  border-radius: 8px;
  cursor: pointer;
  transition: 0.2s;

  &:hover {
    background: #474fd8;
  }
`;

export default function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <Wrapper>
      <Title>404</Title>
      <Text>Страница не найдена</Text>

      <Button onClick={() => navigate("/")}>
        Вернуться на главную
      </Button>
    </Wrapper>
  );
}
