import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import styled from "styled-components";
import { useAuth } from "../context/AuthContext";

const Wrap = styled.div`
  min-height: 100vh;
  display:flex;
  justify-content:center;
  align-items:center;
  background:#f6f8fb;
`;

const Card = styled.div`
  width: 360px;
  background: #fff;
  border-radius: 10px;
  padding: 28px;
  box-shadow: 0 10px 40px rgba(16,24,40,0.06);
`;

const Title = styled.h2`
  margin: 0 0 18px;
  font-size: 28px;
  text-align:center;
`;

const Field = styled.div`margin-bottom:12px;`;

const Input = styled.input`
  width:100%;
  padding:10px 12px;
  border-radius:8px;
  border:1px solid rgba(16,24,40,0.06);
  background:#f6f8fb;
  outline:none;
`;

const Submit = styled.button`
  width:100%;
  padding:10px;
  border-radius:8px;
  background:#6b64f6;
  color:#fff;
  border:none;
  font-weight:600;
  cursor:pointer;
`;

export default function RegisterPage() {
  const { isAuth, register, error } = useAuth();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (isAuth) navigate("/");
  }, [isAuth, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await register({ name, email, password });
  };

  return (
    <Wrap>
      <Card>
        <Title>Регистрация</Title>

        <form onSubmit={handleSubmit}>
          <Field>
            <label>Имя</label>
            <Input value={name} onChange={(e) => setName(e.target.value)} required />
          </Field>

          <Field>
            <label>Почта</label>
            <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </Field>

          <Field>
            <label>Пароль</label>
            <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          </Field>

          {error && <p style={{ color: "red" }}>{error}</p>}

          <Submit type="submit">Зарегистрироваться</Submit>
        </form>

        <p style={{marginTop:12, textAlign:"center"}}>
          Уже есть аккаунт? <Link to="/login">Войти</Link>
        </p>
      </Card>
    </Wrap>
  );
}
