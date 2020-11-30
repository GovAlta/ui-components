import React, { useState } from 'react';
import PropTypes from 'prop-types';
import '../../theme.scss';
import '../../../../core-css/src/lib/styles/notification/notification.scss'
import '../../../../core-css/src/lib/styles/notification-banner/notification-banner.scss';


type notificationType = "important" | 'information' | 'event' | 'emergency';

export interface NotificationProps {
  /**
    * The type of the notification, changes stylings and icons.
  */
  type?: notificationType,
  /**
   * Notification message
  */
  message?: string,
  /**
   * Hidden title message
  */
  title?: string,
  /**
   * Optional link for notification, if no link is provided notification will not contain anchor.
  */
  notificationUrl?: string,
  /**
   * Boolean: can this notification be closed?
  */
  isDismissable?: boolean,
  children?: React.ReactNode,
  onDismiss?: Function,
}

export const GoANotification = ({title, type = "information", message, notificationUrl, isDismissable = true, children = null, onDismiss, ...props }: NotificationProps) => {
  const [dismissed, setDismissed] = useState(false);

  const dismissTrigger = (dismissAction) => {
    setDismissed(dismissAction);
    onDismiss();
  }

  if (!dismissed) {
    return (
      <div>
        <div className="goa-notifications">
          <h2 className="title">{title}</h2>
        </div>
        <div role="notification" className={`goa-notification goa--${type}`}>
          <div className='content'>
            { notificationUrl ? (
              <a className="message" role="url" href={notificationUrl}>{message || children}</a>
            ) : (
              <span className="message">{message || children}</span>
            )}
            { isDismissable &&
              <a role="closeBox" className="close" title="Dismiss" onClick={() => dismissTrigger(!dismissed)}>
                <svg width="16px" height="16px" viewBox="0 0 16 16">
                  <path d="M 15.99 14.54C 15.99 14.54 14.54 15.99 14.54 15.99 14.54 15.99 8 9.45 8 9.45 8 9.45 1.46 15.99 1.46 15.99 1.46 15.99 0.01 14.54 0.01 14.54 0.01 14.54 6.55 8 6.55 8 6.55 8 0.01 1.46 0.01 1.46 0.01 1.46 1.46 0.01 1.46 0.01 1.46 0.01 8 6.55 8 6.55 8 6.55 14.54 0.01 14.54 0.01 14.54 0.01 15.99 1.46 15.99 1.46 15.99 1.46 9.45 8 9.45 8 9.45 8 15.99 14.54 15.99 14.54Z"/>
                </svg>
              </a>
            }
          </div>
        </div>
      </div>
    )
  } else {
    return null;
  }
};

GoANotification.propTypes = {
  title: PropTypes.string,
  type: PropTypes.string.isRequired,
  content: PropTypes.string,
};

export default GoANotification;
