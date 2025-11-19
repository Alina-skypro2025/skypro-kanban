import styled, { css } from "styled-components";

const tones = {
  web:      { bg: "#FFE4C2", text: "#FF6D00" },
  research: { bg: "#B4FDD1", text: "#06B16E" },
  copy:     { bg: "#E9D4FF", text: "#9A48F1" },
  none:     { bg: "#EAEEF6", text: "#94A6BE" },
};

export const Card = styled.article`
  width: 220px;
  background: #ffffff;
  border-radius: 10px;
  padding: 15px 13px 16px;
  box-shadow: 0 12px 28px rgba(26, 56, 101, 0.10); 
`;

export const TopRow = styled.div`
  height: 20px;
  margin-bottom: 12px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const Badge = styled.span`
  display: inline-flex;
  align-items: center;
  height: 20px;
  padding: 5px 14px;
  border-radius: 18px;
  font-size: 10px;
  font-weight: 600;
  line-height: 10px;
  ${({ $tone = "none" }) => css`
    background: ${tones[$tone].bg};
    color: ${tones[$tone].text};
  `}
`;

export const DotsBtn = styled.button`
  width: 24px;
  height: 24px;
  border: 0;
  background: transparent;
  display: grid;
  grid-auto-flow: column;
  gap: 3px;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  span {
    width: 4px;
    height: 4px;
    border-radius: 50%;
    background: #94a6be;
    display: block;
  }
`;

export const Title = styled.h4`
  font-size: 14px;
  font-weight: 500;
  line-height: 18px;
  color: #000;
  margin: 0 0 10px;

  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;


export const DateRow = styled.div`
  display: flex;
  align-items: center;
  color: #94a6be;
  font-size: 10px;
  line-height: 13px;
  letter-spacing: 0.2px;

  svg {
    width: 13px;
    height: 13px;
    margin-right: 6px;
  }
`;
