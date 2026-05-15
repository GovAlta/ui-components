import { GoabLinearProgress } from "@abgov/react-components";

export function DocsLinearProgressRoute() {
  return (
    <div>
      <h2>Linear progress indicator</h2>

      <h3>Basic progress</h3>
      <GoabLinearProgress progress={50} percentVisibility="hidden" />

      <h3>Progress levels</h3>
      <GoabLinearProgress progress={0} />
      <GoabLinearProgress progress={25} />
      <GoabLinearProgress progress={50} />
      <GoabLinearProgress progress={75} />
      <GoabLinearProgress progress={100} />

      <h3>Indeterminate</h3>
      <GoabLinearProgress percentVisibility="hidden" />

      <h3>With percentage</h3>
      <GoabLinearProgress progress={65} />
    </div>
  );
}
