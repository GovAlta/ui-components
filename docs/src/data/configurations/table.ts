/**
 * Table Component Configurations
 *
 * Tables display data in rows and columns.
 */

import type { ComponentConfigurations } from './types';

export const tableConfigurations: ComponentConfigurations = {
  componentSlug: 'table',
  componentName: 'Table',
  defaultConfigurationId: 'basic',

  configurations: [
    {
      id: 'basic',
      name: 'Basic table',
      description: 'Simple table with data',
      code: {
        react: `<GoabxTable>
  <thead>
    <tr>
      <th>Name</th>
      <th>Status</th>
      <th>Date</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>John Smith</td>
      <td>Active</td>
      <td>Jan 15, 2024</td>
    </tr>
    <tr>
      <td>Jane Doe</td>
      <td>Pending</td>
      <td>Jan 16, 2024</td>
    </tr>
  </tbody>
</GoabxTable>`,
        angular: `<goab-table>
  <thead>
    <tr>
      <th>Name</th>
      <th>Status</th>
      <th>Date</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>John Smith</td>
      <td>Active</td>
      <td>Jan 15, 2024</td>
    </tr>
    <tr>
      <td>Jane Doe</td>
      <td>Pending</td>
      <td>Jan 16, 2024</td>
    </tr>
  </tbody>
</goab-table>`,
        webComponents: `<goa-table>
  <table>
    <thead>
      <tr>
        <th>Name</th>
        <th>Status</th>
        <th>Date</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>John Smith</td>
        <td>Active</td>
        <td>Jan 15, 2024</td>
      </tr>
      <tr>
        <td>Jane Doe</td>
        <td>Pending</td>
        <td>Jan 16, 2024</td>
      </tr>
    </tbody>
  </table>
</goa-table>`,
      },
    },
    {
      id: 'striped',
      name: 'Striped rows',
      description: 'Alternating row colors for readability',
      code: {
        react: `<GoabxTable striped>
  <thead>
    <tr>
      <th>Item</th>
      <th>Quantity</th>
      <th>Price</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Widget A</td>
      <td>10</td>
      <td>$25.00</td>
    </tr>
    <tr>
      <td>Widget B</td>
      <td>5</td>
      <td>$15.00</td>
    </tr>
    <tr>
      <td>Widget C</td>
      <td>20</td>
      <td>$10.00</td>
    </tr>
  </tbody>
</GoabxTable>`,
        angular: `<goab-table [striped]="true">
  <thead>
    <tr>
      <th>Item</th>
      <th>Quantity</th>
      <th>Price</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Widget A</td>
      <td>10</td>
      <td>$25.00</td>
    </tr>
    <tr>
      <td>Widget B</td>
      <td>5</td>
      <td>$15.00</td>
    </tr>
    <tr>
      <td>Widget C</td>
      <td>20</td>
      <td>$10.00</td>
    </tr>
  </tbody>
</goab-table>`,
        webComponents: `<goa-table striped>
  <table>
    <thead>
      <tr>
        <th>Item</th>
        <th>Quantity</th>
        <th>Price</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>Widget A</td>
        <td>10</td>
        <td>$25.00</td>
      </tr>
      <tr>
        <td>Widget B</td>
        <td>5</td>
        <td>$15.00</td>
      </tr>
      <tr>
        <td>Widget C</td>
        <td>20</td>
        <td>$10.00</td>
      </tr>
    </tbody>
  </table>
</goa-table>`,
      },
    },
    {
      id: 'relaxed',
      name: 'Relaxed variant',
      description: 'More vertical padding for comfortable reading',
      code: {
        react: `<GoabxTable variant="relaxed">
  <thead>
    <tr>
      <th>Service</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>License renewal</td>
      <td>Renew your driver's license online</td>
    </tr>
    <tr>
      <td>Vehicle registration</td>
      <td>Register a new or used vehicle</td>
    </tr>
  </tbody>
</GoabxTable>`,
        angular: `<goab-table variant="relaxed">
  <thead>
    <tr>
      <th>Service</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>License renewal</td>
      <td>Renew your driver's license online</td>
    </tr>
    <tr>
      <td>Vehicle registration</td>
      <td>Register a new or used vehicle</td>
    </tr>
  </tbody>
</goab-table>`,
        webComponents: `<goa-table variant="relaxed">
  <table>
    <thead>
      <tr>
        <th>Service</th>
        <th>Description</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>License renewal</td>
        <td>Renew your driver's license online</td>
      </tr>
      <tr>
        <td>Vehicle registration</td>
        <td>Register a new or used vehicle</td>
      </tr>
    </tbody>
  </table>
</goa-table>`,
      },
    },
    {
      id: 'sticky-header',
      name: 'Sticky header',
      description: 'Header stays visible when scrolling',
      code: {
        react: `<GoabxTable stickyHeader width="100%">
  <thead>
    <tr>
      <th>ID</th>
      <th>Name</th>
      <th>Department</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>001</td>
      <td>Alice Johnson</td>
      <td>Engineering</td>
    </tr>
    <tr>
      <td>002</td>
      <td>Bob Williams</td>
      <td>Marketing</td>
    </tr>
    <tr>
      <td>003</td>
      <td>Carol Davis</td>
      <td>Finance</td>
    </tr>
  </tbody>
</GoabxTable>`,
        angular: `<goab-table [stickyHeader]="true" width="100%">
  <thead>
    <tr>
      <th>ID</th>
      <th>Name</th>
      <th>Department</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>001</td>
      <td>Alice Johnson</td>
      <td>Engineering</td>
    </tr>
    <tr>
      <td>002</td>
      <td>Bob Williams</td>
      <td>Marketing</td>
    </tr>
    <tr>
      <td>003</td>
      <td>Carol Davis</td>
      <td>Finance</td>
    </tr>
  </tbody>
</goab-table>`,
        webComponents: `<goa-table stickyheader width="100%">
  <table>
    <thead>
      <tr>
        <th>ID</th>
        <th>Name</th>
        <th>Department</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>001</td>
        <td>Alice Johnson</td>
        <td>Engineering</td>
      </tr>
      <tr>
        <td>002</td>
        <td>Bob Williams</td>
        <td>Marketing</td>
      </tr>
      <tr>
        <td>003</td>
        <td>Carol Davis</td>
        <td>Finance</td>
      </tr>
    </tbody>
  </table>
</goa-table>`,
      },
    },
    {
      id: 'full-width',
      name: 'Full width',
      description: 'Table that spans container width',
      code: {
        react: `<GoabxTable width="100%" striped>
  <thead>
    <tr>
      <th>Application ID</th>
      <th>Applicant</th>
      <th>Status</th>
      <th>Submitted</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>APP-2024-001</td>
      <td>John Smith</td>
      <td>Under review</td>
      <td>Jan 15, 2024</td>
    </tr>
    <tr>
      <td>APP-2024-002</td>
      <td>Jane Doe</td>
      <td>Approved</td>
      <td>Jan 14, 2024</td>
    </tr>
  </tbody>
</GoabxTable>`,
        angular: `<goab-table width="100%" [striped]="true">
  <thead>
    <tr>
      <th>Application ID</th>
      <th>Applicant</th>
      <th>Status</th>
      <th>Submitted</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>APP-2024-001</td>
      <td>John Smith</td>
      <td>Under review</td>
      <td>Jan 15, 2024</td>
    </tr>
    <tr>
      <td>APP-2024-002</td>
      <td>Jane Doe</td>
      <td>Approved</td>
      <td>Jan 14, 2024</td>
    </tr>
  </tbody>
</goab-table>`,
        webComponents: `<goa-table width="100%" striped>
  <table>
    <thead>
      <tr>
        <th>Application ID</th>
        <th>Applicant</th>
        <th>Status</th>
        <th>Submitted</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>APP-2024-001</td>
        <td>John Smith</td>
        <td>Under review</td>
        <td>Jan 15, 2024</td>
      </tr>
      <tr>
        <td>APP-2024-002</td>
        <td>Jane Doe</td>
        <td>Approved</td>
        <td>Jan 14, 2024</td>
      </tr>
    </tbody>
  </table>
</goa-table>`,
      },
    },
  ],
};
