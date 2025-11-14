import {
  GoabButton,
  GoabNotification,
  GoabPopover,
  GoabTooltip,
  GoabIcon,
  GoabMicrositeHeader,
} from "@abgov/react-components";

export const Bug2547Route = () => {
  return (
    <>
      <GoabMicrositeHeader
        type={"live"}
        feedbackUrl="https://forms.microsoft.com/r/8Zp7zSJS6W"
        maxContentWidth={"1440px"}
        version={
          <>
            <GoabTooltip content="Framework">
              <GoabPopover
                target={
                  <a
                    className="version-language-switcher__heading"
                    id="language-switcher"
                    href="/#"
                  >
                    <GoabIcon type="chevron-down" size="small"></GoabIcon>Angular
                  </a>
                }
                padded={false}
              >
                <>
                  {["angular", "react"].map((lang) => (
                    <a
                      key={lang}
                      style={{
                        display: "block",
                        font: "var(--goa-typography-body-s)",
                        padding:
                          "var(--goa-space-s) var(--goa-space-s) var(--goa-space-s) var(--goa-space-s)",
                        textDecoration: "none",
                        color: "var(--goa-color-text-default)!important",
                        whiteSpace: "nowrap",
                      }}
                      href="/#"
                    >
                      {lang}
                    </a>
                  ))}
                </>
              </GoabPopover>
            </GoabTooltip>
            <GoabPopover
              target={
                <GoabButton type="secondary" size="compact">
                  Click me
                </GoabButton>
              }
            >
              <p>This is a popover</p>
              It can be used for a number of different contexts.
            </GoabPopover>
          </>
        }
      />

      <GoabNotification type="information">Notification banner message</GoabNotification>
    </>
  );
};
