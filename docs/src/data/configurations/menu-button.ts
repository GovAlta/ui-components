/**
 * MenuButton Component Configurations
 *
 * Menu buttons show dropdown menus on click.
 */

import type { ComponentConfigurations } from './types';

export const menuButtonConfigurations: ComponentConfigurations = {
  componentSlug: 'menu-button',
  componentName: 'Menu button',
  defaultConfigurationId: 'basic',

  configurations: [
    {
      id: 'basic',
      name: 'Basic menu button',
      description: 'Button with dropdown menu',
      code: {
        react: `<GoabMenuButton>
  <GoabButton slot="trigger">Actions</GoabButton>
  <GoabMenuItem label="Edit" onClick={() => {}} />
  <GoabMenuItem label="Copy" onClick={() => {}} />
  <GoabMenuItem label="Delete" onClick={() => {}} />
</GoabMenuButton>`,
        angular: `<goab-menu-button>
  <goab-button slot="trigger">Actions</goab-button>
  <goab-menu-item label="Edit" (_click)="handleEdit()"></goab-menu-item>
  <goab-menu-item label="Copy" (_click)="handleCopy()"></goab-menu-item>
  <goab-menu-item label="Delete" (_click)="handleDelete()"></goab-menu-item>
</goab-menu-button>`,
        webComponents: `<goa-menu-button>
  <goa-button slot="trigger">Actions</goa-button>
  <goa-menu-item label="Edit"></goa-menu-item>
  <goa-menu-item label="Copy"></goa-menu-item>
  <goa-menu-item label="Delete"></goa-menu-item>
</goa-menu-button>`,
      },
    },
    {
      id: 'with-icon-trigger',
      name: 'Icon button trigger',
      description: 'Menu with icon button',
      code: {
        react: `<GoabMenuButton>
  <GoabIconButton slot="trigger" icon="ellipsis-vertical" ariaLabel="More options" />
  <GoabMenuItem label="View details" onClick={() => {}} />
  <GoabMenuItem label="Edit" onClick={() => {}} />
  <GoabMenuItem label="Delete" onClick={() => {}} />
</GoabMenuButton>`,
        angular: `<goab-menu-button>
  <goab-icon-button slot="trigger" icon="ellipsis-vertical" ariaLabel="More options"></goab-icon-button>
  <goab-menu-item label="View details" (_click)="handleView()"></goab-menu-item>
  <goab-menu-item label="Edit" (_click)="handleEdit()"></goab-menu-item>
  <goab-menu-item label="Delete" (_click)="handleDelete()"></goab-menu-item>
</goab-menu-button>`,
        webComponents: `<goa-menu-button>
  <goa-icon-button slot="trigger" icon="ellipsis-vertical" arialabel="More options"></goa-icon-button>
  <goa-menu-item label="View details"></goa-menu-item>
  <goa-menu-item label="Edit"></goa-menu-item>
  <goa-menu-item label="Delete"></goa-menu-item>
</goa-menu-button>`,
      },
    },
    {
      id: 'with-icons',
      name: 'Items with icons',
      description: 'Menu items with leading icons',
      code: {
        react: `<GoabMenuButton>
  <GoabButton slot="trigger">Options</GoabButton>
  <GoabMenuItem label="Download" icon="download" onClick={() => {}} />
  <GoabMenuItem label="Share" icon="share" onClick={() => {}} />
  <GoabMenuItem label="Print" icon="print" onClick={() => {}} />
</GoabMenuButton>`,
        angular: `<goab-menu-button>
  <goab-button slot="trigger">Options</goab-button>
  <goab-menu-item label="Download" icon="download" (_click)="handleDownload()"></goab-menu-item>
  <goab-menu-item label="Share" icon="share" (_click)="handleShare()"></goab-menu-item>
  <goab-menu-item label="Print" icon="print" (_click)="handlePrint()"></goab-menu-item>
</goab-menu-button>`,
        webComponents: `<goa-menu-button>
  <goa-button slot="trigger">Options</goa-button>
  <goa-menu-item label="Download" icon="download"></goa-menu-item>
  <goa-menu-item label="Share" icon="share"></goa-menu-item>
  <goa-menu-item label="Print" icon="print"></goa-menu-item>
</goa-menu-button>`,
      },
    },
  ],
};
