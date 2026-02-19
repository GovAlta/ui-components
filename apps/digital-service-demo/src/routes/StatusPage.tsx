import { useState } from 'react';
import { GoabxFormItem, GoabxInput, GoabxButton, GoabxCallout } from '@abgov/react-components/experimental';
import { GoabText } from '@abgov/react-components';
import { GoabInputOnChangeDetail } from '@abgov/ui-components-common';
import { supabase, type Submission } from '../lib/supabase';

export function StatusPage() {
  const [searchValue, setSearchValue] = useState('');
  const [submission, setSubmission] = useState<Submission | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searched, setSearched] = useState(false);

  const handleSearch = async () => {
    if (!searchValue.trim()) return;

    setLoading(true);
    setError(null);
    setSearched(true);

    const { data, error } = await supabase
      .from('submissions')
      .select('*')
      .eq('reference_number', searchValue.trim().toUpperCase())
      .single();

    if (error) {
      if (error.code === 'PGRST116') {
        setSubmission(null);
      } else {
        setError(error.message);
      }
    } else {
      setSubmission(data);
    }
    setLoading(false);
  };

  return (
    <>
      <GoabText as="h1" size="heading-xl" mt="2xl" mb="m">
        Check Application Status
      </GoabText>
      <GoabText size="body-m" mb="l">
        Enter your reference number to check the status of your application.
      </GoabText>

      <GoabxFormItem label="Reference Number" mb="m">
        <GoabxInput
          name="reference"
          value={searchValue}
          onChange={(e: GoabInputOnChangeDetail) => setSearchValue(e.value)}
          placeholder="e.g., SE-C64144"
        />
      </GoabxFormItem>
      <GoabxButton type="primary" onClick={handleSearch} disabled={loading} mb="xl">
        {loading ? 'Searching...' : 'Check Status'}
      </GoabxButton>

      {error && (
        <GoabxCallout type="emergency" heading="Error" emphasis="low">
          {error}
        </GoabxCallout>
      )}

      {searched && !error && !submission && (
        <GoabxCallout type="important" heading="Not Found" emphasis="low">
          No application found with that reference number.
        </GoabxCallout>
      )}

      {submission && (
        <GoabxCallout type="success" heading="Application Found" emphasis="low">
          <GoabText size="body-m" mb="xs"><strong>Reference:</strong> {submission.reference_number}</GoabText>
          <GoabText size="body-m" mb="xs"><strong>Type:</strong> {submission.form_type}</GoabText>
          <GoabText size="body-m" mb="none"><strong>Submitted:</strong> {new Date(submission.submitted_at).toLocaleDateString()}</GoabText>
        </GoabxCallout>
      )}
    </>
  );
}
