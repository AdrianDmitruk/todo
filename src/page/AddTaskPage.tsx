import { FC, useState } from "react";
import {
  Input,
  DatePicker,
  DatePickerProps,
  ConfigProvider,
  Button,
} from "antd";
import dayjs, { Dayjs } from "dayjs";
import ruRU from "antd/es/locale/ru_RU";
import "dayjs/locale/ru";

export const AddTaskPage: FC = () => {
  const { TextArea } = Input;

  dayjs.locale("ru");

  const [selectedDate, setSelectedDate] = useState<Dayjs | null>(null);

  const onChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    console.log(e);
  };

  const disabledDate: DatePickerProps["disabledDate"] = (current) => {
    const today = dayjs().startOf("day");
    const selectedDate = dayjs(current).startOf("day");
    return selectedDate.isBefore(today);
  };

  const handleDateChange = (date: Dayjs | null) => {
    setSelectedDate(date);
  };

  console.log(selectedDate);

  return (
    <div className="container">
      <div className="add">
        <h2 className="addTitle">Добавить задачу</h2>
        <form className="addForm">
          <Input
            placeholder="Введите название задачи"
            allowClear
            onChange={onChange}
          />
          <TextArea
            placeholder="Введите описание"
            allowClear
            onChange={onChange}
          />
          <ConfigProvider locale={ruRU}>
            <DatePicker
              placeholder="Введите дату,"
              format="DD.MM.YYYY"
              disabledDate={disabledDate}
              onChange={handleDateChange}
            />
          </ConfigProvider>

          <div className="addFormBtn">
            <Button className="btn" type="primary">
              Добавить
            </Button>
            <Button className="btn">Назад</Button>
          </div>
        </form>
      </div>
    </div>
  );
};
