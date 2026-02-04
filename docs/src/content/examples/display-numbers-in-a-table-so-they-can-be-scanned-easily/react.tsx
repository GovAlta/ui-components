import { GoabxTable } from "@abgov/react-components/experimental";

export function DisplayNumbersInATableSoTheyCanBeScannedEasily() {
  return (
    <GoabxTable width="100%">
      <thead>
        <tr>
          <th>First name</th>
          <th>Last name</th>
          <th className="goa-table-number-header">ID Number</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Sarah</td>
          <td>Johnson</td>
          <td className="goa-table-number-column">54</td>
        </tr>
        <tr>
          <td>Michael</td>
          <td>Chen</td>
          <td className="goa-table-number-column">4567</td>
        </tr>
        <tr>
          <td>Emily</td>
          <td>Williams</td>
          <td className="goa-table-number-column">892</td>
        </tr>
        <tr>
          <td>David</td>
          <td>Brown</td>
          <td className="goa-table-number-column">12345</td>
        </tr>
        <tr>
          <td>Jennifer</td>
          <td>Martinez</td>
          <td className="goa-table-number-column">7</td>
        </tr>
      </tbody>
    </GoabxTable>
  );
}
