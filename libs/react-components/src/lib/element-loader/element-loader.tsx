import React from 'react';
import './element-loader.scss';

export interface ElementLoaderProps {
  visible?: boolean;
  baseColour: string;
  spinnerColour: string;
  size?: string;
}

export const GoAElementLoader = ({
  visible = false,
  baseColour = '#c8eef9',
  spinnerColour = '#0070c4',
  size = 'default',
}: ElementLoaderProps) => {
  const radius = size === 'small' ? 16 : 18;
  const diameter = radius * 2;
  const boxView = `0 0 ${diameter} ${diameter}`;

  /**
   * Generates the value for an SVG arc.
   * @param current       Current value.
   * @param total         Maximum value.
   * @param pathRadius    Radius of the SVG path.
   * @param elementRadius Radius of the SVG container.
   * @param isSemicircle  Whether the element should be a semicircle.
   */
  function getArc(
    current: number,
    total: number,
    pathRadius: number,
    elementRadius: number,
    isSemicircle = false
  ): string {
    const value = Math.max(0, Math.min(current || 0, total));
    const maxAngle = isSemicircle ? 180 : 359.9999;
    const percentage = (value / total) * maxAngle;
    const start = _polarToCartesian(elementRadius, pathRadius, percentage);
    const end = _polarToCartesian(elementRadius, pathRadius, 0);
    const arcSweep = percentage <= 180 ? 0 : 1;

    return `M ${start} A ${pathRadius} ${pathRadius} 0 ${arcSweep} 0 ${end}`;
  }

  const DEGREE_IN_RADIANS: number = Math.PI / 180;

  /**
   * Converts polar cooradinates to Cartesian.
   * @param elementRadius  Radius of the wrapper element.
   * @param pathRadius     Radius of the path being described.
   * @param angleInDegrees Degree to be converted.
   */
  function _polarToCartesian(
    elementRadius: number,
    pathRadius: number,
    angleInDegrees: number
  ): string {
    const angleInRadians = (angleInDegrees - 90) * DEGREE_IN_RADIANS;
    const x = elementRadius + pathRadius * Math.cos(angleInRadians);
    const y = elementRadius + pathRadius * Math.sin(angleInRadians);

    return x + ' ' + y;
  }

  return (
    visible && (
      <svg
        className="circular-loader"
        fill="none"
        viewBox={boxView}
        width={radius}
        height={radius}
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle
          cx={radius}
          cy={radius}
          stroke={baseColour}
          strokeWidth="7"
          r={radius - 4}
        />
        <path
          d={getArc(75, 100, radius - 4, radius, false)}
          strokeWidth="7"
          stroke={spinnerColour}
          strokeLinecap="round"
        />
      </svg>
    )
  );
};
