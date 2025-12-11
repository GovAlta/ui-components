interface WCProps {
  testid?: string;
  progress?: number | null;
  percentVisibility?: "visible" | "hidden" | undefined;
  ariaLabel?: string;
  ariaLabelledBy?: string;
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
  percentVisibility?: "visible" | "hidden" | undefined;
  ariaLabel?: string;
  ariaLabelledBy?: string;
  testId?: string;
}

export const GoabLinearProgress = ({
  progress,
  percentVisibility,
  ariaLabel,
  ariaLabelledBy,
  testId,
}: GoabLinearProgressProps) => {
  return (
    <goa-linear-progress
      progress={progress}
      percent-visibility={percentVisibility}
      aria-label={ariaLabel}
      aria-labelledby={ariaLabelledBy}
      testid={testId}
    ></goa-linear-progress>
  );
};

export default GoabLinearProgress;
