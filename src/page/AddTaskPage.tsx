import React, { FC, useEffect } from "react";
import { Input, DatePicker, ConfigProvider, Button } from "antd";
import dayjs, { Dayjs } from "dayjs";
import ruRU from "antd/es/locale/ru_RU";
import "dayjs/locale/ru";
import { useForm, Controller } from "react-hook-form";
import { ICreateTodo } from "../services/type";
import { createTodo, getOneTodo } from "../services/todoServices";
import { useNavigate, useParams } from "react-router-dom";
import { Todo } from "../redux/todo/types";

import cn from "classnames";

interface AddTaskProps {
  isEdit?: boolean;
}

export const AddTaskPage: FC<AddTaskProps> = ({ isEdit }) => {
  const { TextArea } = Input;
  const { control, handleSubmit, formState, reset } = useForm<ICreateTodo>();
  const { isDirty, isValid } = formState;

  dayjs.locale("ru");

  const [selectedDate, setSelectedDate] = React.useState<Dayjs | null>(null);

  const [data, setData] = React.useState<Todo | undefined>(undefined);

  const disabledDate = (current: Dayjs) => {
    const today = dayjs().startOf("day");
    const selectedDate = current.startOf("day");
    return selectedDate.isBefore(today);
  };

  const handleDateChange = (date: Dayjs | null) => {
    setSelectedDate(date);
  };

  const navigate = useNavigate();

  const { id } = useParams<{ id: string | undefined }>();

  useEffect(() => {
    if (id) {
      getOneTodo(id).then((elem) => {
        setData(elem.data);
        const day = elem?.data?.day as number | undefined;
        const month = elem?.data?.month as number | undefined;
        const year = elem?.data?.year as number | undefined;

        if (day !== undefined && month !== undefined && year !== undefined) {
          const adjustedMonth = month - 1;
          const date = dayjs().year(year).month(adjustedMonth).date(day);
          setSelectedDate(date);
        }
      });
    }
  }, [id]);

  useEffect(() => {
    if (isEdit && data) {
      reset({
        title: data.title,
        description: data.description,
        day: +data.day,
        month: +data.month,
        year: +data.year,
      });
    }
  }, [isEdit, data]);

  const onSubmit = (values: ICreateTodo) => {
    const params = {
      title: values.title,
      description: values.description,
      day: selectedDate && selectedDate.date(),
      month: selectedDate && selectedDate.month() + 1,
      year: selectedDate && selectedDate.year(),
    };

    createTodo(params).then((res) => res.status && navigate("/"));
  };

  return (
    <div
      className={cn("container", {
        ["containerData"]: data,
      })}
    >
      <div className="add">
        <h2 className="addTitle">
          {isEdit ? "Редактировать задачу" : "Добавить задачу"}
        </h2>
        <form onSubmit={handleSubmit(onSubmit)} className="addForm">
          <Controller
            name="title"
            control={control}
            defaultValue={isEdit && data ? data.title : ""}
            rules={{ required: "Введите название задачи" }}
            render={({ field, fieldState }) => (
              <div>
                <Input
                  {...field}
                  placeholder="Введите название задачи"
                  allowClear
                />
                {fieldState.invalid && (
                  <div className="error-message">
                    {fieldState.error?.message}
                  </div>
                )}
              </div>
            )}
          />

          <Controller
            name="description"
            control={control}
            defaultValue=""
            rules={{ required: "Введите описание" }}
            render={({ field, fieldState }) => (
              <div>
                <TextArea
                  {...field}
                  placeholder="Введите описание"
                  allowClear
                />
                {fieldState.invalid && (
                  <div className="error-message">
                    {fieldState.error?.message}
                  </div>
                )}
              </div>
            )}
          />

          <ConfigProvider locale={ruRU}>
            <DatePicker
              placeholder="Введите дату"
              format="DD.MM.YYYY"
              value={selectedDate}
              disabledDate={disabledDate}
              onChange={handleDateChange}
            />
          </ConfigProvider>

          <div className="addFormBtn">
            <Button
              className="btn"
              type="primary"
              htmlType="submit"
              disabled={!isDirty || !isValid}
            >
              {isEdit ? "Редактировать" : "Добавить"}
            </Button>
            <Button className="btn" onClick={() => navigate("/")}>
              Назад
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};
