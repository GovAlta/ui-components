import {
  GoabAppHeader,
  GoabAppHeaderMenu,
  GoabBlock,
  GoabButton,
  GoabOneColumnLayout,
  GoabContainer,
  GoabHeroBanner,
  GoabMenuAction,
  GoabMenuButton,
  GoabPageBlock,
  GoabSideMenu,
  GoabSideMenuGroup,
  GoabSideMenuHeading,
  GoabText,
  GoabBadge,
} from "@abgov/react-components";

const heroActions = (
  <>
    <GoabButton type="primary">Get started</GoabButton>
    <GoabButton type="secondary">Secondary CTA</GoabButton>
  </>
);

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

const bigNavigationSlot = (
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

const navigationSlot2 = (
  <>
    <a href="#">Nav 1</a>
    <GoabAppHeaderMenu heading="Nav Menu">
      <a href="#">Nav Menu 1</a>
      <a href="#">Nav Menu 2</a>
      <a href="#">Nav Menu 3</a>
    </GoabAppHeaderMenu>
  </>
);

const utilitiesSlot = (
  <>
    <GoabButton type="tertiary" size="compact">
      Help
    </GoabButton>
    <GoabMenuButton text="John Smith" type="tertiary" size="compact">
      <GoabMenuAction text="User settings" action="user-settings" />
      <GoabMenuAction text="Sign out" action="sign-out" />
    </GoabMenuButton>
  </>
);

const bigUtilitiesSlot = (
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

const bannerSlot = (
  <GoabText tag="span" size="body-xs" maxWidth="100%">
    v2.3.1 | PR Environment
  </GoabText>
);

export function Bug3762Route() {
  return (
    <>
      <div>
        <h1>3762 AppHeader examples using slot property</h1>
      </div>
      <GoabContainer type="interactive" padding="relaxed">
        <GoabText tag="h3" size="heading-s">
          Site chrome
        </GoabText>
        <GoabOneColumnLayout>
          <GoabAppHeader
            heading="Example 1"
            navigation={navigationSlot}
            utilities={utilitiesSlot}
            phase={<GoabBadge type="important" content="Service preview" />}
            banner={bannerSlot}
          ></GoabAppHeader>
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
        </GoabOneColumnLayout>
      </GoabContainer>

      <hr />

      <div>
        <h1>3762 AppHeader examples using slot property and big Utilities</h1>
      </div>
      <GoabContainer type="interactive" padding="relaxed">
        <GoabText tag="h3" size="heading-s">
          Site chrome
        </GoabText>
        <GoabOneColumnLayout>
          <GoabAppHeader
            heading="Example 2"
            navigation={bigNavigationSlot}
            utilities={bigUtilitiesSlot}
            phase={<GoabBadge type="important" content="Service preview" />}
            banner={bannerSlot}
          ></GoabAppHeader>
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
        </GoabOneColumnLayout>
      </GoabContainer>

      <hr />

      <h1>AppHeader examples using slot property (Legacy)</h1>
      <p>Ensure the fix did not break old/legacy examples using slot</p>
      <GoabContainer type="interactive" padding="relaxed">
        <GoabText tag="h3" size="heading-s">
          Site chrome
        </GoabText>
        <GoabOneColumnLayout>
          <GoabAppHeader heading="Example 3">
            <a href="#">Home</a>
            <GoabAppHeaderMenu heading="Menu">
              <a href="#">Item 1</a>
              <a href="#">Item 2</a>
            </GoabAppHeaderMenu>
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
            <a slot="navigation" href="#">
              Settings
            </a>
            <div slot="utilities">
              <GoabBlock alignment="center" direction="row" gap="m">
                <GoabButton type="tertiary" size="compact">
                  Help
                </GoabButton>
                <GoabMenuButton text="John Smith" type="tertiary" size="compact">
                  <GoabMenuAction text="User settings" action="user-settings" />
                  <GoabMenuAction text="Sign out" action="sign-out" />
                </GoabMenuButton>
              </GoabBlock>
            </div>
          </GoabAppHeader>
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
        </GoabOneColumnLayout>
      </GoabContainer>

      <hr />

      <h1>AppHeader examples using slot property (Legacy - big utilities)</h1>
      <p>Ensure the fix did not break old/legacy examples using slot</p>
      <GoabContainer type="interactive" padding="relaxed">
        <GoabText tag="h3" size="heading-s">
          Site chrome
        </GoabText>
        <GoabOneColumnLayout>
          <GoabAppHeader heading="Example 4">
            <a slot="navigation" href="#">
              Home
            </a>
            <div slot="utilities">
              <GoabButton type="tertiary" size="compact">
                Help
              </GoabButton>
            </div>
            <div slot="utilities">
              <GoabButton type="tertiary" size="compact">
                Sign in
              </GoabButton>
            </div>
            <div slot="utilities">
              <GoabMenuButton text="John Smith" type="tertiary" size="compact">
                <GoabMenuAction text="User settings" action="user-settings" />
                <GoabMenuAction text="Sign out" action="sign-out" />
              </GoabMenuButton>
            </div>
          </GoabAppHeader>
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
        </GoabOneColumnLayout>
      </GoabContainer>

      <h1>AppHeader example mixing slot and navigation prop</h1>
      <p>
        This is to demonstrate what happens when both slot and navigation prop are used
        together.
      </p>
      <p>
        <strong>Expectation:</strong> The two should be combined, one should not overwrite
        the other.
      </p>
      <GoabContainer type="interactive" padding="relaxed">
        <GoabAppHeader heading="Combined Slot Test" navigation={navigationSlot2}>
          <a slot="navigation" href="#">
            Slot 1
          </a>
          <GoabAppHeaderMenu slotName="navigation" heading="Slot Navigation">
            <a href="#">Slot Nav 1</a>
            <a href="#">Slot Nav 2</a>
            <a href="#">Slot Nav 3</a>
          </GoabAppHeaderMenu>
        </GoabAppHeader>
      </GoabContainer>
    </>
  );
}
