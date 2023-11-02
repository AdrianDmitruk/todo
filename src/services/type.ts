export interface ICreateTodo {
  title: string;
  description: string;
  date: string | null;
}

export interface IUpdateTodo {
  _id: string;
  started?: boolean;
  completed?: boolean;
}
