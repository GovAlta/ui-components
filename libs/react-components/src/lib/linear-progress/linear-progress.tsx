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
  /** Progress value (0-100). When undefined, shows an indeterminate loading animation. */
  progress?: number | null;
  /** Controls visibility of the percentage text. @default "visible" */
  percentVisibility?: "visible" | "hidden" | undefined;
  /** Accessible label for the progress bar. */
  ariaLabel?: string;
  /** ID of the element that labels this progress bar. */
  ariaLabelledBy?: string;
  /** Sets a data-testid attribute for automated testing. */
  testId?: string;
}

/** Provide visual feedback to users while loading. */
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
