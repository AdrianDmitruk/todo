import { FC } from "react";
import { Outlet } from "react-router-dom";
import { Footer, Header } from ".";

export const Layouts: FC = () => {
  return (
    <div className="content">
      <header className="header">
        <Header />
      </header>
      <main className="main">
        <Outlet />
      </main>
      <footer className="footer">
        <Footer />
      </footer>
    </div>
  );
};
