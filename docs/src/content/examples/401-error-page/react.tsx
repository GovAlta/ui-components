import {
  GoabBlock,
  GoabButton,
  GoabIcon,
  GoabLink,
  GoabPageBlock,
  GoabText,
} from "@abgov/react-components";

export function RestrictedAccess() {
  return (
    <>
      <style>{`
        .error-page-content {
          text-align: center;
        }
        .error-page-icon {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 7.5rem;
          height: 7.5rem;
          border-radius: 50%;
          background-color: var(--goa-color-greyscale-100);
        }
        /* Icon scaled beyond xlarge (2.5rem cap) to match the page-scale visual weight. */
        /* Tracked in icon-sizes-above-xlarge gap ticket. */
        .error-page-icon goa-icon,
        .error-page-icon goab-icon {
          transform: scale(1.35);
        }
        .error-page-underline {
          width: 6.875rem;
          height: var(--goa-space-xs);
          background-color: var(--goa-color-info-default);
        }
      `}</style>

      <GoabPageBlock>
        <div className="error-page-content">
          <GoabBlock
            direction="column"
            alignment="center"
            gap="xl"
            width="100%"
            mt="3xl"
            mb="3xl"
          >
            <GoabBlock direction="column" alignment="center" gap="m" width="100%">
              <div className="error-page-icon">
                <GoabIcon role="presentation" type="warning" size="xlarge" />
              </div>
              <GoabText size="body-m" color="secondary" mt="none" mb="none">
                Error 401
              </GoabText>
              <div className="error-page-underline" aria-hidden="true" />
            </GoabBlock>

            <GoabBlock direction="column" alignment="center" gap="l" width="100%">
              <GoabText tag="h1" size="heading-l" mt="none" mb="none">
                Restricted access
              </GoabText>
              <GoabText size="body-m" mt="none" mb="none">
                We cannot provide access to this page without valid credentials. Please sign in or
                contact support at{" "}
                <GoabLink>
                  <a href="mailto:cs.licensingsupport@gov.ab.ca">cs.licensingsupport@gov.ab.ca</a>
                </GoabLink>{" "}
                to request access.
              </GoabText>
            </GoabBlock>

            <GoabButton type="primary" size="compact" onClick={() => (window.location.href = "/")}>
              Go to home page
            </GoabButton>
          </GoabBlock>
        </div>
      </GoabPageBlock>
    </>
  );
}
