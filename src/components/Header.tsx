import { Button } from "antd";
import { FC } from "react";

import { Link, useNavigate } from "react-router-dom";

export const Header: FC = () => {
  const navigate = useNavigate();

  const handleAddTask = () => {
    navigate("/add");
  };

  const handleLogin = () => {
    navigate("/auth");
  };

  const handleRegister = () => {
    navigate("/register");
  };

  return (
    <div className="container">
      <div className="headerWrap">
        <Link to={"/"} className="headerLogo">
          ToDo List
        </Link>
        <div className="headerProfile">
          <Button onClick={handleAddTask} className="headerBtn" type="primary">
            Добавить задачу
          </Button>
          <Button onClick={handleLogin} className="headerBtn" type="primary">
            Войти
          </Button>
          <Button onClick={handleRegister} className="headerBtn">
            Зарегестрироваться
          </Button>
        </div>
      </div>
    </div>
  );
};
