/**
 * Seed Demo Data Script
 *
 * Creates cases in varied states for demo purposes.
 * Run with: npx nx run digital-service-demo:seed
 *
 * This script:
 * 1. Clears existing seed data (submissions with SEED- prefix in notes)
 * 2. Creates submissions with realistic citizen data
 * 3. Creates/updates cases with varied statuses
 * 4. Creates action records for non-submitted cases
 */

import { createClient } from "@supabase/supabase-js";

// Supabase config - same as the app
const supabaseUrl = "https://boheuirerkpnfzjqjlcf.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJvaGV1aXJlcmtwbmZ6anFqbGNmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzE0Mzk0MjksImV4cCI6MjA4NzAxNTQyOX0.MPIpNKm-vPuIw_pwxBRawsM2GUcxZqyf4AHndE_A6yU";

const supabase = createClient(supabaseUrl, supabaseKey);

// ─────────────────────────────────────────────────────────────────────────────
// Seed Data Configuration
// ─────────────────────────────────────────────────────────────────────────────

type CaseStatus =
  | "submitted"
  | "under_review"
  | "info_requested"
  | "approved"
  | "denied";

interface SeedCitizen {
  name: string;
  email: string;
  phone: string;
  status: CaseStatus;
  assignedWorker: string | null;
  actionDetails?: string; // For approved/denied/info_requested
}

const WORKER_NAME = "Edna Mode";
const SEED_MARKER = "[SEED]"; // Marker in form_data to identify seeded data

const seedCitizens: SeedCitizen[] = [
  // Unassigned - new submissions
  {
    name: "Sarah Chen",
    email: "sarah.chen@email.com",
    phone: "780-555-1001",
    status: "submitted",
    assignedWorker: null,
  },
  {
    name: "Marcus Rodriguez",
    email: "marcus.r@email.com",
    phone: "780-555-1002",
    status: "submitted",
    assignedWorker: null,
  },

  // Under review - assigned to worker
  {
    name: "Emily Thompson",
    email: "emily.t@email.com",
    phone: "780-555-1003",
    status: "under_review",
    assignedWorker: WORKER_NAME,
  },
  {
    name: "James Wilson",
    email: "james.wilson@email.com",
    phone: "780-555-1004",
    status: "under_review",
    assignedWorker: WORKER_NAME,
  },

  // Info requested - waiting for citizen
  {
    name: "Lisa Park",
    email: "lisa.park@email.com",
    phone: "780-555-1005",
    status: "info_requested",
    assignedWorker: WORKER_NAME,
    actionDetails: "Please upload a clear photo of your government-issued ID.",
  },

  // Completed - approved
  {
    name: "Michael Brown",
    email: "michael.b@email.com",
    phone: "780-555-1006",
    status: "approved",
    assignedWorker: WORKER_NAME,
    actionDetails: "All eligibility criteria met. Application approved.",
  },

  // Completed - denied
  {
    name: "Jennifer Davis",
    email: "jennifer.d@email.com",
    phone: "780-555-1007",
    status: "denied",
    assignedWorker: WORKER_NAME,
    actionDetails:
      "Applicant does not meet residency requirements (less than 12 months).",
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// Helper Functions
// ─────────────────────────────────────────────────────────────────────────────

function generateFormData(citizen: SeedCitizen): Record<string, unknown> {
  return {
    _seed: SEED_MARKER, // Marker to identify seeded data
    task1: {
      "marital-status": { status: "single" },
      dependants: { hasDependants: "no" },
      "contact-preference": { emailAddress: citizen.email },
      address: {
        streetAddress: "123 Main Street",
        city: "Edmonton",
        province: "Alberta",
        postalCode: "T5K 0A1",
      },
    },
    task2: {
      "date-of-birth": { dateOfBirth: "1990-05-15" },
      "id-info": { idType: "drivers-license", idNumber: "ABC123456" },
    },
    task3: {
      "about-you": { fullName: citizen.name, phoneNumber: citizen.phone },
      "applying-for": { service: "childcare-subsidy" },
      employment: { employmentStatus: "employed", employer: "Acme Corp" },
    },
    task4: {
      "upload-id": { uploaded: true },
    },
  };
}

function log(message: string) {
  console.log(`[seed] ${message}`);
}

function logError(message: string, error: unknown) {
  console.error(`[seed] ERROR: ${message}`, error);
}

// ─────────────────────────────────────────────────────────────────────────────
// Database Operations
// ─────────────────────────────────────────────────────────────────────────────

async function clearSeedData() {
  log("Clearing existing seed data...");

  // Find submissions with seed marker
  const { data: submissions, error: findError } = await supabase
    .from("submissions")
    .select("id")
    .contains("form_data", { _seed: SEED_MARKER });

  if (findError) {
    logError("Failed to find seed submissions", findError);
    return;
  }

  if (!submissions || submissions.length === 0) {
    log("No existing seed data found");
    return;
  }

  const submissionIds = submissions.map((s) => s.id);
  log(`Found ${submissionIds.length} seed submissions to delete`);

  // Find associated cases
  const { data: cases } = await supabase
    .from("cases")
    .select("id")
    .in("submission_id", submissionIds);

  if (cases && cases.length > 0) {
    const caseIds = cases.map((c) => c.id);

    // Delete actions first (foreign key constraint)
    const { error: actionsError } = await supabase
      .from("actions")
      .delete()
      .in("case_id", caseIds);

    if (actionsError) {
      logError("Failed to delete actions", actionsError);
    } else {
      log(`Deleted actions for ${caseIds.length} cases`);
    }

    // Delete cases
    const { error: casesError } = await supabase
      .from("cases")
      .delete()
      .in("submission_id", submissionIds);

    if (casesError) {
      logError("Failed to delete cases", casesError);
    } else {
      log(`Deleted ${caseIds.length} cases`);
    }
  }

  // Delete submissions
  const { error: submissionsError } = await supabase
    .from("submissions")
    .delete()
    .in("id", submissionIds);

  if (submissionsError) {
    logError("Failed to delete submissions", submissionsError);
  } else {
    log(`Deleted ${submissionIds.length} submissions`);
  }
}

async function createSubmissionAndCase(citizen: SeedCitizen) {
  log(`Creating submission for ${citizen.name}...`);

  // Create submission
  const { data: submission, error: submissionError } = await supabase
    .from("submissions")
    .insert({
      form_type: "service-application",
      citizen_name: citizen.name,
      citizen_email: citizen.email,
      citizen_phone: citizen.phone,
      form_data: generateFormData(citizen),
    })
    .select("id, reference_number")
    .single();

  if (submissionError || !submission) {
    logError(`Failed to create submission for ${citizen.name}`, submissionError);
    return null;
  }

  log(`  Created submission: ${submission.reference_number}`);

  // Wait a moment for any trigger to create the case
  await new Promise((resolve) => setTimeout(resolve, 200));

  // Check if case was auto-created by trigger
  let { data: existingCase } = await supabase
    .from("cases")
    .select("id")
    .eq("submission_id", submission.id)
    .single();

  let caseId: string;

  if (existingCase) {
    caseId = existingCase.id;
    log(`  Found auto-created case: ${caseId}`);

    // Update case with desired status and assignment
    const { error: updateError } = await supabase
      .from("cases")
      .update({
        status: citizen.status,
        assigned_worker: citizen.assignedWorker,
      })
      .eq("id", caseId);

    if (updateError) {
      logError(`Failed to update case for ${citizen.name}`, updateError);
    }
  } else {
    // No trigger - create case manually
    const { data: newCase, error: caseError } = await supabase
      .from("cases")
      .insert({
        submission_id: submission.id,
        status: citizen.status,
        assigned_worker: citizen.assignedWorker,
      })
      .select("id")
      .single();

    if (caseError || !newCase) {
      logError(`Failed to create case for ${citizen.name}`, caseError);
      return null;
    }

    caseId = newCase.id;
    log(`  Created case manually: ${caseId}`);
  }

  // Create actions for non-submitted cases
  if (citizen.status !== "submitted") {
    await createActionsForCase(caseId, citizen);
  }

  return { submissionId: submission.id, caseId, referenceNumber: submission.reference_number };
}

async function createActionsForCase(caseId: string, citizen: SeedCitizen) {
  const actions: Array<{
    case_id: string;
    action_type: string;
    actor: string;
    details: Record<string, unknown>;
    created_at?: string;
  }> = [];

  // All non-submitted cases were assigned first
  const baseTime = new Date();
  baseTime.setHours(baseTime.getHours() - 2); // 2 hours ago

  actions.push({
    case_id: caseId,
    action_type: "assigned",
    actor: citizen.assignedWorker || WORKER_NAME,
    details: {},
    created_at: baseTime.toISOString(),
  });

  // Add status-specific action
  if (
    citizen.status === "approved" ||
    citizen.status === "denied" ||
    citizen.status === "info_requested"
  ) {
    const statusTime = new Date();
    statusTime.setMinutes(statusTime.getMinutes() - 30); // 30 minutes ago

    actions.push({
      case_id: caseId,
      action_type: "status_change",
      actor: citizen.assignedWorker || WORKER_NAME,
      details: {
        from_status: "under_review",
        to_status: citizen.status,
        reason: citizen.actionDetails || "",
      },
      created_at: statusTime.toISOString(),
    });
  }

  for (const action of actions) {
    const { error } = await supabase.from("actions").insert(action);
    if (error) {
      logError(`Failed to create action for case ${caseId}`, error);
    }
  }

  log(`  Created ${actions.length} action(s) for case`);
}

// ─────────────────────────────────────────────────────────────────────────────
// Main
// ─────────────────────────────────────────────────────────────────────────────

async function main() {
  console.log("\n========================================");
  console.log("  Digital Service Demo - Seed Data");
  console.log("========================================\n");

  // Clear existing seed data
  await clearSeedData();

  console.log("");

  // Create new seed data
  log("Creating seed data...\n");

  const results: Array<{
    name: string;
    status: string;
    referenceNumber: string;
  }> = [];

  for (const citizen of seedCitizens) {
    const result = await createSubmissionAndCase(citizen);
    if (result) {
      results.push({
        name: citizen.name,
        status: citizen.status,
        referenceNumber: result.referenceNumber,
      });
    }
    console.log(""); // Blank line between citizens
  }

  // Summary
  console.log("========================================");
  console.log("  Seed Complete!");
  console.log("========================================\n");

  console.log("Created cases:\n");
  console.log("  Name                   Status           Reference");
  console.log("  ────────────────────── ──────────────── ──────────────");

  for (const r of results) {
    const namePad = r.name.padEnd(22);
    const statusPad = r.status.padEnd(16);
    console.log(`  ${namePad} ${statusPad} ${r.referenceNumber}`);
  }

  console.log("\n  Tab distribution:");
  console.log(`    Unassigned:     ${results.filter((r) => r.status === "submitted").length}`);
  console.log(
    `    Assigned to me: ${results.filter((r) => r.status === "under_review").length}`
  );
  console.log(
    `    Waiting:        ${results.filter((r) => r.status === "info_requested").length}`
  );
  console.log(
    `    Complete:       ${results.filter((r) => r.status === "approved" || r.status === "denied").length}`
  );

  console.log("\nView at: https://digital-service-demo-v1.netlify.app/workspace\n");
}

main().catch(console.error);
