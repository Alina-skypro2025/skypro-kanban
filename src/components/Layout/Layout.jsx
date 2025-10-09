import React from "react";
import { Outlet } from "react-router-dom";      // сюда будут подставляться страницы
import Header from "../Header/Header";
import "../../main.scss";                       //  глобальные стили

export default function Layout() {
  return (
    <div className="wrapper">
      <Header />
      <main className="main">
        {/* сюда придут MainPage, AddCardPage и т.д. */}
        <Outlet />
      </main>
    </div>
  );
}
