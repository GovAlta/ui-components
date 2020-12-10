import React, { Children, ReactNode, FC } from 'react';
import { GoACard } from '../card/card.component';
import './card.group.scss';

type CardGroupLayout = 'basic' | 'column';

interface CardItem {
  title: string;
  /** Card description */
  description?: string;
  /** Card image , display on top of title */
  cardImageUrl?: string;
  /** Display card size to allow card responsively show in different device*/
  cardWidth?: number;
  /** Navigation to relate webside from Card title */
  titleUrl?: string;
  /** customize footer by passing react component code */
  children?: React.ReactNode;
}

interface Props {
  title?: string;
  children?: React.ReactNode;
  layout: CardGroupLayout;
  cardItems?: CardItem[];
}
export const GoACardGroup: FC<Props> = ({
  title = null,
  children = null,
  layout = 'basic',
  cardItems = null,
}) => {
  function getCards() {
    if (children) {
      return children;
    }

    return cardItems.map((item: CardItem, index: number) => {
      return (
        <GoACard {...item} key={index}>
          {item.children}
        </GoACard>
      );
    });
  }

  return (
    <div className="goa-card-group">
      <div className="card-group-title">{title}</div>
      <div className={`card-group-${layout}`}>{getCards()}</div>
    </div>
  );
};

export default GoACardGroup;
