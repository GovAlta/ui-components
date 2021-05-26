import React from "react";
import PropTypes from 'prop-types';
import styled, { keyframes } from "styled-components";

export interface ElementLoaderProps {
  visible?: boolean;
  baseColour: string;
  spinnerColour: string;
  size: number;
};

export const GoAElementLoader = ({ visible=false, baseColour = '#c8eef9', spinnerColour = '#0070c4', size=25}:ElementLoaderProps ) => {
  const spinner = keyframes`
    0% {
        transform: rotate(0);
    }
    100% {
        transform: rotate(360deg);
    }
`;

const Loader = styled.div`
  display: inline-block;
  position: relative;
  transform: translate(-50%, -50%);
  border: 3px solid ${spinnerColour};
  border-top: 3px solid ${baseColour};
  border-radius: 50%;
  width: ${size}px;
  height: ${size}px;
  margin-left: 5px;
  animation: ${spinner} 0.75s linear infinite;
`;

  return visible &&
    <Loader>

    </Loader>;
};

GoAElementLoader.propTypes = {
  visible: PropTypes.bool,
  baseColour: PropTypes.string,
  spinnerColour: PropTypes.string,
  size: PropTypes.number
};
