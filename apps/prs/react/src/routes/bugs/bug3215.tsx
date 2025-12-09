import {
  GoabButton,
  GoabButtonGroup,
  GoabText,
  GoabDrawer,
} from "@abgov/react-components";
import { useState } from "react";

export function Bug3215Route() {
  const [rightDrawerOpen, setRightDrawerOpen] = useState<boolean>(false);
  const [bottomDrawerOpen, setBottomDrawerOpen] = useState<boolean>(false);

  const drawerActionsRight = (
    <GoabButtonGroup alignment="end" gap="relaxed">
      <GoabButton type="secondary" onClick={() => closeRightDrawer()}>
        Cancel
      </GoabButton>
      <GoabButton type="primary" onClick={() => closeRightDrawer()}>
        Save
      </GoabButton>
    </GoabButtonGroup>
  );

  const drawerActionsBottom = (
    <GoabButtonGroup alignment="end" gap="relaxed">
      <GoabButton type="secondary" onClick={() => closeBottomDrawer()}>
        Cancel
      </GoabButton>
      <GoabButton type="primary" onClick={() => closeBottomDrawer()}>
        Save
      </GoabButton>
    </GoabButtonGroup>
  );

  const drawerContent = (
    <div>
      <p>
        Use the buttons below to close this right-positioned drawer. The content area
        stretches to fill the available vertical space for layout testing.
      </p>
      <GoabText tag="h4">Review checklist</GoabText>
      <ul>
        <li>Confirm scope alignment</li>
        <li>Validate stakeholder sign-offs</li>
        <li>Verify accessibility and QA coverage</li>
      </ul>
      <p>
        This panel expands to the full viewport height so you can test scrolling and
        layout behavior. Add or remove content here to simulate different drawer payloads.
      </p>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus.
        Suspendisse lectus tortor, dignissim sit amet, adipiscing nec, ultricies sed,
        dolor.
      </p>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus.
        Suspendisse lectus tortor, dignissim sit amet, adipiscing nec, ultricies sed,
        dolor.
      </p>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus.
        Suspendisse lectus tortor, dignissim sit amet, adipiscing nec, ultricies sed,
        dolor.
      </p>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus.
        Suspendisse lectus tortor, dignissim sit amet, adipiscing nec, ultricies sed,
        dolor.
      </p>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus.
        Suspendisse lectus tortor, dignissim sit amet, adipiscing nec, ultricies sed,
        dolor.
      </p>
    </div>
  );

  const openRightDrawer = () => {
    setRightDrawerOpen(true);
  };

  const openBottomDrawer = () => {
    setBottomDrawerOpen(true);
  };

  const closeRightDrawer = () => {
    setRightDrawerOpen(false);
  };

  const closeBottomDrawer = () => {
    setBottomDrawerOpen(false);
  };

  return (
    <main>
      <GoabButtonGroup alignment="start">
        <GoabButton type="primary" onClick={() => openRightDrawer()}>
          Open Drawer (Right)
        </GoabButton>
        <GoabButton type="secondary" onClick={() => openBottomDrawer()}>
          Open Drawer (Bottom)
        </GoabButton>
      </GoabButtonGroup>

      <GoabDrawer
        open={rightDrawerOpen}
        position="right"
        heading="Project Review Panel"
        actions={drawerActionsRight}
        maxSize="400px"
        onClose={() => closeRightDrawer()}
      >
        {drawerContent}
      </GoabDrawer>

      <GoabDrawer
        open={bottomDrawerOpen}
        position="bottom"
        heading="Project Review Panel"
        actions={drawerActionsBottom}
        maxSize="400px"
        onClose={() => closeBottomDrawer()}
      >
        {drawerContent}
      </GoabDrawer>
    </main>
  );
}
