import { GoabButtonGroup, GoabIconButton, GoabTooltip } from "@abgov/react-components";

export function ShowALabelOnAnIconOnlyButton() {
  return (
    <GoabButtonGroup alignment="start">
      <GoabTooltip content="Edit">
        <GoabIconButton icon="pencil" ariaLabel="Edit" />
      </GoabTooltip>
      <GoabTooltip content="Alerts">
        <GoabIconButton icon="notifications" ariaLabel="Alerts" />
      </GoabTooltip>
      <GoabTooltip content="Settings">
        <GoabIconButton icon="settings" ariaLabel="Settings" />
      </GoabTooltip>
    </GoabButtonGroup>
  );
}
