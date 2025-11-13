interface WCProps {
  progress?: number;
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

export const GoabLinearProgress = ({ progress }: GoabLinearProgressProps) => {
  return <goa-linear-progress progress={progress}></goa-linear-progress>;
};

export default GoabLinearProgress;
