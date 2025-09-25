// src/components/Header/Header.jsx
import React from 'react';
import {
  StyledHeader,
  HeaderBlock,
  HeaderLogo,
  HeaderNav,
  ButtonMainNew,
  HeaderUser,
} from './Header.styled';

export default function Header({ onOpenPopNewCard, onOpenPopExit }) {
  return (
    <StyledHeader>
      <div className="container">
        <HeaderBlock>
          <HeaderLogo className="show light">
            <a href="/"><img src="/images/logo.png" alt="logo" /></a>
          </HeaderLogo>
          <HeaderLogo className="dark">
            <a href="/"><img src="/images/logo_dark.png" alt="logo" /></a>
          </HeaderLogo>

          <HeaderNav>
            <ButtonMainNew
              type="button"
              onClick={() => {
                onOpenPopNewCard && onOpenPopNewCard();
              }}
            >
              Создать новую задачу
            </ButtonMainNew>

            <HeaderUser
              as="button"
              type="button"
              onClick={() => {
                onOpenPopExit && onOpenPopExit();
              }}
            >
              Ivan Ivanov
            </HeaderUser>
          </HeaderNav>
        </HeaderBlock>
      </div>
    </StyledHeader>
  );
}
