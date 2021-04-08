import React, { FC, ReactNode } from 'react';
import '../../theme.scss';
import './card.scss';
type CardWidth = 'full' | 'auto' | number;
interface Props {
  /** Card title, required */
  title: string;
  /** Card content*/
  content?: string | ReactNode;
  /** Deprecated: Use content*/
  description?: string;
  /** Card image , display on top of title */
  cardImageUrl?: string;
  /** Display card size to allow card responsively show in different device*/
  maxWidth?: number;
  /** Deprecated: Use maxWidth*/
  cardWidth?: CardWidth;
  /** Navigation to relate website from Card title */
  titleUrl?: string;
  /** customize footer by passing react component code */
  children?: React.ReactNode;
}
export const GoACard: FC<Props> = ({
  title,
  content,
  description = null,
  cardImageUrl = null,
  maxWidth = null,
  cardWidth = null,
  titleUrl = null,
  children = null,
}) => {
  return (
    <div className="goa-card" style={{ maxWidth: maxWidth ?? cardWidth ?? 'auto' }}>
      {cardImageUrl && (
        <div className="goa-poster">
          <img src={cardImageUrl} alt="Card cardImageUrl" />
        </div>
      )}
      <div className="card-content">
        <div className="goa-title">
          {titleUrl ? <a href={titleUrl}>{title}</a> : title}
        </div>
        <div className="goa-text">{content ?? description}</div>
        {children
          && <div className="goa-footer">{children}</div>
        }
      </div>
    </div>
  );
};

export default GoACard;
