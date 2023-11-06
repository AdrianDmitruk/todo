import { PickerLocale } from "./type";

export const locale: PickerLocale = {
  lang: {
    locale: "ru",
    placeholder: "Выберите дату",
    rangePlaceholder: ["Начальная дата", "Конечная дата"],
    today: "Сегодня",
    now: "Сейчас",
    backToToday: "Вернуться к сегодня",
    ok: "OK",
    clear: "Очистить",
    month: "Месяц",
    year: "Год",
    timeSelect: "Выбрать время",
    dateSelect: "Выбрать дату",
    monthSelect: "Выбрать месяц",
    yearSelect: "Выбрать год",
    decadeSelect: "Выбрать десятилетие",
    yearFormat: "YYYY",
    dateFormat: "D.M.YYYY",
    dayFormat: "D",
    dateTimeFormat: "D.M.YYYY HH:mm:ss",
    monthBeforeYear: true,
    previousMonth: "Предыдущий месяц (PageUp)",
    nextMonth: "Следующий месяц (PageDown)",
    previousYear: "Предыдущий год (Control + left)",
    nextYear: "Следующий год (Control + right)",
    previousDecade: "Предыдущее десятилетие",
    nextDecade: "Следующее десятилетие",
    previousCentury: "Предыдущий век",
    nextCentury: "Следующий век",
  },
  timePickerLocale: {
    placeholder: "Выберите время",
  },
};

export const formatTime = (milliseconds: number): string => {
  const seconds = Math.floor(milliseconds / 1000);
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = seconds % 60;

  if (hours === 0 && minutes === 0 && remainingSeconds === 0) {
    return "0 секунд";
  }

  let formattedTime = "";

  if (hours > 0) {
    const formattedHours = formatNumberWithEnding(hours, [
      "час",
      "часа",
      "часов",
    ]);
    formattedTime += `${formattedHours} `;
  }

  if (minutes > 0) {
    const formattedMinutes = formatNumberWithEnding(minutes, [
      "минута",
      "минуты",
      "минут",
    ]);
    formattedTime += `${formattedMinutes} `;
  }

  if (remainingSeconds > 0) {
    const formattedSeconds = formatNumberWithEnding(remainingSeconds, [
      "секунда",
      "секунды",
      "секунд",
    ]);
    formattedTime += `${formattedSeconds}`;
  }

  return formattedTime.trim();
};

const formatNumberWithEnding = (number: number, endings: string[]): string => {
  const cases = [2, 0, 1, 1, 1, 2];
  const index =
    number % 100 > 4 && number % 100 < 20 ? 2 : cases[Math.min(number % 10, 5)];

  return `${number} ${endings[index]}`;
};
