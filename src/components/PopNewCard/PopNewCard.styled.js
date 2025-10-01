import styled from "styled-components";

export const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.4);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

export const Modal = styled.div`
  background: #fff;
  border-radius: 20px;
  padding: 40px 32px;
  width: 640px;
  max-width: 95%;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
  display: flex;
  gap: 40px;
  @media (max-width: 768px) {
    flex-direction: column;
    width: 90%;
    gap: 24px;
  }
`;

export const LeftSide = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

export const Title = styled.h2`
  font-size: 20px;
  font-weight: 700;
  margin: 0 0 8px;
`;

export const Label = styled.label`
  font-weight: 600;
  font-size: 16px;
  margin-bottom: 6px;
  display: block;
`;

export const Input = styled.input`
  width: 100%;
  padding: 14px 16px;
  border: 1px solid #d0d0d0;
  border-radius: 12px;
  font-size: 16px;
  outline: none;
  &:focus {
    border-color: #5a60ff;
  }
`;

export const Textarea = styled.textarea`
  width: 100%;
  min-height: 120px;
  padding: 14px 16px;
  border: 1px solid #d0d0d0;
  border-radius: 12px;
  font-size: 16px;
  resize: none;
  outline: none;
  &:focus {
    border-color: #5a60ff;
  }
`;

export const CategoryList = styled.div`
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
`;

export const CategoryItem = styled.button`
  padding: 6px 14px;
  border-radius: 30px;
  font-weight: 600;
  font-size: 14px;
  border: none;
  cursor: pointer;
  background: ${({ color }) => color || "#eee"};
  opacity: ${({ $active }) => ($active ? 1 : 0.4)};
  transition: all 0.2s;
  &:hover {
    opacity: 0.8;
  }
`;

/* Цвета категорий */
export const colors = {
  web: "#FFB84D",
  research: "#66CC99",
  copy: "#C299FF",
};

export const CalendarWrap = styled.div`
  flex-shrink: 0;
  width: 260px;
  .react-datepicker {
    border: none;
    font-family: inherit;
    box-shadow: none;
  }
  .react-datepicker__header {
    background: none;
    border-bottom: none;
  }
  .react-datepicker__day-name {
    color: #888;
    font-weight: 500;
  }
  .react-datepicker__day {
    color: #333;
    border-radius: 8px;
    width: 32px;
    height: 32px;
    line-height: 32px;
    margin: 2px;
    &:hover {
      background: rgba(90, 96, 255, 0.15);
    }
  }
  .react-datepicker__day--today {
    font-weight: 700;
    color: #5a60ff;
  }
  .react-datepicker__day--selected {
    background: #5a60ff;
    color: #fff;
  }
`;

export const CreateBtn = styled.button`
  margin-top: 20px;
  background: #5a60ff;
  color: #fff;
  border: none;
  border-radius: 12px;
  padding: 14px 20px;
  font-weight: 600;
  font-size: 16px;
  cursor: pointer;
  transition: 0.2s;
  &:hover {
    background: #4751e6;
  }
`;

export const CloseBtn = styled.button`
  position: absolute;
  top: 20px;
  right: 24px;
  background: transparent;
  border: none;
  font-size: 28px;
  cursor: pointer;
`;
