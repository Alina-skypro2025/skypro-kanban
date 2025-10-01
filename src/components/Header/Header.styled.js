// src/components/Header/Header.styled.js
import styled from "styled-components";

export const StyledHeader = styled.header`
  background: #ffffff;
  border-bottom: 1px solid rgba(16, 24, 40, 0.04);
  padding: 18px 0;
  z-index: 20;
`;

export const HeaderBlock = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const HeaderLogo = styled.div`
  img { height: 34px; display:block; }
`;

export const HeaderNav = styled.div`
  display:flex;
  align-items:center;
  gap:16px;
  position:relative;
`;

export const ButtonMainNew = styled.button`
  background: #6b64f6;
  color: #fff;
  border: none;
  padding: 10px 18px;
  border-radius: 10px;
  font-weight: 600;
  cursor: pointer;
  box-shadow: 0 6px 20px rgba(107,100,246,0.18);
  transition: transform .12s ease;
  &:active { transform: translateY(1px); }
`;

export const HeaderUser = styled.button`
  background: transparent;
  border: 1px solid rgba(16, 24, 40, 0.08);
  border-radius: 10px;
  padding: 8px 12px;
  cursor:pointer;
  font-weight: 500;
  color: #222;
  display:flex;
  align-items:center;
  gap:8px;
`;

export const UserMenu = styled.div`
  position: absolute;
  top: 46px;
  right: 0;
  width: 220px;
  background: #fff;
  border-radius: 10px;
  box-shadow: 0 10px 30px rgba(16,24,40,0.12);
  padding: 12px;
  z-index: 40;
`;

export const UserMenuHeader = styled.div`
  margin-bottom: 8px;
  .name { font-weight:700; color:#111; }
  .email { font-size:13px; color:#7a8598; }
`;

export const UserMenuRow = styled.div`
  display:flex;
  justify-content:space-between;
  align-items:center;
  padding:8px 0;
  border-top: 1px solid rgba(16,24,40,0.04);
`;

export const UserMenuButton = styled.button`
  width:100%;
  background: #fff;
  border: 1px solid rgba(16,24,40,0.08);
  padding:8px 10px;
  border-radius:8px;
  cursor:pointer;
  &:hover { background:#f6f7fb; }
`;

/* Модальное подтверждение (выход) */
export const ModalOverlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(16,24,40,0.45);
  display:flex;
  align-items:center;
  justify-content:center;
  z-index:60;
`;

export const ModalBox = styled.div`
  background:#fff;
  border-radius: 16px;
  padding: 28px 26px;
  width: 420px;
  box-shadow: 0 10px 40px rgba(16,24,40,0.2);
  text-align:center;

  h3 { margin:0 0 18px; font-size:20px; color:#111; font-weight:700; }
`;

export const ModalButtons = styled.div`
  display:flex;
  gap:12px;
  justify-content:center;

  button {
    padding:10px 18px;
    border-radius:10px;
    font-weight:600;
    cursor:pointer;
    border:none;
  }

  .confirm {
    background:#6b64f6;
    color:#fff;
    box-shadow: 0 6px 20px rgba(107,100,246,0.18);
  }
  .cancel {
    background:#f2f2f4;
    color:#222;
    border: 1px solid rgba(16,24,40,0.06);
  }
`;