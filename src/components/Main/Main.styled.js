import styled from "styled-components";

export const MainWrapper = styled.main`
  width: 100%;
  min-height: 100vh;
  background-color: #eaEEF6;
  padding: 0 0 49px; 
  box-sizing: border-box;
`;

export const Content = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 24px;
  flex-wrap: nowrap;

  @media (max-width: 1200px) {
    flex-wrap: wrap;
    justify-content: center;
  }
`;
