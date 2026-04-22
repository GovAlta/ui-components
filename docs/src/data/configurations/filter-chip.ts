/**
 * FilterChip Component Configurations
 *
 * Filter chips allow users to filter content.
 */

import type { ComponentConfigurations } from "./types";

const reactToggleSetup = `const handleToggle = () => {
  // Your filter toggle logic
};`;

const angularToggleSetup = `export class SomeOtherComponent {
  handleToggle() {
    // Your filter toggle logic
  }
}`;

const reactFilterGroupSetup = `const [filter, setFilter] = useState<string>("all");
// Use \`filter\` to highlight the active chip or filter your list`;

const angularFilterGroupSetup = `export class SomeOtherComponent {
  filter = "all";

  setFilter(value: string) {
    this.filter = value;
    // Use this.filter to filter your list
  }
}`;

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
        react: {
          ts: reactToggleSetup,
          jsx: `<GoabFilterChip content="Active" onClick={handleToggle} />`,
        },
        angular: {
          ts: angularToggleSetup,
          template: `<goab-filter-chip content="Active" (onClick)="handleToggle()"></goab-filter-chip>`,
        },
        webComponents: `<goa-filter-chip version="2" content="Active"></goa-filter-chip>`,
      },
    },
    {
      id: "filter-group",
      name: "Filter group",
      description: "Multiple filter options",
      code: {
        react: {
          ts: reactFilterGroupSetup,
          jsx: `<GoabFilterChip content="All" onClick={() => setFilter("all")} />
<GoabFilterChip content="Active" onClick={() => setFilter("active")} />
<GoabFilterChip content="Pending" onClick={() => setFilter("pending")} />
<GoabFilterChip content="Completed" onClick={() => setFilter("completed")} />`,
        },
        angular: {
          ts: angularFilterGroupSetup,
          template: `<goab-filter-chip content="All" (onClick)="setFilter('all')"></goab-filter-chip>
<goab-filter-chip content="Active" (onClick)="setFilter('active')"></goab-filter-chip>
<goab-filter-chip content="Pending" (onClick)="setFilter('pending')"></goab-filter-chip>
<goab-filter-chip content="Completed" (onClick)="setFilter('completed')"></goab-filter-chip>`,
        },
        webComponents: `<goa-filter-chip version="2" content="All"></goa-filter-chip>
<goa-filter-chip version="2" content="Active"></goa-filter-chip>
<goa-filter-chip version="2" content="Pending"></goa-filter-chip>
<goa-filter-chip version="2" content="Completed"></goa-filter-chip>`,
      },
    },
    {
      id: "with-secondary-text",
      name: "With secondary text",
      description: "Filter chip with category label",
      code: {
        react: {
          ts: reactToggleSetup,
          jsx: `<GoabFilterChip content="Edmonton" secondaryText="City:" onClick={handleToggle} />
<GoabFilterChip content="Calgary" secondaryText="City:" onClick={handleToggle} />`,
        },
        angular: {
          ts: angularToggleSetup,
          template: `<goab-filter-chip content="Edmonton" secondaryText="City:" (onClick)="handleToggle()"></goab-filter-chip>
<goab-filter-chip content="Calgary" secondaryText="City:" (onClick)="handleToggle()"></goab-filter-chip>`,
        },
        webComponents: `<goa-filter-chip version="2" content="Edmonton" secondarytext="City:"></goa-filter-chip>
<goa-filter-chip version="2" content="Calgary" secondarytext="City:"></goa-filter-chip>`,
      },
    },
    {
      id: "with-icon",
      name: "With leading icon",
      description: "Filter chip with icon",
      code: {
        react: {
          ts: reactToggleSetup,
          jsx: `<GoabFilterChip content="Documents" leadingIcon="document" onClick={handleToggle} />
<GoabFilterChip content="Sort" leadingIcon="arrow-up" onClick={handleToggle} />`,
        },
        angular: {
          ts: angularToggleSetup,
          template: `<goab-filter-chip content="Documents" leadingIcon="document" (onClick)="handleToggle()"></goab-filter-chip>
<goab-filter-chip content="Sort" leadingIcon="arrow-up" (onClick)="handleToggle()"></goab-filter-chip>`,
        },
        webComponents: `<goa-filter-chip version="2" content="Documents" leadingicon="document"></goa-filter-chip>
<goa-filter-chip version="2" content="Sort" leadingicon="arrow-up"></goa-filter-chip>`,
      },
    },
    {
      id: "with-error",
      name: "Error state",
      description: "Filter chip showing error",
      code: {
        react: `<GoabFilterChip content="Invalid filter" error />`,
        angular: `<goab-filter-chip content="Invalid filter" [error]="true"></goab-filter-chip>`,
        webComponents: `<goa-filter-chip version="2" content="Invalid filter" error></goa-filter-chip>`,
      },
    },
  ],
};
