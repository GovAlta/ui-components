import React from 'react';

type PageLoaderType = 'infinite' | 'progress';
type PageLoaderVariant = "fullscreen" | "inline";


interface WCProps {
  type?: PageLoaderType;
  variant?: PageLoaderVariant;
  message?: string;
  visible?: boolean;
  progress?: number;
}

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    interface IntrinsicElements {
      'goa-page-loader': WCProps & React.HTMLAttributes<HTMLElement>
    }
  }
}


export interface PageLoaderProps {
  type?: PageLoaderType;
  variant?: PageLoaderVariant;
  message?: string;
  visible?: boolean;
  progress?: number;
}

export const GoAPageLoader = ({ type, visible, message, progress, variant }: PageLoaderProps) => {
  return (
    <goa-page-loader type={type} visible={visible} message={message} progress={progress} variant={variant} />
  )
};

export default GoAPageLoader;
