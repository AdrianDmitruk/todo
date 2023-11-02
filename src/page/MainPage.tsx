import { FC, useEffect } from "react";

import { Card } from "../components";

import { fetchUser } from "../redux/user/async-actions";
import { useAppDispatch } from "../redux/store";
import { fetchTodo } from "../redux/todo/async-actions";
import { MainCalendar } from "../components/MainCalendar";
import { useSelector } from "react-redux";
import { selectTodoData } from "../redux/todo/selectors";
import { Spin } from "antd";
import { Status } from "../redux/auth/types";

export const MainPage: FC = () => {
  const { data, status } = useSelector(selectTodoData);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchUser());
    dispatch(fetchTodo({}));
  }, [dispatch]);

  return (
    <div className="container">
      <div className="mainWrap">
        <div className="mainCalndar">
          <MainCalendar />
        </div>

        <div className="mainContent">
          {status === Status.LOADING ? (
            <Spin size="large" />
          ) : (
            data.map((elem) => <Card key={elem._id} elem={elem} />)
          )}
        </div>
      </div>
    </div>
  );
};
