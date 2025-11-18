
import styled from "styled-components";

export const Col = styled.section`
  flex: 1 1 0;
  min-width: 240px;
  display: flex;
  flex-direction: column;
  align-items: stretch;
`;

export const TitleWrap = styled.div`
  padding: 0 10px;
  margin: 15px 0;
`;

export const Title = styled.p`
  color: #94a6be;
  font-size: 14px;
  font-weight: 600;
  line-height: 1;
  text-transform: uppercase;
`;

export const List = styled.ul`
  display: flex;
  flex-direction: column; 
  gap: 12px;
  list-style: none;
  padding: 0;
  margin: 0;
`;
