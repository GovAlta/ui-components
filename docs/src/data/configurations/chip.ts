/**
 * Chip Component Configurations
 *
 * Chips display compact information or selections.
 */

import type { ComponentConfigurations } from "./types";

export const chipConfigurations: ComponentConfigurations = {
  componentSlug: "chip",
  componentName: "Chip",
  defaultConfigurationId: "basic",

  configurations: [
    {
      id: "basic",
      name: "Basic chip",
      description: "Simple chip with text",
      code: {
        react: `<GoabChip content="Label" />`,
        angular: `<goab-chip content="Label"></goab-chip>`,
        webComponents: `<goa-chip content="Label"></goa-chip>`,
      },
    },
    {
      id: "deletable",
      name: "Deletable",
      description: "Chip that can be removed",
      code: {
        react: `<GoabChip content="Selected item" deletable onDelete={handleDelete} />`,
        angular: `<goab-chip content="Selected item" [deletable]="true" (_delete)="handleDelete()"></goab-chip>`,
        webComponents: `<goa-chip content="Selected item" deletable></goa-chip>`,
      },
    },
    {
      id: "with-icon",
      name: "With icon",
      description: "Chip with leading icon",
      code: {
        react: `<GoabChip content="Documents" leadingIcon="folder" />
<GoabChip content="Email" leadingIcon="mail" />`,
        angular: `<goab-chip content="Documents" leadingIcon="folder"></goab-chip>
<goab-chip content="Email" leadingIcon="mail"></goab-chip>`,
        webComponents: `<goa-chip content="Documents" leadingicon="folder"></goa-chip>
<goa-chip content="Email" leadingicon="mail"></goa-chip>`,
      },
    },
    {
      id: "with-error",
      name: "Error state",
      description: "Chip showing error",
      code: {
        react: `<GoabChip content="Invalid selection" error />`,
        angular: `<goab-chip content="Invalid selection" [error]="true"></goab-chip>`,
        webComponents: `<goa-chip content="Invalid selection" error></goa-chip>`,
      },
    },
    {
      id: "multiple-selections",
      name: "Multiple selections",
      description: "Group of chips showing selections",
      code: {
        react: `<GoabChip content="Alberta" deletable onDelete={() => {}} />
<GoabChip content="British Columbia" deletable onDelete={() => {}} />
<GoabChip content="Ontario" deletable onDelete={() => {}} />`,
        angular: `<goab-chip content="Alberta" [deletable]="true" (_delete)="handleDelete('alberta')"></goab-chip>
<goab-chip content="British Columbia" [deletable]="true" (_delete)="handleDelete('bc')"></goab-chip>
<goab-chip content="Ontario" [deletable]="true" (_delete)="handleDelete('ontario')"></goab-chip>`,
        webComponents: `<goa-chip content="Alberta" deletable></goa-chip>
<goa-chip content="British Columbia" deletable></goa-chip>
<goa-chip content="Ontario" deletable></goa-chip>`,
      },
    },
  ],
};
