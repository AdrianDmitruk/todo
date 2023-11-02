import { FC, useEffect, useState } from "react";
import moment, { Dayjs } from "dayjs";
import "dayjs/locale/ru";

import { Calendar, theme } from "antd";
import { fetchTodo } from "../redux/todo/async-actions";
import { useAppDispatch } from "../redux/store";
import { locale } from "../services/utils";

moment.locale("ru");

export const MainCalendar: FC = () => {
  const [selectedDate, setSelectedDate] = useState<Dayjs | null>(null);

  const onSelect = (value: Dayjs) => {
    setSelectedDate(value);
  };

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (selectedDate) {
      dispatch(
        fetchTodo({
          day: selectedDate.date(),
          month: selectedDate.month() + 1,
          year: selectedDate.year(),
        })
      );
    }
  }, [selectedDate]);

  const { token } = theme.useToken();

  const wrapperStyle: React.CSSProperties = {
    width: 300,
    border: `1px solid ${token.colorBorderSecondary}`,
    borderRadius: token.borderRadiusLG,
  };

  return (
    <div style={wrapperStyle}>
      <Calendar fullscreen={false} onSelect={onSelect} locale={locale} />
    </div>
  );
};
