import {
  GoabButton,
  GoabPopover,
  GoabText,
} from "@abgov/react-components";

export function DocsPopoverRoute() {
  return (
    <div>
      <h2>Popover</h2>

      <h3>Basic popover</h3>
      <GoabPopover target={<GoabButton>Open popover</GoabButton>}>
        <GoabText mt="none" mb="none">
          Popover content goes here. It can contain any content.
        </GoabText>
      </GoabPopover>

      <h3>Position</h3>
      <GoabPopover position="above" target={<GoabButton>Above</GoabButton>}>
        <GoabText mt="none" mb="none">Content positioned above the trigger.</GoabText>
      </GoabPopover>
      <GoabPopover position="below" target={<GoabButton>Below</GoabButton>}>
        <GoabText mt="none" mb="none">Content positioned below the trigger.</GoabText>
      </GoabPopover>
      <GoabPopover position="auto" target={<GoabButton>Auto</GoabButton>}>
        <GoabText mt="none" mb="none">Automatically positions based on available space.</GoabText>
      </GoabPopover>

      <h3>With padding</h3>
      <GoabPopover padded target={<GoabButton>Padded</GoabButton>}>
        <GoabText mt="none" mb="none">Content with padding applied.</GoabText>
      </GoabPopover>
      <GoabPopover padded={false} target={<GoabButton>No padding</GoabButton>}>
        <GoabText mt="none" mb="none">Content flush with popover boundaries.</GoabText>
      </GoabPopover>

      <h3>With max width</h3>
      <GoabPopover maxWidth="300px" target={<GoabButton>More info</GoabButton>}>
        <GoabText mt="none" mb="none">
          This popover has a maximum width of 300 pixels to control content width.
        </GoabText>
      </GoabPopover>
    </div>
  );
}
