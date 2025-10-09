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
} from "./Header.styled";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();

  const name = user?.name || "Ivan Ivanov";
  const email = user?.email || "ivan.ivanov@example.com";

  const handleOpenMenu = () => setMenuOpen((s) => !s);
  const handleCloseMenu = () => setMenuOpen(false);

  return (
    <StyledHeader>
      <div className="container">
        <HeaderBlock>
          <HeaderLogo>
            <a href="/">
              <img src="/images/logo.png" alt="logo" />
            </a>
          </HeaderLogo>

          <HeaderNav>
            {/*  Кнопка ведёт на /add */}
            <ButtonMainNew onClick={() => navigate("/add")}>
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
                    {/*  Кнопка ведёт на /exit */}
                    <UserMenuButton onClick={() => navigate("/exit")}>
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