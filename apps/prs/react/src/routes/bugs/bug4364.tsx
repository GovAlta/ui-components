import { GoabAppHeader, GoabBadge, GoabButton, GoabText } from "@abgov/react-components";
import "./bug4364.css";

export function Bug4364Route() {
  const utilities = (
    <>
      <GoabButton type="secondary" size="compact" leadingIcon="mail">
        Messages
      </GoabButton>
      <GoabButton type="secondary" size="compact" leadingIcon="person-circle">
        Jordan Smith
      </GoabButton>
    </>
  );

  return (
    <div>
      <GoabText tag="h1" mt="m">
        4364: Centre the app header service name
      </GoabText>
      <GoabText tag="p">
        <a href="https://github.com/GovAlta/ui-components/issues/4364">Issue 4364</a>: The
        service name was centred in the space between the logo and utilities, so it
        drifted away from the page centre. It should line up with the centre of each
        header below. The dashed vertical line marks the centre of each header's own box.
        Resize the browser to check the cases. The side menu makes these headers narrower
        than the window, so the names give way sooner than in a full width header; select
        Collapse menu at the bottom left to give them more room.
      </GoabText>

      <GoabText tag="h2">No utilities or phase badge</GoabText>
      <GoabText tag="p">
        The name itself should be centred, with no empty badge gap.
      </GoabText>
      <div className="bug4364-header-preview">
        <GoabAppHeader heading="My benefits" />
      </div>

      <GoabText tag="h2">Two utilities</GoabText>
      <GoabText tag="p">
        The name stays centred while there is room. At narrower widths it moves just
        enough to fit the utilities. Menu appears only when they stop fitting. Resize
        again after it folds to confirm it stays folded, then open Menu.
      </GoabText>
      <div className="bug4364-header-preview">
        <GoabAppHeader heading="My benefits" utilities={utilities} />
      </div>

      <GoabText tag="h2">Phase and secondary text</GoabText>
      <GoabText tag="p">
        The name and Beta badge stay together, with secondary text below the name. Below
        624px they align left, with the badge below the secondary text.
      </GoabText>
      <div className="bug4364-header-preview">
        <GoabAppHeader
          heading="My benefits"
          secondaryText="Manage your benefits"
          phase={<GoabBadge type="information" content="Beta" />}
          utilities={utilities}
        />
      </div>

      <GoabText tag="h2">Long service name with phase and utilities</GoabText>
      <GoabText tag="p">
        A long name gives way because there is not enough room on both sides to keep it
        centred. The name and Alpha badge stay together while the utilities remain visible
        until they stop fitting.
      </GoabText>
      <div className="bug4364-header-preview">
        <GoabAppHeader
          heading="Apply for financial support for a family member"
          phase={<GoabBadge type="important" content="Alpha" />}
          utilities={utilities}
        />
      </div>

      <GoabText tag="h2">One utility on mobile</GoabText>
      <GoabText tag="p">A single utility stays visible without a Menu button.</GoabText>
      <div className="bug4364-header-preview">
        <GoabAppHeader
          heading="My benefits"
          utilities={<a href="#account">Jordan Smith</a>}
        />
      </div>
    </div>
  );
}
