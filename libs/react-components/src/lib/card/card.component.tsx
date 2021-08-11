import React, { FC, ReactNode, useState } from 'react';
import '../../theme.scss';
import './card.scss';

interface Props {
  /** Card title, required */
  title: string | ReactNode;
  /** Card content*/
  content?: string | ReactNode;
  /** Deprecated: Use content*/
  description?: string;
  /** Card image , display on top of title */
  cardImageUrl?: string;
  /** Minimum width of the card */
  minWidth?: string;
  /** Maximum width of the card */
  maxWidth?: string;
  /** Navigation to relate website from Card title */
  titleUrl?: string;
  /** customize footer by passing react component code */
  children?: React.ReactNode;

  other?: unknown;
}

export const GoACard: FC<Props> = ({
  title,
  content,
  description = null,
  cardImageUrl = null,
  titleUrl = null,
  children = null,
  minWidth = 'auto',
  maxWidth = 'auto',
  ...other
}) => {

  const [imgHeight, setImgHeight] = useState<number>(null)

  return (
    <div className="goa-card" data-testid='card-container' style={{ minWidth, maxWidth }} {...other}>
      {cardImageUrl &&
        <div className="goa-poster-image" data-testid='card-img'>
          <img height={imgHeight} src={cardImageUrl} alt="Card cardImageUrl" />
        </div>
      }
      <div className="card-content">
        <div className="goa-title" data-testid='card-title'>
          {titleUrl
            ? <a href={titleUrl} data-testid='card-title-link'>{title}</a>
            : <div>{title}</div>
          }
        </div>
        <p className="goa-text" data-testid='card-content'>{content ?? description}</p>
        {children
          && <div className="goa-footer" data-testid='card-footer'>{children}</div>
        }
      </div>
    </div>
  );
};

export default GoACard;

// *********
// Skeletons
// *********

export const GoALoadingCardWithImage = (props: Props) => (
  <GoACard
    {...props}
    data-skeleton
    title="Lorem ipsum dolor sit amet elit"
    content="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam."
    cardImageUrl="data:image/gif;base64,R0lGODlhAQABAPAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw=="
  >Lorem ipsum dolor sit amet</GoACard>
)

export const GoALoadingCardNoImage = (props: Props) => (
  <GoACard
    {...props}
    data-skeleton
    title="Lorem ipsum dolor sit amet elit"
    content="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam."
  >Lorem ipsum dolor sit amet</GoACard>
)
