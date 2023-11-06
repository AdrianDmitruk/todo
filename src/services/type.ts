export interface ICreateTodo {
  title: string | undefined;
  description: string;
  day?: number | null;
  month?: number | null;
  year?: number | null;
}

export interface IUpdateTodo {
  _id?: string;
  started?: boolean;
  completed?: boolean;
  title?: string | undefined;
  description?: string;
  day?: number | null;
  month?: number | null;
  year?: number | null;
}

export type PickerLocale = {
  lang: {
    locale: string;
    placeholder: string;
    rangePlaceholder: [string, string];
    today: string;
    now: string;
    backToToday: string;
    ok: string;
    clear: string;
    month: string;
    year: string;
    timeSelect: string;
    dateSelect: string;
    monthSelect: string;
    yearSelect: string;
    decadeSelect: string;
    yearFormat: string;
    dateFormat: string;
    dayFormat: string;
    dateTimeFormat: string;
    monthBeforeYear: boolean;
    previousMonth: string;
    nextMonth: string;
    previousYear: string;
    nextYear: string;
    previousDecade: string;
    nextDecade: string;
    previousCentury: string;
    nextCentury: string;
  };
  timePickerLocale: {
    placeholder: string;
  };
};
