import {
  GoabBlock,
  GoabTable,
  GoabText,
} from "@abgov/react-components";

export function Bug3384Route() {
  return (
    <GoabBlock direction="column" gap="l">
      <GoabText tag="h1">Bug 3384 - GoabTable Border</GoabText>

      <GoabText tag="p">
        The below table should have a border with a border radius.
      </GoabText>

      <GoabTable width="100%">
        <thead>
          <tr>
            <th>Service</th>
            <th>Status</th>
            <th className="Goab-table-number-header">Requests</th>
            <th>Updated</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Alberta.ca Accounts</td>
            <td>Operational</td>
            <td className="Goab-table-number-cell">128</td>
            <td>2026-02-05</td>
          </tr>
          <tr>
            <td>Payments</td>
            <td>Degraded</td>
            <td className="Goab-table-number-cell">42</td>
            <td>2026-02-04</td>
          </tr>
          <tr>
            <td>Notifications</td>
            <td>Maintenance</td>
            <td className="Goab-table-number-cell">7</td>
            <td>2026-02-03</td>
          </tr>
        </tbody>
      </GoabTable>
    </GoabBlock>
  );
}
