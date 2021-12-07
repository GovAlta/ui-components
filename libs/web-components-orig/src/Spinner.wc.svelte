<svelte:options tag="goa-spinner" />
<!-- Script -->
<script lang="ts">
  import { onMount } from "svelte";

  export let size = "medium"; // medium, small, large
  export let invert = false;

  let spinner: SVGSVGElement;

  $: diameter = {
    small: 16,
    medium: 32,
    large: 64
  }[size];

  $: strokewidth = {
    small: 2,
    medium: 4,
    large: 7
  }[size];

  $: radius = diameter / 2;
  $: pathRadius = radius - strokewidth / 2;

  function getCoords(radians: number): string {
    const x = radius + pathRadius * Math.cos(radians);
    const y = radius + pathRadius * Math.sin(radians);
    return x + ' ' + y;
  }

  function getArc(): string {
    const start = getCoords(Math.PI * 1.5);
    const end = getCoords(0);

    return `M ${start} A ${pathRadius} ${pathRadius} 0 1 0 ${end}`;
  }

  onMount(() => {
    const path = spinner.querySelector("path") as SVGPathElement;
    path.setAttribute("d", getArc());
  });
</script>

<!-- HTML -->
<svg
  bind:this={spinner}
  class="spinner"
  fill="none"
  viewBox="0 0 {diameter} {diameter}"
  width={diameter}
  height={diameter}
  xmlns="http://www.w3.org/2000/svg"
>
  <circle
    cx={radius}
    cy={radius}
    stroke={invert ? "var(--color-blue-600)" : "var(--color-tealblue-100)"}
    stroke-width={strokewidth}
    r={radius - strokewidth / 2}
  />
  <path
    stroke-width={strokewidth}
    stroke={invert ? "var(--color-tealblue-100)" : "var(--color-blue)"}
    stroke-linecap="round"
  />
</svg>

<!-- Style -->
<style>
  @keyframes rotate {
    100% {
      transform: rotate(360deg);
    }
  }
  .spinner {
    animation: rotate 1s linear infinite;
  }
</style>
