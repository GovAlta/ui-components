<svelte:options customElement="goa-spinner" />

<script lang="ts" context="module">
  export type SpinnerSize = "small" | "medium" | "large" | "xlarge";
  export type SpinnerType = "infinite" | "progress";
</script>

<!-- Script -->
<script lang="ts">
  import { tweened } from "svelte/motion";
  import { quartOut } from "svelte/easing";

  // required
  export let size: SpinnerSize;

  // optional
  export let invert: boolean = false;
  export let progress: number = -1;
  export let testid: string = "";

  let type: SpinnerType = "infinite";

  const _progress = tweened(0, {
    duration: 500,
    easing: quartOut,
  });

  // Reactive

  $: {
    // Typescript recognizes `progress` as a number, but once compiled, due to it being a web component, progress is a string.
    // This line makes both sides happy.
    const p = parseFloat(progress + "");

    if (p >= 0) {
      _progress.set(p || 1); // start at 1 to prevent incorrect arc calculations
      type = "progress";
    }
  }

  $: diameter =
    size &&
    {
      small: 16,
      medium: 32,
      large: 64,
      xlarge: 100,
    }[size];

  $: strokewidth =
    size &&
    {
      small: 2,
      medium: 4,
      large: 7,
      xlarge: 9,
    }[size];

  $: radius = diameter / 2;
  $: pathRadius = radius - strokewidth / 2;

  $: ready = type === "infinite" ? pathRadius : pathRadius && progress;

  // Functions

  function getCoords(radians: number): string {
    const x = radius + pathRadius * Math.cos(radians);
    const y = radius + pathRadius * Math.sin(radians);
    return x + " " + y;
  }

  function getArc(progress: number): string {
    switch (type) {
      case "progress": {
        const start = getCoords(-Math.PI / 2);
        const end = getCoords(-Math.PI / 2 + 2 * Math.PI * (progress / 100));
        const largeArcFlag = progress % 100 < 50 ? 0 : 1;

        return `M ${start} A ${pathRadius} ${pathRadius} 0 ${largeArcFlag} 1 ${end}`;
      }
      case "infinite": {
        const start = getCoords(Math.PI * 1.5);
        const end = getCoords(0);

        return `M ${start} A ${pathRadius} ${pathRadius} 0 1 0 ${end}`;
      }
    }
  }
</script>

<!-- HTML -->
{#if ready}
  <svg
    class={`spinner-${type}`}
    fill="none"
    viewBox="0 0 {diameter} {diameter}"
    width={diameter}
    height={diameter}
    data-testid={testid}
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle
      cx={radius}
      cy={radius}
      stroke={invert
        ? "var(--goa-color-info-hover)"
        : "var(--goa-color-brand-light)"}
      stroke-width={strokewidth}
      r={radius - strokewidth / 2}
    />
    <path
      d={getArc($_progress)}
      stroke-width={strokewidth}
      stroke={invert
        ? "var(--goa-color-brand-light)"
        : "var(--goa-color-info-default)"}
      stroke-linecap="round"
    />
  </svg>
{/if}

<!-- Style -->
<style>
  :host {
    box-sizing: border-box;
    font-family: var(--goa-font-family-sans);
  }
  @keyframes rotate {
    100% {
      transform: rotate(360deg);
    }
  }
  .spinner-infinite {
    animation: rotate 2s linear infinite;
  }
</style>
