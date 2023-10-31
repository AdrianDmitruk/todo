import { FC, useEffect } from "react";

import type { Dayjs } from "dayjs";

import { Calendar, theme } from "antd";
import type { CalendarProps } from "antd";
import { Card } from "../components";

import { fetchUser } from "../redux/user/async-actions";
import { useAppDispatch } from "../redux/store";

export const MainPage: FC = () => {
  const onPanelChange = (value: Dayjs, mode: CalendarProps<Dayjs>["mode"]) => {
    console.log(value.format("YYYY-MM-DD"), mode);
  };

  const { token } = theme.useToken();

  const wrapperStyle: React.CSSProperties = {
    width: 300,
    border: `1px solid ${token.colorBorderSecondary}`,
    borderRadius: token.borderRadiusLG,
  };

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchUser());
  }, []);

  return (
    <div className="container">
      <div className="mainWrap">
        <div className="mainCalndar">
          <div style={wrapperStyle}>
            <Calendar fullscreen={false} onPanelChange={onPanelChange} />
          </div>
        </div>
        <div className="mainContent">
          <Card />
          <Card />
          <Card />
        </div>
      </div>
    </div>
  );
};
