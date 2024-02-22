export interface NewTodo {
  title: string;
  content?: string;
}

export interface Todo {
  _id: string;
  index: number;
  title: string;
  content?: string;
  color: string;
  backgroundColor: string;
}

export interface TodoPages {
  todos: Todo[];
  cursorIndex: string | null;
}

export interface ChangedTodo {
  todoId: string;
  newIndex: number;
}
