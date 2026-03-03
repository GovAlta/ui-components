import { CaseWithSubmission } from '../../lib/supabase';
import { WorkspaceCase } from '../types/Case';

// Map Supabase case status to GoA badge type
export function getStatusBadgeType(status: CaseWithSubmission['status']): WorkspaceCase['status'] {
  switch (status) {
    case 'submitted':
      return 'information';
    case 'under_review':
      return 'important';
    case 'info_requested':
      return 'emergency';
    case 'approved':
      return 'success';
    case 'denied':
      return 'emergency';
    default:
      return 'information';
  }
}

// Map Supabase case status to display text
function getStatusText(status: CaseWithSubmission['status']): string {
  switch (status) {
    case 'submitted':
      return 'Submitted';
    case 'under_review':
      return 'Under Review';
    case 'info_requested':
      return 'Info Requested';
    case 'approved':
      return 'Approved';
    case 'denied':
      return 'Denied';
    default:
      return status;
  }
}

// Format citizen name from submission data (with backward compatibility)
function formatCitizenName(submission: CaseWithSubmission['submissions']): string {
  const formData = submission.form_data as Record<string, unknown>;

  // 1. Try new location: task3.about-you.fullName (Brief 07+)
  const task3Data = formData?.task3 as Record<string, Record<string, unknown>> | undefined;
  const aboutYou = task3Data?.['about-you'];
  if (aboutYou?.fullName && typeof aboutYou.fullName === 'string') {
    return aboutYou.fullName;
  }

  // 2. Fall back to old location: task1.consent.fullName (pre-Brief 07)
  const task1Data = formData?.task1 as Record<string, Record<string, unknown>> | undefined;
  const consent = task1Data?.['consent'];
  if (consent?.fullName && typeof consent.fullName === 'string') {
    return consent.fullName;
  }

  // 3. Fall back to citizen_name column
  if (submission.citizen_name) {
    return submission.citizen_name;
  }

  // 4. Try legacy flat structure
  const firstName = formData?.firstName || formData?.first_name || '';
  const lastName = formData?.lastName || formData?.last_name || '';
  if (firstName || lastName) {
    return `${firstName} ${lastName}`.trim();
  }

  return 'Unknown Citizen';
}

// Convert Supabase CaseWithSubmission to WorkspaceCase
export function toWorkspaceCase(supabaseCase: CaseWithSubmission): WorkspaceCase {
  return {
    id: supabaseCase.id,
    name: formatCitizenName(supabaseCase.submissions),
    referenceNumber: supabaseCase.submissions.reference_number,
    status: getStatusBadgeType(supabaseCase.status),
    statusText: getStatusText(supabaseCase.status),
    submittedAt: new Date(supabaseCase.submissions.submitted_at).toLocaleDateString('en-CA'),
    assignedWorker: supabaseCase.assigned_worker,
    citizenEmail: supabaseCase.submissions.citizen_email,
    formType: supabaseCase.submissions.form_type,
  };
}

// Convert array of cases
export function toWorkspaceCases(supabaseCases: CaseWithSubmission[]): WorkspaceCase[] {
  return supabaseCases.map(toWorkspaceCase);
}
