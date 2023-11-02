import { FC } from "react";
import { Button } from "antd";
import { Todo } from "../redux/todo/types";
import { removeTodo, updateTodo } from "../services/todoServices";
import { useAppDispatch } from "../redux/store";
import { fetchTodo } from "../redux/todo/async-actions";

import cn from "classnames";

interface CardProps {
  elem: Todo;
}

export const Card: FC<CardProps> = (elem) => {
  const { title, description, timeTaken, _id, started, completed } = elem.elem;

  const dispatch = useAppDispatch();

  const handleRemoveTodo = () => {
    removeTodo(_id).then((res) => {
      if (res.status) {
        dispatch(fetchTodo());
      }
    });
  };

  const handleStartTodo = () => {
    const params = {
      _id,
      title,
      description,
      started: true,
    };

    updateTodo(params).then((res) => {
      if (res.status) {
        dispatch(fetchTodo());
      }
    });
  };

  const handleEndTodo = () => {
    const params = {
      _id,
      title,
      description,
      completed: true,
    };

    updateTodo(params).then((res) => {
      if (res.status) {
        dispatch(fetchTodo());
      }
    });
  };

  return (
    <div
      className={cn("card", {
        ["cardComplited"]: completed,
      })}
    >
      <div className="cardWrapTask">
        <h2
          className={cn("cardTitle", {
            ["cardTitleComplited"]: completed,
          })}
        >
          {title}
        </h2>
        <p
          className={cn("cardSubtitle", {
            ["cardSubtitleComplited"]: completed,
          })}
        >
          {description}
        </p>
      </div>
      <div
        className={cn("cardWrapBtn", {
          ["cardWrapBtnComplited"]: completed,
        })}
      >
        {!!timeTaken && <div>Времени потрачено: {timeTaken}</div>}

        {!!started && !timeTaken && (
          <Button onClick={handleEndTodo} className="btn" type="dashed">
            Закончить задачу
          </Button>
        )}

        {!started && (
          <Button onClick={handleStartTodo} className="btn" type="primary">
            Начать
          </Button>
        )}

        <div className="cardLeftBtn">
          {!completed && <Button className="btn">Редактировать</Button>}

          <Button
            onClick={handleRemoveTodo}
            className="btn"
            danger
            type="dashed"
          >
            Удалить
          </Button>
        </div>
      </div>
    </div>
  );
};
