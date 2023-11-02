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
import { Formik, Form, Field, ErrorMessage } from "formik";
import { ICreateTodo } from "../services/type";
import { createTodo } from "../services/todoServices";
import { useNavigate } from "react-router-dom";

export const AddTaskPage: FC = () => {
  const { TextArea } = Input;

  dayjs.locale("ru");

  const [selectedDate, setSelectedDate] = useState<Dayjs | null>(null);

  const disabledDate: DatePickerProps["disabledDate"] = (current) => {
    const today = dayjs().startOf("day");
    const selectedDate = dayjs(current).startOf("day");
    return selectedDate.isBefore(today);
  };

  const handleDateChange = (date: Dayjs | null) => {
    setSelectedDate(date);
  };

  const navigate = useNavigate();

  const formattedDate = selectedDate
    ? `${selectedDate.date()}.${
        selectedDate.month() + 1
      }.${selectedDate.year()}`
    : "";

  const initialValues: ICreateTodo = {
    title: "",
    description: "",
    date: null,
  };

  const onSubmit = (values: ICreateTodo) => {
    console.log(values);

    const params = {
      title: values.title,
      description: values.description,
      date: formattedDate,
    };

    createTodo(params).then((res) => res.status && navigate("/"));
  };

  const validate = (values: ICreateTodo) => {
    const errors: Partial<ICreateTodo> = {};

    if (!values.title) {
      errors.title = "Введите название задачи";
    }

    if (!values.description) {
      errors.description = "Введите описание";
    }

    return errors;
  };

  return (
    <div className="container">
      <div className="add">
        <h2 className="addTitle">Добавить задачу</h2>
        <Formik
          initialValues={initialValues}
          onSubmit={onSubmit}
          validate={validate}
        >
          <Form className="addForm">
            <Field
              type="text"
              name="title"
              placeholder="Введите название задачи"
              as={Input}
              allowClear
            />
            <ErrorMessage name="title" component="div" />

            <Field
              name="description"
              placeholder="Введите описание"
              as={TextArea}
              allowClear
            />
            <ErrorMessage name="description" component="div" />

            <ConfigProvider locale={ruRU}>
              <DatePicker
                placeholder="Введите дату"
                format="DD.MM.YYYY"
                disabledDate={disabledDate}
                onChange={handleDateChange}
              />
            </ConfigProvider>

            <div className="addFormBtn">
              <Button className="btn" type="primary" htmlType="submit">
                Добавить
              </Button>
              <Button className="btn" onClick={() => {}}>
                Назад
              </Button>
            </div>
          </Form>
        </Formik>
      </div>
    </div>
  );
};
