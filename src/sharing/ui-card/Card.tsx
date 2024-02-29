import { useEffect, useRef } from 'react';

import styles from './Card.module.scss';
import classNames from 'classnames/bind';

import { useCardId } from '@/src/context/FocusedCardIdContext';
import { Draggable } from 'react-beautiful-dnd';
import { MenuBar } from '../feat-menu-bar/MenuBar';
import { ChangedIndex } from '../utils';

const cx = classNames.bind(styles);

interface CardProp {
  id: string;
  index: number;
  title: string;
  color: string;
  backgroundColor: string;
  activeId: string;
  todoListLength: number;
  todoListNotDoneLength: number;
  isDone: boolean;
  setActiveId: (id: string) => void;
  patchTodoMutation: (changedTodo: ChangedIndex) => void;
}

export const Card = ({
  id,
  index,
  title,
  color,
  backgroundColor,
  activeId,
  todoListLength,
  todoListNotDoneLength,
  isDone,
  setActiveId,
  patchTodoMutation,
}: CardProp) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const { focusedCardId, setFocusedCardId } = useCardId();
  const focusedCardRef = useRef<HTMLDivElement>(null);

  const handleCardClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setActiveId(id);
  };

  const handleNumberClick = () => {
    const changedTodo: ChangedIndex = {
      todoId: id,
      oldIndex: index,
      isDone: !isDone,
      newIndex: !isDone ? todoListLength - 1 : todoListNotDoneLength,
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

  useEffect(() => {
    if (focusedCardId && focusedCardRef.current) {
      focusedCardRef.current.scrollIntoView({
        behavior: 'smooth',
      });
      setFocusedCardId('');
    }
  }, [focusedCardId, setFocusedCardId]);

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
            <div
              className={cx('card-element')}
              ref={id === focusedCardId ? focusedCardRef : undefined}
            >
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
