// src/components/Header/Header.styled.js
import styled from 'styled-components';
import { theme } from '../../theme';

export const StyledHeader = styled.header`
  background: ${theme.colors.white};
  border-bottom: 1px solid rgba(20,30,60,0.04);
  padding: 18px 0;
`;

export const HeaderBlock = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const HeaderLogo = styled.div`
  img { height: 28px; display: block; }
`;

export const HeaderNav = styled.nav`
  display: flex;
  align-items: center;
  gap: 16px;
`;

export const ButtonMainNew = styled.button`
  background: ${theme.colors.primary};
  color: ${theme.colors.white};
  padding: 10px 18px;
  border-radius: 8px;
  border: none;
  font-weight: 600;
  cursor: pointer;
  box-shadow: 0 2px 8px rgba(79,70,229,0.12);
`;

export const HeaderUser = styled.button`
  background: transparent;
  border: none;
  color: ${theme.colors.textSecondary};
  cursor: pointer;
`;
