import { FC, useEffect } from "react";
import { useSelector } from "react-redux";
import { selectUserData } from "../redux/user/selectors";

import { Status } from "../redux/user/types";
import { Button, Spin } from "antd";
import { useAppDispatch } from "../redux/store";
import { fetchUser } from "../redux/user/async-actions";
import { logout } from "../redux/auth/slice";
import { TOKEN_JWT } from "../constans";

export const ProfilePage: FC = () => {
  const { data, status } = useSelector(selectUserData);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchUser());
  }, [dispatch]);

  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem(TOKEN_JWT);
  };

  return (
    <div className="container">
      <div className="add">
        {status === Status.LOADING ? (
          <Spin size="large" />
        ) : (
          <>
            <h2 className="addTitle">
              {data.firstName} {data.lastName}
            </h2>
            <div>Email: {data.email}</div>
            <div>Колличество задач: {data.tasks.length}</div>
            <Button onClick={handleLogout} type="primary">
              Выйти
            </Button>
          </>
        )}
      </div>
    </div>
  );
};
