import { Button, Input } from "antd";
import { FC } from "react";
import { Link } from "react-router-dom";

type FormType = "login" | "register";

interface AuthPageProps {
  type: FormType;
}

export const AuthPage: FC<AuthPageProps> = ({ type }) => {
  const isRegisterForm = type === "register";

  const title = isRegisterForm ? "Регистрация" : "Вход";
  const firstNameInput = isRegisterForm && <Input placeholder="Введите имя" />;
  const lastNameInput = isRegisterForm && (
    <Input placeholder="Введите фамилию" />
  );
  const actionButton = isRegisterForm ? (
    <Button className="btn" type="primary">
      Зарегистрироваться
    </Button>
  ) : (
    <Button className="btn" type="primary">
      Войти
    </Button>
  );
  const authText = isRegisterForm ? (
    <>
      Если есть аккаунт,{" "}
      <Link className="addAuthLink" to={"/auth"}>
        Войдите!
      </Link>
    </>
  ) : (
    <>
      Если нет аккаунта,{" "}
      <Link className="addAuthLink" to={"/register"}>
        Зарегистрируйтесь!
      </Link>
    </>
  );

  return (
    <div className="container">
      <div className="add">
        <h2 className="addTitle">{title}</h2>
        <form className="addForm">
          {firstNameInput}
          {lastNameInput}
          <Input placeholder="Введите Email" />
          <Input.Password placeholder="Введите пароль" />
          {actionButton}
          <p className="addAuth">{authText}</p>
        </form>
      </div>
    </div>
  );
};
