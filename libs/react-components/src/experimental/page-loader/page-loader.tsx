import React from "react";
import PropTypes from 'prop-types';
import styled, { keyframes } from "styled-components";

export interface PageLoaderProps {
  message?: string;
  visible?: boolean;
};

const spinner = keyframes`
    0% {
        transform: rotate(0);
    }
    100% {
        transform: rotate(360deg);
    }
`;

export const GoAPageLoader = ({ loading=false, message }) => {
  return loading &&
    <Container onKeyDown={(event) => {event.preventDefault()}}>
      <Loader></Loader>
      <Message>{message}</Message>
    </Container>;
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  background: rgba(255,255,255,90);
`;

const Message = styled.span`
  margin-top: 24px;
  font-style: normal;
  font-weight: normal;
  font-size: 18px;
  color: #000;
`;

const Loader = styled.div`
  margin-top: 16px;
  border-top: 7px solid #0070c4;
  border-right: 7px solid #0070c4;
  border-bottom: 7px solid #0070c4;
  border-left: 7px solid rgba(10,129,162, 0.2);
  border-radius: 50%;
  animation: ${spinner} 0.9s linear infinite;
  width: 65px;
  height: 65px;
  padding-right: 56px;
  padding-right: 56px;
  padding-top: 56px;
`;

GoAPageLoader.propTypes = {
  loading: PropTypes.bool,
  message: PropTypes.string
};
