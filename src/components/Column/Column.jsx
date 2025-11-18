
import React from "react";
import { Col, TitleWrap, Title, List } from "./Column.styled";

export default function Column({ title, children }) {
  return (
    <Col>
      <TitleWrap>
        <Title>{title}</Title>
      </TitleWrap>
      <List>
        {React.Children.map(children, (child, i) => (
          <li key={i}>{child}</li>
        ))}
      </List>
    </Col>
  );
}
