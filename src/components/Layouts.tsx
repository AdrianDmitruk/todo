import { FC } from "react";
import { Outlet } from "react-router-dom";
import { Header } from ".";

export const Layouts: FC = () => {
  return (
    <div className="content">
      <header className="header">
        <Header />
      </header>
      <main className="main">
        <Outlet />
      </main>
    </div>
  );
};
