import React, { useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import {
  Overlay,
  Box,
  Title,
  ButtonsRow,
  ButtonPrimary,
  ButtonSecondary,
} from "./PopLogout.styled";

const PopLogout = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const onClose = useCallback(() => {
   
    navigate(-1);
  }, [navigate]);

  const onConfirm = useCallback(() => {
    logout();
    navigate("/login", { replace: true });
  }, [logout, navigate]);

 
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <Overlay onClick={onClose}>
      <Box onClick={(e) => e.stopPropagation()}>
        <Title>Выйти из аккаунта?</Title>

        <ButtonsRow>
          <ButtonPrimary onClick={onConfirm}>Да, выйти</ButtonPrimary>
          <ButtonSecondary onClick={onClose}>Нет, остаться</ButtonSecondary>
        </ButtonsRow>
      </Box>
    </Overlay>
  );
};

export default PopLogout;
