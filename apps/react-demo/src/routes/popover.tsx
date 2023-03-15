import {
  GoAPopover,
  GoABadge,
  GoAButtonGroup,
  GoAButton,
} from "@abgov/react-components";

export default function Popover() {
  return (
    <>
      <h1>Popover</h1>
      <GoAPopover
        target={
          <GoAButton type="secondary" size="compact">
            Click me
          </GoAButton>
        }
      >
        <h3>This is a popover</h3>
        <p>It can be used for a number of different contexts.</p>
      </GoAPopover>

      <GoAPopover
        target={
          <GoAButton type="secondary" size="compact">
            Click me
          </GoAButton>
        }
      >
        <h3>interactable content</h3>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Adipisci hic
          magni praesentium? Accusantium, quas. Explicabo quibusdam iusto
          dolores magnam voluptatem impedit esse ipsum labore sit, totam, illum
          doloremque exercitationem in.
        </p>
        <GoAButtonGroup alignment="start">
          <GoAButton type="primary" onClick={() => console.log("clicked")}>
            Primary
          </GoAButton>
          <GoAButton type="submit" onClick={() => console.log("clicked")}>
            Submit
          </GoAButton>
          <GoAButton type="secondary" onClick={() => console.log("clicked")}>
            Secondary
          </GoAButton>
        </GoAButtonGroup>
      </GoAPopover>
    </>
  );
}
