import React from 'react';
import PropTypes from 'prop-types';
import './page-loader.scss';

type indicatorType = 'infinite' | 'progress';
type displayTypeIndicator = 'large' | 'small';

export interface PageLoaderProps {
  /**
   * The type of page loader, deterministic and indeterministic.
   */
  type?: indicatorType;

  /**
   * The message to display while loading.
   */
  message?: string;

  /**
   * Sets the page loader visibility state.
   */
  visible?: boolean;

  /**
   * Sets the percentage value of the page loader while set to progress type, 0 - 100 percent.
   */
  value?: number;

  /**
   * Sets the page to locked and does not accept user input. When not set the component can be used as a child element without blocking user input.
   */
  pagelock?: boolean;

  /**
   * Sets the progress indicator display type size.
   */
  displayType?: displayTypeIndicator;
}

export const GoAPageLoader = ({
  type = 'infinite',
  visible = false,
  message = 'Loading...',
  value = 0,
  pagelock = true,
  displayType = 'large'
}: PageLoaderProps) => {
  /**
   * Set defaults
   */
  const progressMaxValue = 283;
  let strokeDashoffset = 0;

  /**
   * Sets the progress if in progress mode.
   * @param progress
   * @returns
   */
  function setProgress(progress: number) {
    if (type !== 'progress') {
      return;
    }

    if (progress === 0) {
      strokeDashoffset = progressMaxValue;
      return;
    }

    if (progress >= 100) {
      return;
    }

    const value =
      progressMaxValue - Math.round((progressMaxValue * progress) / 100);
    strokeDashoffset = value;
  }

  if (visible) {
    if(pagelock && displayType !== 'small'){
      document.body.style.height = '100%';
      document.body.style.overflow = 'hidden';
    }
    else{
      document.body.style.removeProperty('height');
      document.body.style.removeProperty('overflow');
    }

    if (type === 'progress') {
      setProgress(value);
    }

    return (
      <div
        className={`progress-container--${displayType}`}
        onKeyDown={(event) => {
          event.preventDefault();
        }}
      >
        <svg
          className={`${displayType==='large' ? 'svg' : "svg--small"}`}
          fill="none"
          viewBox="0 0 100 100"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle className="base-circle" cx="50" cy="50" r="45" />
          <circle
            className={`${type === 'infinite'
                ? 'progress-circle--infinite'
                : 'progress-circle'
              }`}
            cx="50"
            cy="50"
            r="45"
            style={{ strokeDashoffset: strokeDashoffset }}
          />
        </svg>
        <span className={`progress-message--${displayType}`}>{message}</span>
      </div>
    );
  } else {
    document.body.style.removeProperty('height');
    document.body.style.removeProperty('overflow');

    return null;
  }
};

GoAPageLoader.propTypes = {
  visible: PropTypes.bool,
  message: PropTypes.string,
  value: PropTypes.number,
  type: PropTypes.string,
  pagelock: PropTypes.bool,
  displayType: PropTypes.string
};

export default GoAPageLoader;
