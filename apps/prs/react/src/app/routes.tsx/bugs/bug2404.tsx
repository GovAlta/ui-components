import { GoabInput } from "@abgov/react-components";

export const Bug2404Route = () => {
  function noop() {
    /* This function intentionally does nothing */
  }
  function trailingIconClick() {
    console.log("Trailing Icon Clicked");
  }

  return (
    <main>
      <GoabInput
        name="firstName"
        type="text"
        value=""
        onChange={noop}
        trailingIcon="add"
        mb="l"
      />
      <br />
      <GoabInput
        name="lastName"
        type="text"
        value=""
        onChange={noop}
        trailingIcon="accessibility"
        onTrailingIconClick={() => trailingIconClick()}
      />
    </main>
  );
};
