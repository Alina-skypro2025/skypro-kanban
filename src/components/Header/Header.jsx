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

import { useAuth } from "../../context/AuthContext";

export default function Header({ onCreate, onLogout }) {
  const [menuOpen, setMenuOpen] = useState(false);

  
  const { user } = useAuth();

  const userName = user?.name || "Пользователь";
  const userEmail = user?.login || "email@example.com";

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
            <ButtonMainNew onClick={onCreate}>Создать новую задачу</ButtonMainNew>

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
                    <UserMenuButton onClick={onLogout}>Выйти</UserMenuButton>
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
