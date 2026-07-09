import {
  GoabAppHeader,
  GoabAppHeaderMenu,
  GoabBadge,
  GoabBlock,
  GoabButton,
  GoabContainer,
  GoabHeroBanner,
  GoabMenuAction,
  GoabMenuButton,
  GoabOneColumnLayout,
  GoabPageBlock,
  GoabSideMenu,
  GoabSideMenuGroup,
  GoabSideMenuHeading,
  GoabText,
} from "@abgov/react-components";
import { useState } from "react";

const heroActions = (
  <>
    <GoabButton type="primary">Get started</GoabButton>
    <GoabButton type="secondary">Secondary CTA</GoabButton>
  </>
);

const bannerSlot = (
  <GoabText tag="span" size="body-xs" maxWidth="100%">
    v2.3.1 | PR Environment
  </GoabText>
);

const phaseSlot = <GoabBadge type="important" content="Service preview" />;

const navigationSlot = (
  <>
    <a href="#">Dashboard</a>
    <GoabAppHeaderMenu heading="Applications">
      <a href="#">New application</a>
      <a href="#">Active</a>
      <a href="#">Archived</a>
    </GoabAppHeaderMenu>
    <a href="#">Help</a>
  </>
);

const largeNavigationSlot = (
  <>
    <a href="#">Dashboard</a>
    <GoabAppHeaderMenu heading="Applications">
      <a href="#">New application</a>
      <a href="#">Active</a>
      <a href="#">Archived</a>
    </GoabAppHeaderMenu>
    <a href="#">Reports</a>
    <a href="#">Settings</a>
    <a href="#">File</a>
    <a href="#">Edit</a>
    <a href="#">View</a>
    <a href="#">Search</a>
    <a href="#">Filter</a>
    <a href="#">Help</a>
  </>
);

const largeUtilitiesSlot = (
  <>
    <GoabButton type="tertiary" size="compact">
      Help
    </GoabButton>
    <GoabButton type="tertiary" size="compact" leadingIcon="person">
      Sign in
    </GoabButton>
    <GoabButton type="tertiary" size="compact">
      User settings
    </GoabButton>
    <GoabButton size="compact">Sign out</GoabButton>
  </>
);

function PageContent() {
  return (
    <>
      <GoabHeroBanner
        heading="Hero banner"
        backgroundUrl="https://picsum.photos/1200/400?random=3"
        actions={heroActions}
      >
        <GoabText tag="p" size="body-l">
          Hero banner demonstrates background imagery and projected actions.
        </GoabText>
      </GoabHeroBanner>
      <GoabBlock direction="row" gap="l" mt="m">
        <GoabSideMenu>
          <GoabSideMenuHeading>Menu heading</GoabSideMenuHeading>
          <GoabSideMenuGroup heading="Group one">
            <a href="#">Link A</a>
            <a href="#">Link B</a>
          </GoabSideMenuGroup>
          <a href="#">Loose link</a>
        </GoabSideMenu>
        <GoabPageBlock width="full">
          <GoabText tag="p" size="body-m">
            Content area with side menu demonstrates layout wrappers.
          </GoabText>
        </GoabPageBlock>
      </GoabBlock>
    </>
  );
}

export function Bug3762Route() {
  const [isSignedIn, setIsSignedIn] = useState(false);

  const signedInUtilitiesSlot = (
    <>
      <GoabButton type="tertiary" size="compact">
        Help
      </GoabButton>
      <GoabMenuButton
        text="John Smith"
        type="tertiary"
        size="compact"
        onAction={() => setIsSignedIn(false)}
      >
        <GoabMenuAction text="User settings" action="user-settings" />
        <GoabMenuAction text="Sign out" action="sign-out" />
      </GoabMenuButton>
    </>
  );

  const signedOutUtilitiesSlot = (
    <>
      <GoabButton type="tertiary" size="compact">
        Help
      </GoabButton>
      <GoabButton
        type="tertiary"
        size="compact"
        leadingIcon="person"
        onClick={() => setIsSignedIn(true)}
      >
        Sign in
      </GoabButton>
    </>
  );

  return (
    <>
      <h1>3762 AppHeader named slot APIs</h1>
      <GoabContainer type="interactive" padding="relaxed">
        <GoabText tag="h3" size="heading-s">
          Dynamic utilities
        </GoabText>
        <GoabOneColumnLayout>
          <GoabAppHeader
            heading="Example 1"
            navigation={navigationSlot}
            utilities={isSignedIn ? signedInUtilitiesSlot : signedOutUtilitiesSlot}
            phase={phaseSlot}
            banner={bannerSlot}
          />
          <PageContent />
        </GoabOneColumnLayout>
      </GoabContainer>

      <hr />

      <h1>AppHeader named slot APIs with overflow content</h1>
      <GoabContainer type="interactive" padding="relaxed">
        <GoabText tag="h3" size="heading-s">
          Site chrome
        </GoabText>
        <GoabOneColumnLayout>
          <GoabAppHeader
            heading="Example 2"
            navigation={largeNavigationSlot}
            utilities={largeUtilitiesSlot}
            phase={phaseSlot}
            banner={bannerSlot}
          />
          <PageContent />
        </GoabOneColumnLayout>
      </GoabContainer>

      <hr />

      <h1>Legacy direct slot usage</h1>
      <GoabContainer type="interactive" padding="relaxed">
        <GoabAppHeader heading="Example 3">
          <a slot="navigation" href="#">
            Dashboard
          </a>
          <GoabAppHeaderMenu slotName="navigation" heading="Applications">
            <a href="#">New application</a>
            <a href="#">Active</a>
            <a href="#">Archived</a>
          </GoabAppHeaderMenu>
          <a slot="navigation" href="#">
            Reports
          </a>
          <div slot="utilities">
            <GoabButton type="tertiary" size="compact">
              Help
            </GoabButton>
          </div>
          <div slot="utilities">
            <GoabMenuButton text="John Smith" type="tertiary" size="compact">
              <GoabMenuAction text="User settings" action="user-settings" />
              <GoabMenuAction text="Sign out" action="sign-out" />
            </GoabMenuButton>
          </div>
        </GoabAppHeader>
      </GoabContainer>
    </>
  );
}
