interface WCProps {
  progress?: number;
  testid?: string;
}

declare module "react" {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    interface IntrinsicElements {
      "goa-linear-progress": WCProps & React.HTMLAttributes<HTMLElement>;
    }
  }
}

export interface GoabLinearProgressProps {
  progress?: number;
  testId?: string;
}

export const GoabLinearProgress = ({ progress, testId }: GoabLinearProgressProps) => {
  return <goa-linear-progress progress={progress} testid={testId}></goa-linear-progress>;
};

export default GoabLinearProgress;
