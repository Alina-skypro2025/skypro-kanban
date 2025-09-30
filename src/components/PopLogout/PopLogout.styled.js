import styled from "styled-components";

export const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.4);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

export const Box = styled.div`
  width: 520px;
  max-width: calc(100vw - 32px);
  background: #fff;
  border-radius: 20px;
  padding: 28px 28px 24px;
  box-shadow: 0 30px 60px rgba(31, 32, 65, 0.25);
`;

export const Title = styled.h3`
  margin: 0 0 16px;
  font-weight: 700;
  font-size: 22px;
  line-height: 1.2;
  color: #222;
  text-align: center;
`;

export const ButtonsRow = styled.div`
  margin-top: 8px;
  display: flex;
  gap: 12px;
  justify-content: center;
`;

const BaseBtn = styled.button`
  padding: 12px 18px;
  border-radius: 12px;
  font-weight: 600;
  font-size: 15px;
  cursor: pointer;
  border: none;
  transition: transform 0.05s ease, box-shadow 0.15s ease;
  &:active {
    transform: translateY(1px);
  }
`;

export const ButtonPrimary = styled(BaseBtn)`
  background: #6b64ff;
  color: #fff;
  box-shadow: 0 8px 16px rgba(107, 100, 255, 0.35);
  &:hover {
    box-shadow: 0 10px 20px rgba(107, 100, 255, 0.45);
  }
`;

export const ButtonSecondary = styled(BaseBtn)`
  background: #f1f1f5;
  color: #222;
`;
