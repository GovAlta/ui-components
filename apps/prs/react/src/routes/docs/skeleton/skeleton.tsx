import { useState } from "react";
import {
  GoabAppFooter,
  GoabAppHeader,
  GoabButton,
  GoabFormStep,
  GoabFormStepper,
  GoabGrid,
  GoabOneColumnLayout,
  GoabPageBlock,
  GoabPages,
  GoabSkeleton,
  GoabSpacer,
} from "@abgov/react-components";
import type { GoabFormStepperOnChangeDetail } from "@abgov/ui-components-common";

export function DocsSkeletonRoute() {
  const [step, setStep] = useState(1);

  const setPage = (page: number) => {
    if (page < 1 || page > 4) return;
    setStep(page);
  };

  return (
    <div>
      <h2>Skeleton loader</h2>

      <h3>Text</h3>
      <GoabSkeleton type="text" mb="s" />
      <GoabSkeleton type="text" mb="s" />
      <GoabSkeleton type="text" mb="s" />
      <GoabSkeleton type="text" />

      <h3>Content types</h3>
      <GoabSkeleton type="text" mb="s" />
      <GoabSkeleton type="text-small" mb="s" />
      <GoabSkeleton type="title" mb="s" />
      <GoabSkeleton type="header" mb="s" />
      <GoabSkeleton type="paragraph" />

      <h3>Media types</h3>
      <GoabSkeleton type="avatar" mb="s" />
      <GoabSkeleton type="thumbnail" mb="s" />
      <GoabSkeleton type="image" size="2" />

      <h3>Composite types</h3>
      <GoabSkeleton type="lines" mb="l" />
      <GoabSkeleton type="profile" mb="l" />
      <GoabSkeleton type="card" mb="l" />
      <GoabSkeleton type="article" />

      <h2>Examples</h2>

      <h3>Basic page layout</h3>
      <GoabOneColumnLayout>
        <section slot="header">
          <GoabAppHeader url="/" heading="Service name">
            <a href="/login">Sign in</a>
          </GoabAppHeader>
        </section>
        <GoabPageBlock width="704px">
          <p>
            <GoabSkeleton type="header" size="4" />
            <GoabSkeleton type="text" size="1" />
          </p>
          <p>
            <GoabSkeleton type="header" size="4" />
            <GoabSkeleton type="text" size="1" />
          </p>
          <GoabGrid minChildWidth="30ch">
            <GoabSkeleton type="card" size="2" />
            <GoabSkeleton type="card" size="2" />
          </GoabGrid>
        </GoabPageBlock>
        <section slot="footer">
          <GoabAppFooter />
        </section>
      </GoabOneColumnLayout>

      <h3>Form stepper with controlled navigation</h3>
      <GoabFormStepper step={step} onChange={(event: GoabFormStepperOnChangeDetail) => setStep(event.step)}>
        <GoabFormStep text="Personal details" />
        <GoabFormStep text="Employment history" />
        <GoabFormStep text="References" />
        <GoabFormStep text="Review" />
      </GoabFormStepper>
      <GoabPages current={step} mb="3xl" mt="xl" mr="xl" ml="xl">
        <div>
          <GoabSkeleton type="article" />
        </div>
        <div>
          <GoabSkeleton type="header" size="2" />
          <GoabSkeleton type="text" />
          <GoabSkeleton type="header" size="2" />
          <GoabSkeleton type="text" />
        </div>
        <div>
          <GoabSkeleton type="text" />
          <GoabSpacer vSpacing="m" />
          <GoabSkeleton type="text" />
        </div>
        <div>
          <GoabSkeleton type="header" size="2" />
          <GoabSkeleton type="text" />
          <GoabSpacer vSpacing="m" />
          <GoabSkeleton type="text" />
        </div>
      </GoabPages>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <GoabButton type="secondary" onClick={() => setPage(step - 1)}>
          Previous
        </GoabButton>
        <GoabButton type="primary" onClick={() => setPage(step + 1)}>
          Next
        </GoabButton>
      </div>
    </div>
  );
}
