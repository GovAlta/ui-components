/**
 * PLAYGROUND TEST PAGE TEMPLATE
 *
 * 1. Copy to: src/routes/bugs/bug{N}.tsx or src/routes/features/feat{N}.tsx
 * 2. Rename component: Bug{N}Route or Feat{N}Route
 * 3. Update header, GitHub link, and description below
 * 4. Add import + route to main.tsx
 * 5. Add nav link to app.tsx
 * 6. Add your test cases
 */

import {
  GoabBlock,
  GoabText,
  GoabDivider,
  GoabDetails,
  GoabLink,
  // Add your component imports here
} from "@abgov/react-components";

export function TemplateRoute() {
  return (
    <div>
      <GoabText tag="h1" mt="m">
        Bug #0000: [Short title here]
      </GoabText>

      <GoabBlock>
        <GoabLink trailingIcon="open">
          <a href="https://github.com/GovAlta/ui-components/issues/0000" target="_blank" rel="noopener">
            View on GitHub
          </a>
        </GoabLink>

        <GoabDetails heading="Issue Description">
          <GoabText tag="p">
            [Paste issue description here. Include expected vs actual behavior.]
          </GoabText>
        </GoabDetails>
      </GoabBlock>

      <GoabDivider mt="l" mb="l" />

      <GoabText tag="h2">Test Cases</GoabText>

      <GoabText tag="h3">Test 1: [Test name]</GoabText>
      <GoabText tag="p">
        Description of what this test case verifies.
      </GoabText>
      {/* Add your test component here */}

      <GoabText tag="h3">Test 2: [Test name]</GoabText>
      <GoabText tag="p">
        Description of what this test case verifies.
      </GoabText>
      {/* Add your test component here */}
    </div>
  );
}

export default TemplateRoute;
