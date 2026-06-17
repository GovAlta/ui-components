import { GoabTab, GoabTabs, GoabText } from "@abgov/react-components";

export function Bug3665Route() {
  return (
    <div>
      <GoabText tag="h1" mt="m" mb="m">
        Bug #3665: Tabs page jumps when switching tabs
      </GoabText>
      <GoabText tag="p" mb="l">
        Switching tabs should not move the viewport. Previously, setCurrentTab() called
        el.focus() on the selected tab, which triggered the browser's scroll-into-view
        behavior and jumped the page. To reproduce the old behavior: scroll down so the
        tabs are partially visible, then switch the framework tab. The page should now
        stay in place.
      </GoabText>

      {/* Tall spacer so the tabs sit below the fold and a jump would be obvious. */}
      <div
        style={{
          height: "80vh",
          display: "flex",
          alignItems: "flex-end",
        }}
      >
        <GoabText tag="p">Scroll down to the tabs below.</GoabText>
      </div>

      <GoabTabs>
        <GoabTab heading="React">
          <div style={{ height: "60vh" }}>
            <GoabText tag="p">React content. Switch to Angular or Web Components.</GoabText>
          </div>
        </GoabTab>
        <GoabTab heading="Angular">
          <div style={{ height: "60vh" }}>
            <GoabText tag="p">Angular content. The page should not jump.</GoabText>
          </div>
        </GoabTab>
        <GoabTab heading="Web Components">
          <div style={{ height: "60vh" }}>
            <GoabText tag="p">Web Components content. The page should not jump.</GoabText>
          </div>
        </GoabTab>
      </GoabTabs>
    </div>
  );
}

export default Bug3665Route;
