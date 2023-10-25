import { Button } from "antd";
import { FC } from "react";

import { Link, useNavigate } from "react-router-dom";

export const Header: FC = () => {
  const navigate = useNavigate();

  const handleAddTask = () => {
    navigate("/add");
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
          <Button className="headerBtn" type="primary">
            Войти
          </Button>
          <Button className="headerBtn">Зарегестрироваться</Button>
        </div>
      </div>
    </div>
  );
};
