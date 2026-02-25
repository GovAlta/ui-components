import { GoabxBadge, GoabxButton, GoabxTable } from "@abgov/react-components/experimental";
import type { GoabBadgeType } from "@abgov/ui-components-common";

interface BadgeValue {
  key: number;
  type: GoabBadgeType;
  content: string;
}

export function ShowStatusInATable() {
  const badgeValues: BadgeValue[] = [
    { key: 1, type: "important", content: "Pending" },
    { key: 2, type: "emergency", content: "Failed" },
    { key: 3, type: "success", content: "Complete" },
    { key: 4, type: "information", content: "In progress" },
    { key: 5, type: "midtone", content: "Closed" },
    { key: 6, type: "success", content: "Complete" },
  ];

  const handleClick = () => {
    console.log("clicked");
  };

  return (
    <GoabxTable width="100%">
      <thead>
        <tr>
          <th>Status</th>
          <th>Name</th>
          <th className="goa-table-number-header">File number</th>
          <th style={{ width: "1%", whiteSpace: "nowrap" }}></th>
        </tr>
      </thead>
      <tbody>
        {badgeValues.map((badge) => (
          <tr key={badge.key}>
            <td>
              <GoabxBadge type={badge.type} content={badge.content} icon={false} />
            </td>
            <td>Lorem ipsum dolor sit amet consectetur</td>
            <td className="goa-table-number-column">1234567890</td>
            <td>
              <GoabxButton size="compact" type="tertiary" onClick={handleClick}>
                Assign
              </GoabxButton>
            </td>
          </tr>
        ))}
      </tbody>
    </GoabxTable>
  );
}
