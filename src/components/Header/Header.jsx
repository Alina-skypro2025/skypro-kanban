// src/components/Header/Header.jsx
import React, { useState } from "react";
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
} from "./Header.styled";

export default function Header({ onCreate, onLogout }) {
  const [menuOpen, setMenuOpen] = useState(false);

  const userName = localStorage.getItem("userName") || "Алина";
  const userEmail = localStorage.getItem("userEmail") || "alina@example.com";

  const handleOpenMenu = () => setMenuOpen((s) => !s);
  const handleCloseMenu = () => setMenuOpen(false);

  return (
    <StyledHeader>
      <div className="container">
        <HeaderBlock>
          <HeaderLogo>
            <img src="/images/logo.png" alt="logo" />
          </HeaderLogo>

          <HeaderNav>
            {/* ✅ Кнопка теперь открывает модалку */}
            <ButtonMainNew onClick={onCreate}>
              Создать новую задачу
            </ButtonMainNew>

            <div style={{ position: "relative" }}>
              <HeaderUser onClick={handleOpenMenu} aria-expanded={menuOpen}>
                {userName}
              </HeaderUser>

              {menuOpen && (
                <UserMenu onMouseLeave={handleCloseMenu}>
                  <UserMenuHeader>
                    <div className="name">{userName}</div>
                    <div className="email">{userEmail}</div>
                  </UserMenuHeader>

                  <UserMenuRow>
                    <label style={{ fontSize: 13, color: "#222" }}>
                      <input type="checkbox" style={{ marginRight: 8 }} />
                      Тёмная тема
                    </label>
                  </UserMenuRow>

                  <div style={{ marginTop: 8 }}>
                    {/* ✅ Теперь logout из контекста */}
                    <UserMenuButton onClick={onLogout}>
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
  );
}
