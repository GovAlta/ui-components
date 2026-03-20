/**
 * FilterChip Component Configurations
 *
 * Filter chips allow users to filter content.
 */

import type { ComponentConfigurations } from "./types";

export const filterChipConfigurations: ComponentConfigurations = {
  componentSlug: "filter-chip",
  componentName: "Filter chip",
  defaultConfigurationId: "basic",

  configurations: [
    {
      id: "basic",
      name: "Basic filter chip",
      description: "Simple filter toggle",
      code: {
        react: `<GoabxFilterChip content="Active" onClick={handleToggle} />`,
        angular: `<goabx-filter-chip content="Active" (_click)="handleToggle()"></goabx-filter-chip>`,
        webComponents: `<goa-filter-chip version="2" content="Active"></goa-filter-chip>`,
      },
    },
    {
      id: "selected",
      name: "Selected state",
      description: "Filter chip in selected state",
      code: {
        react: `<GoabxFilterChip content="In Progress" selected onClick={handleToggle} />`,
        angular: `<goabx-filter-chip content="In Progress" [selected]="true" (_click)="handleToggle()"></goabx-filter-chip>`,
        webComponents: `<goa-filter-chip version="2" content="In Progress" selected></goa-filter-chip>`,
      },
    },
    {
      id: "filter-group",
      name: "Filter group",
      description: "Multiple filter options",
      code: {
        react: `<GoabxFilterChip content="All" selected onClick={() => setFilter('all')} />
<GoabxFilterChip content="Active" onClick={() => setFilter('active')} />
<GoabxFilterChip content="Pending" onClick={() => setFilter('pending')} />
<GoabxFilterChip content="Completed" onClick={() => setFilter('completed')} />`,
        angular: `<goabx-filter-chip content="All" [selected]="filter === 'all'" (_click)="setFilter('all')"></goabx-filter-chip>
<goabx-filter-chip content="Active" [selected]="filter === 'active'" (_click)="setFilter('active')"></goabx-filter-chip>
<goabx-filter-chip content="Pending" [selected]="filter === 'pending'" (_click)="setFilter('pending')"></goabx-filter-chip>
<goabx-filter-chip content="Completed" [selected]="filter === 'completed'" (_click)="setFilter('completed')"></goabx-filter-chip>`,
        webComponents: `<goa-filter-chip version="2" content="All" selected></goa-filter-chip>
<goa-filter-chip version="2" content="Active"></goa-filter-chip>
<goa-filter-chip version="2" content="Pending"></goa-filter-chip>
<goa-filter-chip version="2" content="Completed"></goa-filter-chip>`,
      },
    },
    {
      id: "with-error",
      name: "Error state",
      description: "Filter chip showing error",
      code: {
        react: `<GoabxFilterChip content="Invalid filter" error />`,
        angular: `<goabx-filter-chip content="Invalid filter" [error]="true"></goabx-filter-chip>`,
        webComponents: `<goa-filter-chip version="2" content="Invalid filter" error></goa-filter-chip>`,
      },
    },
  ],
};
