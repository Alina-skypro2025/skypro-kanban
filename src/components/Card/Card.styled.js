import styled from 'styled-components';
import { theme } from '../../theme';

const getThemeColors = (category) => {
  switch (category?.toLowerCase()) {
    case 'web design':
      return theme.colors.orange;
    case 'research':
      return theme.colors.green;
    case 'copywriting':
      return theme.colors.purple;
    default:
      return theme.colors.gray;
  }
};

export const CardItem = styled.div`
  padding: 5px;
  animation-name: card-animation;
  animation-duration: 500ms;
  animation-timing-function: linear;
  @keyframes card-animation {
    0% {
      height: 0;
      opacity: 0;
    }
    100% {
      height: auto;
      opacity: 1;
    }
  }
`;

export const CardBlock = styled.div`
  width: 220px;
  height: 130px;
  background-color: ${theme.colors.cardBackground};
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: stretch;
  padding: 15px 13px 19px;
`;

export const CardGroup = styled.div`
  width: 100%;
  height: 20px;
  margin-bottom: 12px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const CardTheme = styled.div`
  width: auto;
  height: 20px;
  padding: 5px 14px;
  border-radius: 18px;
  background-color: ${(props) => getThemeColors(props.$category).bg};
  color: ${(props) => getThemeColors(props.$category).text};
  p {
    font-size: 10px;
    font-weight: 600;
    line-height: 10px;
  }
`;

export const CardBtn = styled.a`
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: space-around;
  padding: 2px;
  cursor: pointer;
  text-decoration: none;
  div {
    width: 4px;
    height: 4px;
    border-radius: 50%;
    background-color: ${theme.colors.textSecondary};
  }
`;

export const CardContent = styled.div`
  height: 64px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;
`;

export const CardTitle = styled.a`
  font-size: 14px;
  font-weight: 500;
  line-height: 18px;
  color: ${theme.colors.text};
  margin-bottom: 10px;
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
`;

export const CardDate = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  svg {
    width: 13px;
  }
  p {
    margin-left: 6px;
    font-size: 10px;
    line-height: 13px;
    color: ${theme.colors.textSecondary};
    letter-spacing: 0.2px;
  }
`;
