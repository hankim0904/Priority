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

export interface TodoPage {
  todos: Todo[];
  cursorIndex: string | null;
  totalCount: number;
}

export interface TodoPages {
  pages: TodoPage[];
  pageParams: (number | null)[];
}

export interface ChangedTodo {
  todoId: string;
  oldIndex: number;
  newIndex: number;
}
