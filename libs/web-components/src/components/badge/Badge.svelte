<svelte:options customElement="goa-badge" />

<!-- Script -->
<script lang="ts">
  import { onMount } from "svelte";
  import type { Spacing } from "../../common/styling";
  import { calculateMargin } from "../../common/styling";
  import { typeValidator, toBoolean } from "../../common/utils";
  import type { GoAIconType } from "../icon/Icon.svelte";


  // Validators
  const [Types, validateType] = typeValidator(
    "Badge type",
    [
      "information",
      "important",
      "emergency",
      "success",
      "dark",
      "midtone",
      "light",
      "archived",
      "aqua",
      "black",
      "blue",
      "green",
      "orange",
      "pink",
      "red",
      "violet",
      "white",
      "yellow",
      "aqua-light",
      "black-light",
      "blue-light",
      "green-light",
      "orange-light",
      "pink-light",
      "red-light",
      "violet-light",
      "yellow-light",
      "sky",
      "prairie",
      "lilac",
      "pasture",
      "sunset",
      "dawn",
      "default",
    ],
    true,
  );

  const [badgeSizes, validateBadgeSize] = typeValidator("Badge size", [
    "medium",
    "large",
  ]);

  const [versions, validateVersion] = typeValidator("Badge version", [
    "1",
    "2",
  ]);

  const [emphasisLevels, validateEmphasisLevel] = typeValidator(
    "Badge emphasis level",
    ["subtle", "strong"],
  );

  //Type
  type BadgeType = (typeof Types)[number];
  type BadgeSize = (typeof badgeSizes)[number];
  type BadgeVersion = (typeof versions)[number];

  export let type: BadgeType;

  // optional
  export let testid: string = "";
  export let content: string = "";
  export let icon: string = "";
  export let icontype: GoAIconType | null = null;
  export let arialabel: string = "";
  export let size: BadgeSize = "medium";
  export let emphasis: (typeof emphasisLevels)[number] = "strong";
  export let version: BadgeVersion = "1";

  // margin
  export let mt: Spacing = null;
  export let mr: Spacing = null;
  export let mb: Spacing = null;
  export let ml: Spacing = null;

  // private
  // Show icon unless explicitly disabled, when either icon=true or icontype is provided
  $: showIcon = icon !== "false" && (toBoolean(icon) || !!icontype);
  $: showIconOnly = showIcon && !content;

  $: _defaultIconType = {
    success: "checkmark-circle",
    important: "alert-circle",
    information: "information-circle",
    emergency: "warning",
    dark: "information-circle",
    midtone: "information-circle",
    light: "information-circle",
    archived: "information-circle",
    aqua: "information-circle",
    black: "information-circle",
    blue: "information-circle",
    green: "information-circle",
    orange: "information-circle",
    pink: "information-circle",
    red: "information-circle",
    violet: "information-circle",
    white: "information-circle",
    yellow: "information-circle",
    "aqua-light": "information-circle",
    "black-light": "information-circle",
    "blue-light": "information-circle",
    "green-light": "information-circle",
    "orange-light": "information-circle",
    "pink-light": "information-circle",
    "red-light": "information-circle",
    "violet-light": "information-circle",
    "yellow-light": "information-circle",
    sky: "information-circle",
    prairie: "information-circle",
    lilac: "information-circle",
    pasture: "information-circle",
    sunset: "information-circle",
    dawn: "information-circle",
    default: "information-circle",
  }[type];

  onMount(() => {
    validateType(type);
    validateBadgeSize(size);
    validateEmphasisLevel(emphasis);
    validateVersion(version);

    if (!showIcon && !content) {
      console.warn(
        "GoabBadge must have either the content or icon property set",
      );
    }
    if (showIconOnly && !arialabel) {
      console.warn("GoabBadge with icon only requires an arialabel");
    }
  });
</script>

<!-- HTML -->
<div
  style={calculateMargin(mt, mr, mb, ml)}
  data-testid={testid}
  data-type="goa-badge"
  class="goa-badge badge-{type} badge-{size} badge-{emphasis}"
  class:icon-only={showIconOnly}
  class:v2={version === "2"}
>
  {#if showIcon}
    <goa-icon
      arialabel={showIconOnly && arialabel ? arialabel : null}
      role={showIconOnly && arialabel ? "presentation" : null}
      type={icontype || _defaultIconType}
      size={size === "large" ? "3" : "1"}
    />
  {:else}
    <div class="goa-badge-no-icon"></div>
  {/if}
  {#if content}
    <div class="goa-badge-content">
      {content}
    </div>
  {/if}
</div>

<!-- Style -->
<style>
  :host {
    box-sizing: border-box;
    font-family: var(--goa-font-family-sans);
    height: var(--goa-badge-height);
  }

  .goa-badge {
    display: inline-flex;
    height: var(--goa-badge-height);
    width: auto;
    vertical-align: top;
    align-items: center;
    border-radius: var(--goa-badge-border-radius);
    padding: var(--goa-badge-padding);
    gap: var(--goa-badge-gap);
    font-weight: var(--goa-font-weight-regular);
    box-shadow: var(--goa-badge-border); /* inner shadow - new style */
  }

  .icon-only {
    padding: 0 3px;
  }

  .goa-badge-no-icon {
    margin-left: -0.25rem;
  }

  .goa-badge-content {
    font-size: var(--goa-badge-font-size);
    line-height: var(--goa-badge-line-height);
    white-space: nowrap;
    padding-bottom: 3px; /* acumin font requires this to allow for vertical alignment  */
  }

  .goa-badge.badge-information {
    background-color: var(--goa-badge-info-color-bg);
    color: var(--goa-badge-info-color-content);
  }

  .goa-badge.badge-success {
    background-color: var(--goa-badge-success-color-bg);
    color: var(--goa-badge-success-color-content);
  }

  .goa-badge.badge-important {
    background-color: var(--goa-badge-important-color-bg);
    color: var(--goa-badge-important-color-content);
  }

  .goa-badge.badge-emergency {
    background-color: var(--goa-badge-emergency-color-bg);
    color: var(--goa-badge-emergency-color-content);
  }

  .goa-badge.badge-dark {
    background-color: var(--goa-badge-dark-color-bg);
    color: var(--goa-badge-dark-color-content);
  }

  .goa-badge.badge-midtone {
    background-color: var(--goa-badge-midtone-color-bg);
    color: var(--goa-badge-midtone-color-content);
  }

  .goa-badge.badge-light {
    background-color: var(--goa-badge-light-color-bg);
    color: var(--goa-badge-light-color-content);
  }

  .goa-badge.badge-archived {
    background-color: var(
      --goa-badge-archived-color-bg,
      var(--goa-color-greyscale-700)
    );
    color: var(
      --goa-badge-archived-color-content,
      var(--goa-badge-dark-color-content)
    );
  }

  .goa-badge.badge-aqua {
    background-color: var(--goa-color-extended-aqua);
    color: var(--goa-color-text-default);
  }

  .goa-badge.badge-black {
    background-color: var(--goa-color-greyscale-black);
    color: var(--goa-badge-dark-color-content);
  }

  .goa-badge.badge-blue {
    background-color: var(--goa-color-extended-blue);
    color: var(--goa-color-text-default);
  }

  .goa-badge.badge-green {
    background-color: var(--goa-color-extended-green);
    color: var(--goa-color-text-default);
  }

  .goa-badge.badge-orange {
    background-color: var(--goa-color-extended-orange);
    color: var(--goa-color-text-default);
  }

  .goa-badge.badge-pink {
    background-color: var(--goa-color-extended-pink);
    color: var(--goa-color-text-default);
  }

  .goa-badge.badge-red {
    background-color: var(--goa-color-extended-red);
    color: var(--goa-color-text-default);
  }

  .goa-badge.badge-violet {
    background-color: var(--goa-color-extended-violet);
    color: var(--goa-color-text-default);
  }

  .goa-badge.badge-white {
    background-color: var(--goa-color-greyscale-white);
    color: var(--goa-badge-light-color-content);
  }

  .goa-badge.badge-yellow {
    background-color: var(--goa-color-extended-yellow);
    color: var(--goa-badge-light-color-content);
  }

  .goa-badge.badge-aqua-light {
    background-color: var(--goa-color-extended-light-aqua);
    color: var(--goa-badge-light-color-content);
  }

  .goa-badge.badge-black-light {
    background-color: var(--goa-color-greyscale-150);
    color: var(--goa-badge-light-color-content);
  }

  .goa-badge.badge-blue-light {
    background-color: var(--goa-color-extended-light-blue);
    color: var(--goa-badge-light-color-content);
  }

  .goa-badge.badge-green-light {
    background-color: var(--goa-color-extended-light-green);
    color: var(--goa-badge-light-color-content);
  }

  .goa-badge.badge-orange-light {
    background-color: var(--goa-color-extended-light-orange);
    color: var(--goa-badge-light-color-content);
  }

  .goa-badge.badge-pink-light {
    background-color: var(--goa-color-extended-light-pink);
    color: var(--goa-badge-light-color-content);
  }

  .goa-badge.badge-red-light {
    background-color: var(--goa-color-extended-light-red);
    color: var(--goa-badge-light-color-content);
  }

  .goa-badge.badge-violet-light {
    background-color: var(--goa-color-extended-light-violet);
    color: var(--goa-badge-light-color-content);
  }

  .goa-badge.badge-yellow-light {
    background-color: var(--goa-color-extended-light-yellow);
    color: var(--goa-badge-light-color-content);
  }

  .v2 .goa-badge-content {
    padding-bottom: 0;
  }

  /* Version 2: Default Colours */
  .v2.badge-default {
    background-color: var(--goa-badge-default-color-bg);
    color: var(--goa-badge-default-color-content);
  }

  .v2.badge-default.badge-subtle {
    background-color: var(--goa-badge-default-subtle-color-bg);
    box-shadow: var(--goa-badge-default-subtle-border);
    color: var(--goa-badge-default-subtle-color-content);
  }

  .v2.goa-badge.badge-archived.badge-subtle {
    background-color: var(--goa-badge-archived-subtle-color-bg);
    box-shadow: var(--goa-badge-archived-subtle-border);
    color: var(--goa-badge-archived-subtle-color-content);
  }

  /* Version 2: Extended Colours */

  .v2.badge-sky {
    background-color: var(--goa-color-extended-sky-default);
    color: var(--goa-color-extended-sky-text);
  }

  .v2.badge-prairie {
    background-color: var(--goa-color-extended-prairie-default);
    color: var(--goa-color-extended-prairie-text);
  }

  .v2.badge-lilac {
    background-color: var(--goa-color-extended-lilac-default);
    color: var(--goa-color-extended-lilac-text);
  }

  .v2.badge-pasture {
    background-color: var(--goa-color-extended-pasture-default);
    color: var(--goa-color-extended-pasture-text);
  }

  .v2.badge-sunset {
    background-color: var(--goa-color-extended-sunset-default);
    color: var(--goa-color-extended-sunset-text);
  }

  .v2.badge-dawn {
    background-color: var(--goa-color-extended-dawn-default);
    color: var(--goa-color-extended-dawn-text);
  }

  .v2.badge-subtle.badge-sky {
    background-color: var(--goa-color-extended-sky-light);
    box-shadow: var(--goa-color-extended-sky-subtle-border);
    color: var(--goa-color-extended-sky-text);
  }

  .v2.badge-subtle.badge-prairie {
    background-color: var(--goa-color-extended-prairie-light);
    box-shadow: var(--goa-color-extended-prairie-subtle-border);
    color: var(--goa-color-extended-prairie-text);
  }

  .v2.badge-subtle.badge-lilac {
    background-color: var(--goa-color-extended-lilac-light);
    box-shadow: var(--goa-color-extended-lilac-subtle-border);
    color: var(--goa-color-extended-lilac-text);
  }

  .v2.badge-subtle.badge-pasture {
    background-color: var(--goa-color-extended-pasture-light);
    box-shadow: var(--goa-color-extended-pasture-subtle-border);
    color: var(--goa-color-extended-pasture-text);
  }

  .v2.badge-subtle.badge-sunset {
    background-color: var(--goa-color-extended-sunset-light);
    box-shadow: var(--goa-color-extended-sunset-subtle-border);
    color: var(--goa-color-extended-sunset-text);
  }

  .v2.badge-subtle.badge-dawn {
    background-color: var(--goa-color-extended-dawn-light);
    box-shadow: var(--goa-color-extended-dawn-subtle-border);
    color: var(--goa-color-extended-dawn-text);
  }

  /* Version 2: Subtle emphasis for standard colours */

  .v2.goa-badge.badge-subtle.badge-information {
    background-color: var(--goa-badge-info-subtle-color-bg);
    color: var(--goa-badge-info-subtle-color-content);
    box-shadow: var(--goa-badge-info-subtle-border);
  }

  .v2.goa-badge.badge-subtle.badge-success {
    background-color: var(--goa-badge-success-subtle-color-bg);
    color: var(--goa-badge-success-subtle-color-content);
    box-shadow: var(--goa-badge-success-subtle-border);
  }

  .v2.goa-badge.badge-subtle.badge-important {
    background-color: var(--goa-badge-important-subtle-color-bg);
    color: var(--goa-badge-important-subtle-color-content);
    box-shadow: var(--goa-badge-important-subtle-border);
  }

  .v2.goa-badge.badge-subtle.badge-emergency {
    background-color: var(--goa-badge-emergency-subtle-color-bg);
    color: var(--goa-badge-emergency-subtle-color-content);
    box-shadow: var(--goa-badge-emergency-subtle-border);
  }

  /* Version 2: Large size */

  .v2.goa-badge.badge-large {
    height: var(--goa-badge-height-large);
    padding: var(--goa-badge-padding-large);
    --goa-icon-size: var(--goa-badge-icon-size-large);
  }

  .v2.goa-badge.badge-large .goa-badge-content {
    font-size: var(--goa-badge-font-size-large);
    line-height: var(--goa-badge-line-height-large);
  }
</style>
