import { useEffect, useRef } from 'react';

import styles from './Card.module.scss';
import classNames from 'classnames/bind';
import { Draggable } from 'react-beautiful-dnd';

const cx = classNames.bind(styles);

interface CardProp {
  id: string;
  index: number;
  title: string;
  color: string;
  backgroundColor: string;
}

export const Card = ({
  id,
  index,
  title,
  color,
  backgroundColor,
}: CardProp) => {
  const cardRef = useRef<HTMLDivElement>(null);

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
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        >
          <div className={cx('card')} ref={cardRef}>
            <p className={cx('card-content')}>{title}</p>
          </div>
        </article>
      )}
    </Draggable>
  );
};
