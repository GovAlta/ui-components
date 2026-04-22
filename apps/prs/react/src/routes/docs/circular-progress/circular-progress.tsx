import { GoabCircularProgress } from "@abgov/react-components";

export function DocsCircularProgressRoute() {
  return (
    <div>
      <h2>Circular progress indicator</h2>

      <h3>Basic progress</h3>
      <GoabCircularProgress variant="inline" size="large" message="Loading message..." visible={true} />

      <h3>Sizes</h3>
      <GoabCircularProgress variant="inline" size="small" message="Loading message..." visible={true} />
      <GoabCircularProgress variant="inline" size="large" message="Loading message..." visible={true} />

      <h3>With progress value</h3>
      <GoabCircularProgress variant="inline" size="large" progress={75} message="75% complete" visible={true} />
    </div>
  );
}
