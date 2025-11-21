interface WCProps {
  testid?: string;
  progress?: number | null;
  showpercentage?: string;
  arialabel?: string;
  arialabelledby?: string;
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
  ariaLabel?: string;
  ariaLabelledBy?: string;
  testId?: string;
}

export const GoabLinearProgress = ({
  progress,
  showPercentage,
  ariaLabel,
  ariaLabelledBy,
  testId,
}: GoabLinearProgressProps) => {
  return (
    <goa-linear-progress
      progress={progress}
      show-percentage={showPercentage?.toString()}
      aria-label={ariaLabel}
      aria-labelledby={ariaLabelledBy}
      testid={testId}
    ></goa-linear-progress>
  );
};

export default GoabLinearProgress;
