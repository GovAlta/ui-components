import React, { FC } from 'react';
import '../../theme.scss';
import './card.scss';
type CardWidth = 'full' | 'auto' | number;
interface Props {
  /** Card title, required */
  title: string;
  /** Card description */
  description?: string;
  /** Card image , display on top of title */
  cardImageUrl?: string;
  /** Display card size to allow card responsively show in different device*/
  cardWidth?: CardWidth;
  /** Navigation to relate webside from Card title */
  titleUrl?: string;
  /** customize footer by passing react component code */
  children?: React.ReactNode;
}
export const GoACard: FC<Props> = ({
  title,
  description = null,
  cardImageUrl = null,
  cardWidth = 'auto',
  titleUrl = null,
  children = null,
}) => {
  return (
    <div className="goa-card" style={{ width: cardWidth }}>
      {cardImageUrl && (
        <div className="goa-poster">
          <img src={cardImageUrl} alt="Card cardImageUrl" />
        </div>
      )}
      <div className="card-content">
        <div className="goa-title">
          {titleUrl ? <a href={titleUrl}>{title}</a> : title}
        </div>
        <div className="goa-text">{description}</div>
        <div className="goa-footer">{children}</div>
      </div>
    </div>
  );
};

export default GoACard;
