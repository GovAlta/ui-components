<svelte:options tag="goa-spinner" />

<script lang="ts" context="module">
  export type SpinnerSize = "small" | "medium" | "large";
  export type SpinnerType = "infinite" | "progress";
</script>

<!-- Script -->
<script lang="ts">
  import { onMount } from "svelte";
  // import { tweened } from 'svelte/motion';
	// import { cubicOut } from 'svelte/easing';

  export let size: SpinnerSize = "medium";
  export let invert = false;
  export let type: SpinnerType = "infinite";
  export let progress = "0";

  let path: SVGPathElement;
  let spinner: SVGSVGElement;

  $: {
    const p = parseFloat(progress) % 100 + 0.99;
    path?.setAttribute("d", getArc(p));
  }

  $: diameter = {
    small: 16,
    medium: 32,
    large: 64,
    xlarge: 100,
  }[size];

  $: strokewidth = {
    small: 2,
    medium: 4,
    large: 7,
    xlarge: 9,
  }[size];

  $: radius = diameter / 2;
  $: pathRadius = radius - strokewidth / 2;

  onMount(() => {
    path = spinner.querySelector("path") as SVGPathElement;
    path.setAttribute("d", getArc(parseFloat(progress)));
  });

	// const _progress = tweened(1, {
	// 	duration: 300,
	// 	easing: cubicOut
	// });

  function getCoords(radians: number): string {
    const x = radius + pathRadius * Math.cos(radians);
    const y = radius + pathRadius * Math.sin(radians);
    return x + ' ' + y;
  }

  function getArc(progress: number): string {
    if (type === "progress") {
      const start = getCoords(-Math.PI / 2);
      const end = getCoords(-Math.PI / 2 + 2 * Math.PI * progress / 100);
      if (progress < 50) {
        return `M ${start} A ${pathRadius} ${pathRadius} 0 0 1 ${end}`;
      }
      return `M ${start} A ${pathRadius} ${pathRadius} 0 1 1 ${end}`;
    } else {
      const start = getCoords(Math.PI * 1.5);
      const end = getCoords(0);

      return `M ${start} A ${pathRadius} ${pathRadius} 0 1 0 ${end}`;
    }
  }
</script>

<!-- HTML -->
<svg
  bind:this={spinner}
  class={`spinner-${type}`}
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
  .spinner-infinite {
    animation: rotate 1s linear infinite;
  }
  .spinner-progress {
    transition: stroke-dashoffset 0.5s ease;
  }
</style>
