// src/components/Header/Header.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import {
  StyledHeader,
  HeaderBlock,
  HeaderLogo,
  HeaderNav,
  ButtonMainNew,
  HeaderUser,
  UserMenu,
  UserMenuHeader,
  UserMenuRow,
  UserMenuButton,
  ModalOverlay,
  ModalBox,
  ModalButtons,
} from "./Header.styled";

export default function Header({ onOpenPopNewCard }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const name = user?.name || "Ivan Ivanov";
  const email = user?.email || "ivan.ivanov@example.com";

  const handleOpenMenu = () => setMenuOpen((s) => !s);
  const handleCloseMenu = () => setMenuOpen(false);

  const handleStartLogout = () => {
    setConfirmOpen(true);
    setMenuOpen(false);
  };

  const handleConfirmLogout = () => {
    logout();
    setConfirmOpen(false);
    // возвращаем на страницу логина
    navigate("/login");
  };

  return (
    <>
      <StyledHeader>
        <div className="container">
          <HeaderBlock>
            <HeaderLogo>
              <a href="/"><img src="/images/logo.png" alt="logo" /></a>
            </HeaderLogo>

            <HeaderNav>
              <ButtonMainNew onClick={() => onOpenPopNewCard && onOpenPopNewCard()}>
                Создать новую задачу
              </ButtonMainNew>

              <div style={{ position: "relative" }}>
                <HeaderUser onClick={handleOpenMenu} aria-expanded={menuOpen}>
                  {name}
                </HeaderUser>

                {menuOpen && (
                  <UserMenu onMouseLeave={handleCloseMenu}>
                    <UserMenuHeader>
                      <div className="name">{name}</div>
                      <div className="email">{email}</div>
                    </UserMenuHeader>

                    <UserMenuRow>
                      <label style={{ fontSize: 13, color: "#222" }}>
                        <input type="checkbox" style={{ marginRight: 8 }} />
                        Тёмная тема
                      </label>
                    </UserMenuRow>

                    <div style={{ marginTop: 8 }}>
                      <UserMenuButton onClick={handleStartLogout}>
                        Выйти
                      </UserMenuButton>
                    </div>
                  </UserMenu>
                )}
              </div>
            </HeaderNav>
          </HeaderBlock>
        </div>
      </StyledHeader>

      {confirmOpen && (
        <ModalOverlay onClick={() => setConfirmOpen(false)}>
          <ModalBox onClick={(e) => e.stopPropagation()}>
            <h3>Выйти из аккаунта?</h3>
            <ModalButtons>
              <button className="confirm" onClick={handleConfirmLogout}>
                Да, выйти
              </button>
              <button className="cancel" onClick={() => setConfirmOpen(false)}>
                Нет, остаться
              </button>
            </ModalButtons>
          </ModalBox>
        </ModalOverlay>
      )}
    </>
  );
}
