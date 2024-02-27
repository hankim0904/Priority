import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  DragDropContext,
  DragStart,
  DropResult,
  Droppable,
} from 'react-beautiful-dnd';

import styles from './CardList.module.scss';
import classNames from 'classnames/bind';

import { Card } from '../ui-card/Card';
import {
  ChangedTodo,
  QUERY_KEYS,
  TodoListData,
  getTodoList,
  patchTodo,
} from '../utils';
import { useEffect, useRef, useState } from 'react';

const cx = classNames.bind(styles);

export const CardList = () => {
  const queryClient = useQueryClient();
  const [activeId, setActiveId] = useState<string>('');
  const cardRef = useRef<HTMLDivElement>(null);

  const {
    data: todoListData,
    isLoading,
    isError,
  } = useQuery<TodoListData>({
    queryKey: [QUERY_KEYS.TODOS],
    queryFn: getTodoList,
  });

  const todoList = todoListData?.todos ?? [];

  const patchTodoMutation = useMutation({
    mutationFn: (changedTodo: ChangedTodo) => patchTodo(changedTodo),
    onMutate: async (changedTodo: ChangedTodo) => {
      await queryClient.cancelQueries({ queryKey: [QUERY_KEYS.TODOS] });
      const prevTodoListData = queryClient.getQueryData<TodoListData>([
        QUERY_KEYS.TODOS,
      ]);
      const prevTodoList = prevTodoListData?.todos ?? [];

      const newTodoList = [...prevTodoList];
      const movedTodo = newTodoList.splice(changedTodo.oldIndex, 1)[0];
      newTodoList.splice(changedTodo.newIndex, 0, movedTodo);

      queryClient.setQueryData([QUERY_KEYS.TODOS], {
        ...prevTodoListData,
        todos: newTodoList,
      });
      return { prevTodoListData };
    },
    onError: (err, newTodo, context) => {
      queryClient.setQueryData([QUERY_KEYS.TODOS], context?.prevTodoListData);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.TODOS] });
    },
  });

  const hadleDragStart = (result: DragStart) => {
    const { draggableId } = result;

    setActiveId(draggableId);
  };

  const handleDragEnd = (result: DropResult) => {
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

    patchTodoMutation.mutate({
      todoId: draggableId,
      oldIndex: sourceIndex,
      newIndex: destinationIndex,
    });
  };

  useEffect(() => {
    const handleDocumentClick = (e: MouseEvent) => {
      if (cardRef.current && !cardRef.current.contains(e.target as Node)) {
        setActiveId('');
      }
    };
    document.addEventListener('click', handleDocumentClick);

    return () => {
      document.removeEventListener('click', handleDocumentClick);
    };
  }, [setActiveId]);

  if (isLoading) return '로딩 중입니다...';

  if (isError) return '에러가 발생했습니다.';

  return (
    <DragDropContext onDragEnd={handleDragEnd} onDragStart={hadleDragStart}>
      <div className={cx('container')} ref={cardRef}>
        <Droppable droppableId="droppableList">
          {(provided) => (
            <div
              className={cx('todo-list')}
              ref={provided.innerRef}
              {...provided.droppableProps}
            >
              {todoList.map((todo, index) => (
                <Card
                  id={todo._id}
                  key={todo._id}
                  index={index}
                  title={todo.title}
                  color={todo.color}
                  backgroundColor={todo.backgroundColor}
                  activeId={activeId}
                  todoListLength={todoList.length}
                  todoListNotDoneLength={
                    todoList.filter((todo) => !todo.isDone).length
                  }
                  isDone={todo.isDone}
                  setActiveId={setActiveId}
                  patchTodoMutation={patchTodoMutation.mutate}
                />
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </div>
    </DragDropContext>
  );
};
