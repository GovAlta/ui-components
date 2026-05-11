import {
  GoabBadge,
  GoabContainer,
  GoabText,
  GoabWorkSideMenu,
  GoabWorkSideMenuItem,
} from "@abgov/react-components";

export function Feat3814Route() {
  return (
    <div
      style={{ display: "flex", flexDirection: "column", gap: "var(--goa-spacing-l)" }}
    >
      <GoabText as="h1" size="heading-xl">
        Feature 3814: Work Side Menu trailingContent slot
      </GoabText>

      <GoabText as="p" size="body-m">
        This page demonstrates the new trailingContent slot on Work Side Menu Item. The
        first item shows a keyboard shortcut hint and the second item shows a badge.
      </GoabText>

      <GoabContainer>
        <div style={{ height: "420px", overflow: "hidden" }}>
          <GoabWorkSideMenu
            heading="Feature 3814 Demo"
            url="/"
            open={true}
            primaryContent={
              <>
                <GoabWorkSideMenuItem
                  label="Search"
                  icon="search"
                  url="/features/3814/search"
                  trailingContent={
                    <span
                      style={{
                        color: "var(--goa-color-greyscale-600)",
                        minWidth: "var(--goa-spacing-5)",
                        lineHeight: "1",
                        fontSize: "var(--goa-font-size-2)",
                        backgroundColor: "var(--goa-color-greyscale-100)",
                        border: "1px solid var(--goa-color-greyscale-200)",
                        borderRadius: "var(--goa-border-radius-s)",
                        padding: "var(--goa-space-3xs) var(--goa-space-xs)",
                        display: "inline-block",
                        verticalAlign: "top",
                        marginTop: "var(--goa-space-3xs)",
                      }}
                    >
                      Ctrl K
                    </span>
                  }
                />
                <GoabWorkSideMenuItem
                  label="Notifications"
                  icon="notifications"
                  url="/features/3814/notifications"
                  trailingContent={<GoabBadge type="success" content="3" icon={false} />}
                />
                <GoabWorkSideMenuItem
                  label="Reports"
                  icon="document"
                  url="/features/3814/reports"
                />
              </>
            }
          />
        </div>
      </GoabContainer>
    </div>
  );
}

export default Feat3814Route;
