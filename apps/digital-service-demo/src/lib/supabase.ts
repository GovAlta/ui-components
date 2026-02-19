import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('Supabase credentials not configured. Set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in .env');
}

export const supabase = createClient(
  supabaseUrl || '',
  supabaseAnonKey || ''
);

// Types matching our schema
export interface Submission {
  id: string;
  reference_number: string;
  form_type: string;
  form_data: Record<string, unknown>;
  citizen_name: string | null;
  citizen_email: string | null;
  submitted_at: string;
}

export interface Case {
  id: string;
  submission_id: string;
  status: 'submitted' | 'under_review' | 'info_requested' | 'approved' | 'denied';
  assigned_worker: string | null;
  created_at: string;
  updated_at: string;
}

export interface Action {
  id: string;
  case_id: string;
  action_type: 'status_change' | 'note_added' | 'feedback_sent' | 'assigned';
  actor: string;
  details: Record<string, unknown>;
  created_at: string;
}

// Combined type for case list with submission data
export interface CaseWithSubmission extends Case {
  submissions: Submission;
}
