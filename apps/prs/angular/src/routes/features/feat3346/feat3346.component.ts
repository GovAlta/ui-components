import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { GoabBlock, GoabTable, GoabText } from "@abgov/angular-components";

@Component({
  standalone: true,
  selector: "abgov-feat3346",
  templateUrl: "./feat3346.component.html",
  imports: [CommonModule, GoabBlock, GoabTable, GoabText],
})
export class Feat3346Component {
  rows = [
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
}
