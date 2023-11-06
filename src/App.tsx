import { FC } from "react";
import { HashRouter, Routes, Route } from "react-router-dom";
import { AddTaskPage, AuthPage, MainPage, ProfilePage } from "./page";
import { Layouts } from "./components";
import { PrivateRoute, PublicRoute } from "./router";

const App: FC = () => {
  return (
    <>
      <HashRouter>
        <Routes>
          <Route element={<Layouts />}>
            <Route element={<PrivateRoute />}>
              <Route path={"/"} element={<MainPage />} />
              <Route path={"/add"} element={<AddTaskPage />} />
              <Route path={"/edit/:id"} element={<AddTaskPage isEdit />} />
              <Route path={"/profile"} element={<ProfilePage />} />
            </Route>
            <Route element={<PublicRoute />}>
              <Route path={"/auth"} element={<AuthPage type="login" />} />
              <Route
                path={"/register"}
                element={<AuthPage type="register" />}
              />
            </Route>
          </Route>
        </Routes>
      </HashRouter>
    </>
  );
};

export default App;
