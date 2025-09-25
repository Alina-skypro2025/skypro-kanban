// src/components/Main/Main.jsx
import React from 'react';
import { MainWrapper, Content } from './Main.styled';
import Column from '../Column/Column';
import Card from '../Card/Card';

export default function Main({ columns = [], onOpenPopBrowse }) {
  return (
    <MainWrapper>
      <div className="container">
        <Content>
          {columns.map((col, idx) => (
            <Column key={idx} title={col.title}>
              {col.tasks.map((t, j) => (
                <Card
                  key={j}
                  category={t.category}
                  title={t.title}
                  date={t.date}
                  onOpenPopBrowse={onOpenPopBrowse}
                />
              ))}
            </Column>
          ))}
        </Content>
      </div>
    </MainWrapper>
  );
}
