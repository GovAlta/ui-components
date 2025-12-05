import { useEffect, useState } from "react";
import {
  GoabBlock,
  GoabButton,
  GoabCheckbox,
  GoabLinearProgress,
  GoabText,
} from "@abgov/react-components";
import { GoabCheckboxOnChangeDetail } from "@abgov/ui-components-common";

export function Feat1908Route() {
  const [dynamicProgress, setDynamicProgress] = useState<number | null | undefined>(null);
  const [autoProgress, setAutoProgress] = useState(0);
  const [showProgressPercentage, setShowProgressPercentage] = useState(true);

  const decreaseProgress = () => {
    if (!dynamicProgress) {
      setDynamicProgress(100);
      return;
    }
    setDynamicProgress((prev) => Math.max(0, (prev ?? 0) - 10));
  };

  const increaseProgress = () => {
    if (dynamicProgress === 100) {
      setDynamicProgress(0);
      return;
    }
    setDynamicProgress((prev) => Math.min(100, (prev ?? 0) + 10));
  };

  const resetProgress = () => {
    setDynamicProgress(0);
  };

  const nullProgress = () => {
    setDynamicProgress(undefined);
  };

  const onShowPercentageChange = (detail: GoabCheckboxOnChangeDetail) => {
    setShowProgressPercentage(detail.checked);
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      let nextProgress = autoProgress + 0.25;
      if (nextProgress > 100) {
        nextProgress = 0;
      }
      setAutoProgress(nextProgress);
    }, 100);

    return () => {
      clearInterval(intervalId);
    };
  });

  return (
    <GoabBlock direction="column" gap="l">
      <GoabText tag="h1">Feature 1908: Linear Progress Bar</GoabText>
      <GoabBlock direction="column" gap="s">
        <GoabText tag="h2">Linear Progress</GoabText>

        <GoabText tag="h3">Determinate Progress - 25%</GoabText>
        <GoabLinearProgress testId="determinate-progress-25" progress={25} />

        <GoabText tag="h3">Determinate Progress - 50%</GoabText>
        <GoabLinearProgress testId="determinate-progress-50" progress={50} />

        <GoabText tag="h3">Determinate Progress - 75%</GoabText>
        <GoabLinearProgress testId="determinate-progress-75" progress={75} />

        <GoabText tag="h3">Determinate Progress - 100%</GoabText>
        <GoabLinearProgress testId="determinate-progress-100" progress={100} />
      </GoabBlock>
      <GoabBlock direction="column" gap="s">
        <GoabText tag="h2">Linear Progress without Percentage (50%)</GoabText>
        <GoabLinearProgress
          testId="hide-percentage"
          progress={50}
          percentVisibility="hidden"
          ariaLabel="File upload progress"
        />
      </GoabBlock>
      <GoabBlock direction="column" gap="s">
        <GoabText tag="h2">Linear Progress with Ping Pong</GoabText>
        <GoabLinearProgress
          percentVisibility="hidden"
          ariaLabel="Linear Progress with Ping Pong"
        />
      </GoabBlock>

      <GoabBlock direction="column" gap="s">
        <GoabText tag="h2">Linear Progress with Controls</GoabText>
        <GoabLinearProgress
          testId="dynamic-progress"
          progress={dynamicProgress}
          percentVisibility={showProgressPercentage ? "visible" : "hidden"}
        />
        <div style={{ marginTop: "1rem", display: "flex", gap: "0.5rem" }}>
          <GoabButton onClick={decreaseProgress}>-10%</GoabButton>
          <GoabButton onClick={increaseProgress}>+10%</GoabButton>
          <GoabButton onClick={resetProgress}>Zero</GoabButton>
          <GoabButton onClick={nullProgress}>Indeterminate</GoabButton>
          <GoabCheckbox
            name="showPercentage"
            text="Show Percentage?"
            value={showProgressPercentage}
            onChange={onShowPercentageChange}
          />
        </div>
      </GoabBlock>

      <GoabBlock direction="column" gap="s">
        <GoabText tag="h2">Changing Linear Progress through Code: 0% to 100%</GoabText>
        <GoabLinearProgress testId="auto-progress" progress={autoProgress} />
      </GoabBlock>
    </GoabBlock>
  );
}
