import { useRef } from 'react';
import {
  useInfiniteQuery,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';
import { DragDropContext, DropResult, Droppable } from 'react-beautiful-dnd';

import styles from './CardList.module.scss';
import classNames from 'classnames/bind';

import { Card } from '../ui-card/Card';
import { calculateIndex } from './calculateIndex';
import {
  ChangedTodo,
  QUERY_KEYS,
  Todo,
  TodoPage,
  TodoPages,
  getTodoList,
  patchTodo,
  useIntersectionObserver,
} from '../util';

const cx = classNames.bind(styles);

export const CardList = () => {
  const queryClient = useQueryClient();
  const bottomObserver = useRef<HTMLDivElement | null>(null);

  const {
    data: todoPagesInfo,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
  } = useInfiniteQuery<TodoPage>({
    queryKey: [QUERY_KEYS.TODOS],
    queryFn: ({ pageParam }) => getTodoList(pageParam),
    initialPageParam: null,
    getNextPageParam: (lastPage) => lastPage.cursorIndex,
  });
  const todoPages = todoPagesInfo?.pages ?? [];

  const fetchNextCardList = () => {
    if (!isFetchingNextPage && hasNextPage) {
      fetchNextPage();
    }
  };
  useIntersectionObserver(bottomObserver, fetchNextCardList, { threshold: 0 });

  const patchTodoMutation = useMutation({
    mutationFn: (changedTodo: ChangedTodo) => patchTodo(changedTodo),
    onMutate: async (changedTodo: ChangedTodo) => {
      await queryClient.cancelQueries({ queryKey: [QUERY_KEYS.TODOS] });
      const prevTodos = queryClient.getQueryData<TodoPages>([QUERY_KEYS.TODOS]);

      if (!prevTodos) return;

      const newTodos = prevTodos.pages.map((page) => {
        const todos = [...page.todos];
        if (todos.some((todo) => todo._id === changedTodo.todoId)) {
          const movedTodo = todos.find(
            (todo) => todo._id === changedTodo.todoId
          );
          if (!movedTodo) return;
          todos.splice(todos.indexOf(movedTodo), 1);
          todos.splice(changedTodo.newIndex, 0, movedTodo);
        }

        console.log(todos);
        return { ...page, todos };
      });

      queryClient.setQueryData([QUERY_KEYS.TODOS], {
        ...prevTodos,
        pages: newTodos,
      });
      return { prevTodos };
    },
    onError: (
      error: Error,
      variables: ChangedTodo,
      context:
        | {
            prevTodos: TodoPages;
          }
        | undefined
    ) => {
      queryClient.setQueryData([QUERY_KEYS.TODOS], context?.prevTodos);
    },
  });

  const handleDragEnd = async (result: DropResult) => {
    const { source, destination, draggableId } = result;
    if (
      !destination ||
      (source.droppableId === destination.droppableId &&
        source.index === destination.index)
    ) {
      return;
    }

    const sourceIndex = source.index;
    const destinationIndex = destination.index;

    await patchTodoMutation.mutateAsync({
      todoId: draggableId,
      oldIndex: sourceIndex,
      newIndex: destinationIndex,
    });
  };

  if (isLoading) return '로딩 중입니다...';

  if (isError) return '에러가 발생했습니다.';

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <div className={cx('container')}>
        {todoPages.map(({ todos }, todoPageIndex) =>
          todos.map((todo, todoIndex) => (
            <Droppable
              droppableId={`${calculateIndex(todoPageIndex, todoIndex)}`}
              key={`${calculateIndex(todoPageIndex, todoIndex)}`}
            >
              {(provided) => (
                <div
                  className={cx('todo-list')}
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                >
                  <Card
                    id={todo._id}
                    index={todo.index}
                    title={todo.title}
                    color={todo.color}
                    backgroundColor={todo.backgroundColor}
                  />
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          ))
        )}
        <span className={cx('observer')} ref={bottomObserver}></span>
      </div>
    </DragDropContext>
  );
};
