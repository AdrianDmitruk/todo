import { FC, useEffect } from "react";

import { Card } from "../components";

import { fetchUser } from "../redux/user/async-actions";
import { useAppDispatch } from "../redux/store";
import { fetchTodo } from "../redux/todo/async-actions";
import { MainCalendar } from "../components/MainCalendar";
import { useSelector } from "react-redux";
import { selectTodoData } from "../redux/todo/selectors";
import { Button, Spin } from "antd";
import { Status } from "../redux/auth/types";

import cn from "classnames";
import { useNavigate } from "react-router-dom";

export const MainPage: FC = () => {
  const { data, status } = useSelector(selectTodoData);

  const navigate = useNavigate();

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchUser());
    dispatch(fetchTodo({}));
  }, [dispatch]);

  const handleAddTask = () => {
    navigate("/add");
  };

  return (
    <div className="container">
      <div className="mainWrap">
        <div className="mainCalndar">
          <MainCalendar />
        </div>

        <div
          className={cn("mainContent", {
            ["mainContentSpiner"]: status === Status.LOADING || !data.length,
          })}
        >
          {status === Status.LOADING ? (
            <Spin size="large" />
          ) : (
            data.map((elem) => <Card key={elem._id} elem={elem} />)
          )}

          {!data.length && status === Status.SECCESS && (
            <div className="mainNot">
              <h2 className="mainNotTitle">Новых задача пока нет</h2>
              <Button
                onClick={handleAddTask}
                className="headerBtn"
                type="primary"
              >
                Добавить задачу
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
