import { GoabBlock, GoabCalendar, GoabText } from "@abgov/react-components";

export function Bug3497Route() {
  const today = new Date();

  const noop = () => {
    return null;
  };

  return (
    <GoabBlock direction="column" gap="l">
      <GoabText tag="h1">Bug 3497 Calendar Years Empty</GoabText>

      <GoabText tag="p">
        When min or max is set to today then the year dropdown is empty and doesn't show
        anything.
      </GoabText>

      <GoabText tag="h2">min test</GoabText>
      <GoabCalendar name="minTest" min={today.toISOString()} onChange={noop} />

      <GoabText tag="h2">max test</GoabText>
      <GoabCalendar name="maxTest" max={today.toISOString()} onChange={noop} />

      <GoabText tag="h2">ordinary</GoabText>
      <GoabCalendar name="ordinaryTest" value={today.toISOString()} onChange={noop} />
    </GoabBlock>
  );
}
