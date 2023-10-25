import { FC } from "react";
import { Button } from "antd";

export const Card: FC = () => {
  return (
    <div className="card">
      <div className="cardWrapTask">
        <h2 className="cardTitle">Заголовок</h2>
        <p className="cardSubtitle">Описание задачи</p>
      </div>
      <div className="cardWrapBtn">
        <Button className="btn" type="primary">
          Начать
        </Button>
        <div className="cardLeftBtn">
          <Button className="btn">Редактировать</Button>
          <Button className="btn" danger type="dashed">
            Удалить
          </Button>
        </div>
      </div>
    </div>
  );
};
