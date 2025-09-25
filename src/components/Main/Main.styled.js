// src/components/Main/Main.styled.js
import styled from 'styled-components';
import { theme } from '../../theme';

export const MainWrapper = styled.main`
  background: ${theme.colors.pageBackground};
  padding: 40px 0;
  min-height: calc(100vh - 72px);
`;

export const Content = styled.div`
  display: flex;
  gap: 40px;
  align-items: flex-start;
  /* wrapper for columns; columns themselves стилизованы в Column.styled.js */
`;
