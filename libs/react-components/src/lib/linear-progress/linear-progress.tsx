interface WCProps {
  progress?: number | null;
  showpercentage?: string;
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
  progress?: number | null;
  showPercentage?: boolean;
  testId?: string;
}

export const GoabLinearProgress = ({
  progress,
  showPercentage = true,
  testId,
}: GoabLinearProgressProps) => {
  return (
    <goa-linear-progress
      progress={progress}
      showpercentage={showPercentage.toString()}
      testid={testId}
    ></goa-linear-progress>
  );
};

export default GoabLinearProgress;
