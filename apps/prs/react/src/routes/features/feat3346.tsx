import { GoabBlock, GoabTable, GoabText } from "@abgov/react-components";

const rows = [
  {
    recordId: "USR-000184",
    name: "John Smith",
    status: "Active",
    createdDate: "Jan 15, 2024",
    department: "Service Delivery and Digital Experience",
    role: "Senior Program Analyst",
    email: "john.smith@gov.ab.ca",
    phone: "780-555-0192",
    region: "Edmonton North",
    office: "Commerce Place Tower B",
    manager: "Priya Patel",
    project: "Citizen Portal Modernization",
    priority: "High",
    risk: "Medium",
    progress: "72%",
    notes: "Waiting on external vendor dependency confirmation.",
  },
  {
    recordId: "USR-000271",
    name: "Jane Doe",
    status: "Pending",
    createdDate: "Jan 16, 2024",
    department: "Policy and Intergovernmental Relations",
    role: "Business Relationship Manager",
    email: "jane.doe@gov.ab.ca",
    phone: "403-555-0146",
    region: "Calgary South",
    office: "Rocky Mountain Plaza",
    manager: "Alexander Greene",
    project: "Interagency Data Sharing Framework",
    priority: "Medium",
    risk: "Low",
    progress: "38%",
    notes: "Needs legal review before moving to implementation.",
  },
  {
    recordId: "USR-000319",
    name: "Samir Khan",
    status: "On Hold",
    createdDate: "Jan 18, 2024",
    department: "Infrastructure and Shared Services",
    role: "Technical Product Owner",
    email: "samir.khan@gov.ab.ca",
    phone: "587-555-0131",
    region: "Red Deer Central",
    office: "Provincial Services Building",
    manager: "Mei Lin",
    project: "Identity and Access Management Rollout",
    priority: "Critical",
    risk: "High",
    progress: "54%",
    notes: "Blocked by procurement timeline for hardware tokens.",
  },
];

export function Feat3346Route() {
  return (
    <GoabBlock gap="m" direction="column">
      <GoabText as="h1" size="heading-l" mt="none">
        Feature 3346: Table Horizontal Scroll Shadows
      </GoabText>
      <GoabText mt="none">
        This demo intentionally uses many columns and long values to force horizontal overflow.
        Scroll the table to verify left and right edge shadows.
      </GoabText>

      <div style={{ maxWidth: "800px", width: "100%" }}>
        <GoabTable width="100%">
          <thead>
            <tr>
              <th>Record ID</th>
              <th>Name</th>
              <th>Status</th>
              <th>Created Date</th>
              <th>Department</th>
              <th>Role</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Region</th>
              <th>Office</th>
              <th>Manager</th>
              <th>Project</th>
              <th>Priority</th>
              <th>Risk</th>
              <th>Progress</th>
              <th>Notes</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.recordId}>
                <td>{row.recordId}</td>
                <td>{row.name}</td>
                <td>{row.status}</td>
                <td>{row.createdDate}</td>
                <td>{row.department}</td>
                <td>{row.role}</td>
                <td>{row.email}</td>
                <td>{row.phone}</td>
                <td>{row.region}</td>
                <td>{row.office}</td>
                <td>{row.manager}</td>
                <td>{row.project}</td>
                <td>{row.priority}</td>
                <td>{row.risk}</td>
                <td>{row.progress}</td>
                <td>{row.notes}</td>
              </tr>
            ))}
          </tbody>
        </GoabTable>
      </div>
    </GoabBlock>
  );
}

export default Feat3346Route;
