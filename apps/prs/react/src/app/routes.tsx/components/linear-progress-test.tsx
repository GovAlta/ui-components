import { GoabButton, GoabLinearProgress } from "@abgov/react-components";
import { useEffect, useState } from "react";

export function LinearProgressTest() {
  const [dynamicProgress, setDynamicProgress] = useState<number | null>(null);
  const [autoProgress, setAutoProgress] = useState(0);

  const decreaseProgress = () => {
    setDynamicProgress((prev) => Math.max(0, (prev ?? 0) - 10));
  };

  const increaseProgress = () => {
    setDynamicProgress((prev) => Math.min(100, (prev ?? 0) + 10));
  };

  const resetProgress = () => {
    setDynamicProgress(0);
  };

  const nullProgress = () => {
    setDynamicProgress(null);
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
    <div style={{ padding: "2rem", maxWidth: "800px" }}>
      <section>
        <h3>Determinate Progress - 0%</h3>
        <GoabLinearProgress testId="determinate-progress-0" progress={0} />
      </section>

      <section>
        <h3>Indeterminate Progress - no percentage</h3>
        <GoabLinearProgress
          testId="indeterminate-progress-no-percentage"
          showPercentage={false}
        />
      </section>

      <section>
        <h3>Determinate Progress - 25%</h3>
        <GoabLinearProgress testId="determinate-progress-25" progress={25} />
      </section>

      <section>
        <h3>Determinate Progress - 50%</h3>
        <GoabLinearProgress testId="determinate-progress-50" progress={50} />
      </section>

      <section>
        <h3>Determinate Progress - 75%</h3>
        <GoabLinearProgress testId="determinate-progress-75" progress={75} />
      </section>

      <section>
        <h3>Determinate Progress - 100%</h3>
        <GoabLinearProgress testId="determinate-progress-100" progress={100} />
      </section>

      <section>
        <h3>Dynamic Progress</h3>
        <GoabLinearProgress testId="dynamic-progress" progress={dynamicProgress} />
        <div style={{ marginTop: "1rem", display: "flex", gap: "0.5rem" }}>
          <GoabButton onClick={decreaseProgress}>-10%</GoabButton>
          <GoabButton onClick={increaseProgress}>+10%</GoabButton>
          <GoabButton onClick={resetProgress}>Zero</GoabButton>
          <GoabButton onClick={nullProgress}>Indeterminate</GoabButton>
        </div>
      </section>

      <section>
        <h3>Updating Determinate Progress - 0% ➡️ 100%</h3>
        <GoabLinearProgress testId="auto-progress" progress={autoProgress} />
      </section>
    </div>
  );
}
