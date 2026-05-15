import { useState } from "react";
import {
  GoabBlock,
  GoabButton,
  GoabText,
  GoabDivider,
  GoabDetails,
  GoabDropdown,
  GoabDropdownItem,
  GoabFilterChip,
  GoabInput,
  GoabIconButton,
  GoabLink,
  GoabMenuAction,
  GoabMenuButton,
  GoabModal,
} from "@abgov/react-components";

export function Bug3614Route() {
  const [modalOpen, setModalOpen] = useState(false);
  const [dropdownValue, setDropdownValue] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [chips, setChips] = useState(["Alpha", "Beta", "Gamma"]);

  return (
    <div>
      <GoabText tag="h1" mt="m">
        Bug #3614: IconButton Hitboxes
      </GoabText>

      <GoabBlock>
        <GoabDetails heading="Issue Description" open>
          <GoabLink trailingIcon="open">
            <a
              href="https://github.com/GovAlta/ui-components/issues/3614"
              target="_blank"
              rel="noreferrer noopener"
            >
              View on GitHub
            </a>
          </GoabLink>
          <GoabText tag="p">
            Icon buttons at <code>2xsmall</code> and <code>xsmall</code> sizes do not
            render as square buttons - they show as weird rounded rectangles. The
            clickable area has a non-square aspect ratio, which is inconsistent with the
            larger sizes (<code>small</code>, <code>medium</code>, <code>large</code>,{" "}
            <code>xlarge</code>) that all render as squares.
          </GoabText>
        </GoabDetails>
      </GoabBlock>

      <GoabDivider mt="l" mb="l" />

      <GoabText tag="h2">Test Cases</GoabText>

      <GoabText tag="h3">Test 1: Named sizes (2xsmall to xlarge)</GoabText>
      <GoabText tag="p">
        All sizes should render as square buttons with consistent aspect ratios.
      </GoabText>
      <GoabBlock gap="s" direction="row" alignment="center">
        <GoabIconButton icon="settings" size="2xsmall" ariaLabel="Settings" />
        <GoabIconButton icon="settings" size="xsmall" ariaLabel="Settings" />
        <GoabIconButton icon="settings" size="small" ariaLabel="Settings" />
        <GoabIconButton icon="settings" size="medium" ariaLabel="Settings" />
        <GoabIconButton icon="settings" size="large" ariaLabel="Settings" />
        <GoabIconButton icon="settings" size="xlarge" ariaLabel="Settings" />
      </GoabBlock>

      <GoabText tag="h3" mt="l">
        Test 2: Numeric sizes (1 to 6)
      </GoabText>
      <GoabText tag="p">All numeric sizes should also render as square buttons.</GoabText>
      <GoabBlock gap="s" direction="row" alignment="center">
        <GoabIconButton icon="settings" size="1" ariaLabel="Settings" />
        <GoabIconButton icon="settings" size="2" ariaLabel="Settings" />
        <GoabIconButton icon="settings" size="3" ariaLabel="Settings" />
        <GoabIconButton icon="settings" size="4" ariaLabel="Settings" />
        <GoabIconButton icon="settings" size="5" ariaLabel="Settings" />
        <GoabIconButton icon="settings" size="6" ariaLabel="Settings" />
      </GoabBlock>

      <GoabText tag="h3" mt="l">
        Test 3: Other Components that use IconButton
      </GoabText>
      <GoabText tag="p">
        Testing various components that use IconButton internally. Verify that the icon
        buttons within these components render with correct square hitboxes.
      </GoabText>

      <GoabText tag="h4" mt="m">
        Dropdown
      </GoabText>
      <GoabText tag="p">
        The dropdown toggle button should have a properly sized square hitbox.
      </GoabText>
      <GoabBlock gap="m" direction="row">
        <GoabDropdown
          value={dropdownValue}
          onChange={(detail) => setDropdownValue(detail.value as string)}
          placeholder="Select an option"
          width="250px"
        >
          <GoabDropdownItem value="option1" label="Option 1" />
          <GoabDropdownItem value="option2" label="Option 2" />
          <GoabDropdownItem value="option3" label="Option 3" />
        </GoabDropdown>
      </GoabBlock>

      <GoabText tag="h4" mt="m">
        Dropdown v2
      </GoabText>
      <GoabText tag="p">
        The dropdown toggle button should have a properly sized square hitbox.
      </GoabText>
      <GoabBlock gap="m" direction="row">
        <GoabDropdown
          value={dropdownValue}
          onChange={(detail) => setDropdownValue(detail.value as string)}
          placeholder="Select an option"
          width="250px"
        >
          <GoabDropdownItem value="option1" label="Option 1" />
          <GoabDropdownItem value="option2" label="Option 2" />
          <GoabDropdownItem value="option3" label="Option 3" />
        </GoabDropdown>
      </GoabBlock>
      <GoabText tag="h4" mt="m">
        Filter Chips
      </GoabText>
      <GoabText tag="p">
        The v2 FilterChip uses IconButton. The close/remove icon button on each chip
        should look normal.
      </GoabText>
      <GoabBlock gap="s" direction="row">
        {chips.map((chip) => (
          <GoabFilterChip
            key={chip}
            content={chip}
            onClick={() => setChips((prev) => prev.filter((c) => c !== chip))}
          />
        ))}
      </GoabBlock>

      <GoabText tag="h4" mt="m">
        Menu Button
      </GoabText>
      <GoabText tag="p">
        The dropdown arrow icon button should have a square hitbox.
      </GoabText>
      <GoabBlock gap="m" direction="row">
        <GoabMenuButton text="Actions" type="secondary">
          <GoabMenuAction text="Edit" action="edit" icon="pencil" />
          <GoabMenuAction text="Delete" action="delete" icon="trash" />
          <GoabMenuAction text="Archive" action="archive" icon="archive" />
        </GoabMenuButton>
      </GoabBlock>

      <GoabText tag="h4" mt="m">
        Modal
      </GoabText>
      <GoabText tag="p">
        The close icon button in the modal header should be a square hitbox.
      </GoabText>
      <GoabBlock>
        <GoabButton type="secondary" onClick={() => setModalOpen(true)}>
          Open Modal
        </GoabButton>
        <GoabModal
          heading="Test Modal"
          open={modalOpen}
          onClose={() => setModalOpen(false)}
          actions={<GoabButton onClick={() => setModalOpen(false)}>Close</GoabButton>}
        >
          <GoabText tag="p">
            Check that the close (X) icon button in the top-right corner has a square
            hitbox.
          </GoabText>
        </GoabModal>
      </GoabBlock>

      <GoabText tag="h4" mt="m">
        Input with Trailing Icon
      </GoabText>
      <GoabText tag="p">The trailing icon button should have a square hitbox.</GoabText>
      <GoabBlock gap="m" direction="column">
        <GoabInput
          name="search-input"
          value={inputValue}
          onChange={(detail) => setInputValue(detail.value)}
          trailingIcon="close"
          trailingIconAriaLabel="Clear input"
          onTrailingIconClick={() => setInputValue("")}
          placeholder="The X is an icon button - check its hitbox!"
          width="350px"
        />
      </GoabBlock>
    </div>
  );
}

export default Bug3614Route;
