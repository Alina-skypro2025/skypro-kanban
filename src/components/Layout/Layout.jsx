import React from "react";
import { Outlet } from "react-router-dom";      
import Header from "../Header/Header";
import "../../App.css";                       

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
