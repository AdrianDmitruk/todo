import { Button, Input } from "antd";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { FC } from "react";
import { Link } from "react-router-dom";
import { useAppDispatch } from "../redux/store";
import { fetchLogin } from "../redux/auth/async-actions";

import { useSelector } from "react-redux";
import { selectRegistrationData } from "../redux/auth/selectors";
import { IAuthData, Status } from "../redux/auth/types";

type FormType = "login" | "register";

interface AuthPageProps {
  type: FormType;
}

export const AuthPage: FC<AuthPageProps> = ({ type }) => {
  const initialValues: IAuthData = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  };

  const { status } = useSelector(selectRegistrationData);

  const dispatch = useAppDispatch();

  const isRegisterForm = type === "register";

  const title = isRegisterForm ? "Регистрация" : "Вход";
  const authText = isRegisterForm ? (
    <>
      Если есть аккаунт,{" "}
      <Link className="addAuthLink" to="/auth">
        Войдите!
      </Link>
    </>
  ) : (
    <>
      Если нет аккаунта,{" "}
      <Link className="addAuthLink" to="/register">
        Зарегистрируйтесь!
      </Link>
    </>
  );

  const onSubmit = (values: IAuthData) => {
    const params = {
      firstName: values.firstName,
      lastName: values.lastName,
      email: values.email,
      password: values.password,
    };

    dispatch(fetchLogin(params));
  };

  return (
    <div className="container">
      <div className="add">
        <h2 className="addTitle">{title}</h2>
        <Formik initialValues={initialValues} onSubmit={onSubmit}>
          <Form className="addForm">
            {isRegisterForm && (
              <>
                <Field name="firstName" placeholder="Введите имя" as={Input} />
                <ErrorMessage name="firstName" component="div" />
                <Field
                  name="lastName"
                  placeholder="Введите фамилию"
                  as={Input}
                />
                <ErrorMessage name="lastName" component="div" />
              </>
            )}
            <Field name="email" placeholder="Введите Email" as={Input} />
            <ErrorMessage name="email" component="div" />
            <Field
              name="password"
              placeholder="Введите пароль"
              as={Input.Password}
            />
            <ErrorMessage name="password" component="div" />
            {isRegisterForm ? (
              <Button className="btn" type="primary" htmlType="submit">
                Зарегистрироваться
              </Button>
            ) : (
              <Button
                className="btn"
                type="primary"
                htmlType="submit"
                loading={status === Status.LOADING}
              >
                Войти
              </Button>
            )}
            <p className="addAuth">{authText}</p>
          </Form>
        </Formik>
      </div>
    </div>
  );
};
