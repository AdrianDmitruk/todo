import { Button } from "antd";
import { FC } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { selectRegistrationData } from "../redux/auth/selectors";
import { selectUserData } from "../redux/user/selectors";

export const Header: FC = () => {
  const navigate = useNavigate();

  const { data } = useSelector(selectRegistrationData);
  const { data: userData } = useSelector(selectUserData);
  const isAuth = !!data?.token;

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
          {isAuth ? (
            <>
              <Button
                onClick={handleAddTask}
                className="headerBtn"
                type="primary"
              >
                Добавить задачу
              </Button>
              <Link className="headerLink" to={"/profile"}>
                {userData?.firstName} {userData?.lastName}
              </Link>
            </>
          ) : (
            <>
              <Button
                onClick={handleLogin}
                className="headerBtn"
                type="primary"
              >
                Войти
              </Button>
              <Button onClick={handleRegister} className="headerBtn">
                Зарегестрироваться
              </Button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
