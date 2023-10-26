import { FC } from "react";
import { HashRouter, Routes, Route } from "react-router-dom";
import { AddTaskPage, AuthPage, MainPage } from "./page";
import { Layouts } from "./components";

const App: FC = () => {
  return (
    <>
      <HashRouter>
        <Routes>
          <Route element={<Layouts />}>
            <Route path={"/"} element={<MainPage />} />
            <Route path={"/add"} element={<AddTaskPage />} />
            <Route path={"/auth"} element={<AuthPage type="login" />} />
            <Route path={"/register"} element={<AuthPage type="register" />} />
          </Route>
        </Routes>
      </HashRouter>
    </>
  );
};

export default App;
