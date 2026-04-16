import {
  GoabBlock,
  GoabText,
  GoabDivider,
  GoabDetails,
  GoabLink,
  GoabNotification,
} from "@abgov/react-components";

export function Bug3667Route() {
  return (
    <div>
      <GoabText tag="h1" mt="m">
        Bug #3667: Notification banner refinements
      </GoabText>

      <GoabBlock>
        <GoabLink trailingIcon="open">
          <a
            href="https://github.com/GovAlta/ui-components/issues/3667"
            target="_blank"
            rel="noopener"
          >
            View on GitHub
          </a>
        </GoabLink>

        <GoabDetails heading="Issue Description">
          <GoabText tag="p">
            Notification banner height refinements. Compact should be 64px (currently
            ~66px), default should be 80px (currently ~82px). Also need to verify vertical
            centering of content (icon, text, dismiss button) at both sizes. The Event
            type should be silently undocumented (docs removal only, no code change
            needed).
          </GoabText>
        </GoabDetails>
      </GoabBlock>

      <GoabDivider mt="l" mb="l" />

      <GoabText tag="h2">Test Cases</GoabText>

      {/* ── Test 1: Height measurements ── */}
      <GoabText tag="h3">Test 1: Height at default and compact sizes</GoabText>
      <GoabText tag="p">
        Measure the rendered height of each banner. Default should be 80px, compact should
        be 64px. Use browser dev tools to inspect the goa-notification element and measure
        the outer height.
      </GoabText>

      <GoabText tag="h4" mt="m">
        Default size (target: 80px)
      </GoabText>
      <GoabNotification type="information">
        Default information banner for height measurement.
      </GoabNotification>

      <GoabText tag="h4" mt="m">
        Compact size (target: 64px)
      </GoabText>
      <GoabNotification type="information" compact={true}>
        Compact information banner for height measurement.
      </GoabNotification>

      <GoabText tag="h4" mt="m">
        Default important (target: 80px)
      </GoabText>
      <GoabNotification type="important">
        Default important banner for height measurement.
      </GoabNotification>

      <GoabText tag="h4" mt="m">
        Compact important (target: 64px)
      </GoabText>
      <GoabNotification type="important" compact={true}>
        Compact important banner for height measurement.
      </GoabNotification>

      <GoabDivider mt="l" mb="l" />

      {/* ── Test 2: Vertical centering ── */}
      <GoabText tag="h3">Test 2: Vertical centering of content</GoabText>
      <GoabText tag="p">
        Check that the icon, text, and close button are vertically centered at both sizes.
      </GoabText>

      <GoabText tag="h4" mt="m">
        Default emergency
      </GoabText>
      <GoabNotification type="emergency">
        Emergency banner. Check vertical alignment of icon, text, and close button.
      </GoabNotification>

      <GoabText tag="h4" mt="m">
        Compact emergency
      </GoabText>
      <GoabNotification type="emergency" compact={true}>
        Compact emergency. Check vertical alignment.
      </GoabNotification>

      <GoabDivider mt="l" mb="l" />

      {/* ── Test 3: Event type reference ── */}
      <GoabText tag="h3">Test 3: Event type banner (to be undocumented)</GoabText>
      <GoabText tag="p">
        The Event type should be silently removed from documentation only (no code
        change). Showing it here for reference to confirm it still renders correctly.
      </GoabText>

      <GoabText tag="h4" mt="m">
        Default event
      </GoabText>
      <GoabNotification type="event">
        Event banner at default size. This type will be removed from docs but the code
        stays.
      </GoabNotification>

      <GoabText tag="h4" mt="m">
        Compact event
      </GoabText>
      <GoabNotification type="event" compact={true}>
        Event banner at compact size.
      </GoabNotification>
    </div>
  );
}

export default Bug3667Route;
