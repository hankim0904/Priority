export interface NewTodo {
  title: string;
  content?: string;
}

export interface Todo {
  isDone: boolean;
  _id: string;
  index: number;
  title: string;
  content?: string;
  color: string;
  backgroundColor: string;
}

export interface TodoListData {
  todos: Todo[];
  cursorIndex: string | null;
  totalCount: number;
}

export interface ChangedIndex {
  isDone?: boolean;
  todoId: string;
  oldIndex: number;
  newIndex: number;
}

export interface ChangedTodo {
  todoId: string | string[];
  title: string;
  content: string;
}
