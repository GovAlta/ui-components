/**
 * TemporaryNotification Component Configurations
 *
 * Temporary notifications appear briefly to confirm actions.
 * Uses TemporaryNotification controller API from @abgov/ui-components-common.
 * Requires a goa-temp-notification-ctrl container on the page.
 */

import type { ComponentConfigurations } from "./types";

export const temporaryNotificationConfigurations: ComponentConfigurations = {
  componentSlug: "temporary-notification",
  componentName: "Temporary notification",
  defaultConfigurationId: "basic",

  configurations: [
    {
      id: "basic",
      name: "Basic notification",
      description: "Simple temporary message",
      code: {
        react: `<GoabTemporaryNotificationCtrl />

<GoabButton onClick={() => {
  TemporaryNotification.show("You have a notification", {
    type: "basic",
    duration: "short",
  });
}}>Notification</GoabButton>`,
        angular: {
          ts: `import { TemporaryNotification } from "@abgov/ui-components-common";

export class SomeOtherComponent {
  showNotification() {
    TemporaryNotification.show("You have a notification", {
      type: "basic",
      duration: "short",
    });
  }
}`,
          template: `<goab-temporary-notification-ctrl></goab-temporary-notification-ctrl>

<goab-button (onClick)="showNotification()">Notification</goab-button>`,
        },
        webComponents: `<goa-temp-notification-ctrl></goa-temp-notification-ctrl>

<goa-button version="2" id="save-btn">Notification</goa-button>

<script>
  document.getElementById("save-btn").addEventListener("_click", function() {
    document.body.dispatchEvent(new CustomEvent("msg", {
      composed: true, bubbles: true,
      detail: {
        action: "goa:temp-notification",
        data: { message: "You have a notification", type: "basic", uuid: crypto.randomUUID(), duration: "short" }
      }
    }));
  });
</script>`,
      },
    },
    {
      id: "types",
      name: "Notification types",
      description: "All available temporary notification types",
      code: {
        react: `<GoabTemporaryNotificationCtrl />

<GoabButton onClick={() => TemporaryNotification.show("Basic message", { type: "basic" })} mb="xs">Basic</GoabButton>
<GoabButton onClick={() => TemporaryNotification.show("Action completed.", { type: "success" })} mb="xs">Success</GoabButton>
<GoabButton onClick={() => TemporaryNotification.show("Something went wrong.", { type: "failure" })}>Failure</GoabButton>`,
        angular: {
          ts: `import { TemporaryNotification } from "@abgov/ui-components-common";

export class SomeOtherComponent {
  show(message: string, type: "basic" | "success" | "failure") {
    TemporaryNotification.show(message, { type });
  }
}`,
          template: `<goab-temporary-notification-ctrl></goab-temporary-notification-ctrl>

<goab-button (onClick)="show('Basic message', 'basic')" mb="xs">Basic</goab-button>
<goab-button (onClick)="show('Action completed.', 'success')" mb="xs">Success</goab-button>
<goab-button (onClick)="show('Something went wrong.', 'failure')">Failure</goab-button>`,
        },
        webComponents: `<goa-temp-notification-ctrl></goa-temp-notification-ctrl>

<goa-button version="2" id="btn-basic" mb="xs">Basic</goa-button>
<goa-button version="2" id="btn-success" mb="xs">Success</goa-button>
<goa-button version="2" id="btn-failure">Failure</goa-button>

<script>
  function showTempNotification(message, type) {
    document.body.dispatchEvent(new CustomEvent("msg", {
      composed: true, bubbles: true,
      detail: {
        action: "goa:temp-notification",
        data: { message: message, type: type, uuid: crypto.randomUUID(), duration: "short" }
      }
    }));
  }
  document.getElementById("btn-basic").addEventListener("_click", function() { showTempNotification("Basic message", "basic"); });
  document.getElementById("btn-success").addEventListener("_click", function() { showTempNotification("Action completed.", "success"); });
  document.getElementById("btn-failure").addEventListener("_click", function() { showTempNotification("Something went wrong.", "failure"); });
</script>`,
      },
    },
    {
      id: "with-progress",
      name: "Progress and indeterminate",
      description:
        "Notifications for loading states (note: progress and indeterminate types may have rendering issues)",
      code: {
        react: `<GoabTemporaryNotificationCtrl />

<GoabButton onClick={() => {
  const uuid = TemporaryNotification.show("Uploading file...", { type: "progress" });
  TemporaryNotification.setProgress(uuid, 65);
}} mb="xs">Progress</GoabButton>
<GoabButton onClick={() => {
  TemporaryNotification.show("Processing your request...", { type: "indeterminate" });
}}>Indeterminate</GoabButton>`,
        angular: {
          ts: `import { TemporaryNotification } from "@abgov/ui-components-common";

export class SomeOtherComponent {
  showProgress() {
    const uuid = TemporaryNotification.show("Uploading file...", { type: "progress" });
    TemporaryNotification.setProgress(uuid, 65);
  }

  showIndeterminate() {
    TemporaryNotification.show("Processing your request...", { type: "indeterminate" });
  }
}`,
          template: `<goab-temporary-notification-ctrl></goab-temporary-notification-ctrl>

<goab-button (onClick)="showProgress()" mb="xs">Progress</goab-button>
<goab-button (onClick)="showIndeterminate()">Indeterminate</goab-button>`,
        },
        webComponents: `<goa-temp-notification-ctrl></goa-temp-notification-ctrl>

<goa-button version="2" id="progress-btn" mb="xs">Progress</goa-button>
<goa-button version="2" id="indeterminate-btn">Indeterminate</goa-button>

<script>
  document.getElementById("progress-btn").addEventListener("_click", function() {
    document.body.dispatchEvent(new CustomEvent("msg", {
      composed: true, bubbles: true,
      detail: { action: "goa:temp-notification", data: { message: "Uploading file...", type: "progress", progress: 65, uuid: crypto.randomUUID() } }
    }));
  });
  document.getElementById("indeterminate-btn").addEventListener("_click", function() {
    document.body.dispatchEvent(new CustomEvent("msg", {
      composed: true, bubbles: true,
      detail: { action: "goa:temp-notification", data: { message: "Processing your request...", type: "indeterminate", uuid: crypto.randomUUID() } }
    }));
  });
</script>`,
      },
    },
  ],
};
