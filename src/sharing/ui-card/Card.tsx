import { useEffect, useRef, useState } from 'react';

import styles from './Card.module.scss';
import classNames from 'classnames/bind';
import { Draggable } from 'react-beautiful-dnd';
import { MenuBar } from '../feat-menu-bar/MenuBar';
import { ChangedTodo } from '../util';

const cx = classNames.bind(styles);

interface CardProp {
  id: string;
  index: number;
  title: string;
  color: string;
  backgroundColor: string;
  activeId: string;
  todoListLength: number;
  isDone: boolean;
  setActiveId: (id: string) => void;
  patchTodoMutation: (changedTodo: ChangedTodo) => void;
}

export const Card = ({
  id,
  index,
  title,
  color,
  backgroundColor,
  activeId,
  todoListLength,
  isDone,
  setActiveId,
  patchTodoMutation,
}: CardProp) => {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleCardClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setActiveId(id);
  };

  const handleNumberClick = () => {
    const changedTodo: ChangedTodo = {
      todoId: id,
      oldIndex: index,
      newIndex: todoListLength - 1,
      isDone: !isDone,
    };
    patchTodoMutation(changedTodo);
  };

  useEffect(() => {
    cardRef.current?.style.setProperty('--random-color', color);
    cardRef.current?.style.setProperty(
      '--random-background-color',
      backgroundColor
    );
  }, [backgroundColor, color]);

  return (
    <Draggable draggableId={id} index={index}>
      {(provided) => (
        <article
          className={cx('card')}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          onClick={handleCardClick}
        >
          <div
            className={cx('card-container', { active: id === activeId })}
            ref={cardRef}
          >
            <div className={cx('card-element')}>
              <button
                className={cx('card-element-number')}
                type="button"
                onClick={handleNumberClick}
              >
                {isDone ? <span>✓</span> : <span>{index + 1}</span>}
              </button>
              <button
                className={cx('card-element-content', { done: isDone })}
                type="button"
              >
                <p>{title}</p>
              </button>
            </div>
            <MenuBar todoId={id} />
          </div>
        </article>
      )}
    </Draggable>
  );
};
