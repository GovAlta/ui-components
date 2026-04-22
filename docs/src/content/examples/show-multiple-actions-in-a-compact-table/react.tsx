import { GoabBadge, GoabBlock, GoabIconButton, GoabTable } from "@abgov/react-components";

export function ShowMultipleActionsInACompactTable() {
  const rows = [
    {
      status: "information",
      statusText: "In progress",
      name: "Darlene Robertson",
      id: 45904,
    },
    { status: "default", statusText: "Inactive", name: "Floyd Miles", id: 47838 },
    { status: "success", statusText: "Active", name: "Kathryn Murphy", id: 34343 },
    { status: "important", statusText: "Recent", name: "Annette Black", id: 89897 },
    { status: "success", statusText: "Active", name: "Esther Howard", id: 12323 },
    { status: "success", statusText: "Active", name: "Jane Cooper", id: 56565 },
  ];

  return (
    <GoabTable width="100%">
      <thead>
        <tr>
          <th>Status</th>
          <th>Name</th>
          <th style={{ textAlign: "right" }}>Id Number</th>
          <th style={{ width: "1%", whiteSpace: "nowrap" }}>Edit | Flag | Send</th>
        </tr>
      </thead>
      <tbody>
        {rows.map((row) => (
          <tr key={row.id}>
            <td>
              <GoabBadge
                type={row.status as "information" | "default" | "success" | "important"}
                content={row.statusText}
                icon={false}
              />
            </td>
            <td>{row.name}</td>
            <td className="goa-table-number-column">{row.id}</td>
            <td>
              <GoabBlock>
                <GoabIconButton size="small" icon="pencil" ariaLabel="Edit" />
                <GoabIconButton size="small" icon="flag" ariaLabel="Flag" />
                <GoabIconButton size="small" icon="mail" ariaLabel="Send" />
              </GoabBlock>
            </td>
          </tr>
        ))}
      </tbody>
    </GoabTable>
  );
}
