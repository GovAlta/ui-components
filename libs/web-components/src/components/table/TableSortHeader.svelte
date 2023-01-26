<svelte:options tag="goa-table-sort-header" />

<script context="module" lang="ts">
  export type Direction = "asc" | "desc" | "none"
</script>

<script lang="ts">
  export let direction: Direction = "none";
</script>

<style>
  :host {
    display: flex;
    align-items: flex-end;
  }
  button {
    border: none;
    background: none;
    display: flex;
    font-family: inherit;
    font-size: inherit;
    font-weight: inherit;
    color: inherit;
    padding: 1rem;
    width: 100%;
    height: 100%;
    text-align: left;

    gap: 0.25rem;
    align-items: flex-end;
    justify-content: stretch;
  }

  button * {
    align-self: flex-end;
  }

  img {
    width: 16px;
    height: 22px;
    scale: 0.7;
  }

  /* User set classes */
  button:hover {
    background-color: var(--goa-color-greyscale-100);
    cursor: pointer;
    color: var(--goa-color-interactive-default);
  }

  img.asc {
    transform: rotate(180deg);
  }
</style>

<button>
  <slot />
  {#if direction === "none"}
    <img alt="not sorted" src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9Im5vIj8+CjwhLS0gQ3JlYXRlZCB3aXRoIElua3NjYXBlIChodHRwOi8vd3d3Lmlua3NjYXBlLm9yZy8pIC0tPgoKPHN2ZwogICB3aWR0aD0iMTUuMzU5ODg3IgogICBoZWlnaHQ9IjIxLjg0NDI1IgogICB2aWV3Qm94PSIwIDAgNC4wNjM5NzAxIDUuNzc5NjI0NCIKICAgdmVyc2lvbj0iMS4xIgogICBpZD0ic3ZnNTE3IgogICB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciCiAgIHhtbG5zOnN2Zz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgogIDxkZWZzCiAgICAgaWQ9ImRlZnM1MTQiIC8+CiAgPGcKICAgICBpZD0ibGF5ZXIxIgogICAgIHRyYW5zZm9ybT0idHJhbnNsYXRlKC05LjM0NTE0MDMsLTguNzQ0OTg2NikiPgogICAgPHBhdGgKICAgICAgIGQ9Im0gOS40MTc3Njg0LDEyLjM5NzYzMSAxLjczMzU5ODYsMi4wMjMwNyBjIDAuMDI3OTQsMC4wMzI1OSAwLjA2MjYxLDAuMDU4NzUgMC4xMDE2MTEsMC4wNzY2OSAwLjAzOSwwLjAxNzk0IDAuMDgxNDMsMC4wMjcyMiAwLjEyNDM1OSwwLjAyNzIyIDAuMDQyOTMsMCAwLjA4NTM1LC0wLjAwOTMgMC4xMjQzNiwtMC4wMjcyMiAwLjAzOSwtMC4wMTc5NCAwLjA3MzY3LC0wLjA0NDEgMC4xMDE2MSwtMC4wNzY2OSBsIDEuNzMzNTk4LC0yLjAyMzA3IGMgMC4xNjU0NDQsLTAuMTkzMTA0IDAuMDI4MjgsLTAuNDkxMzgxIC0wLjIyNTk4MSwtMC40OTEzODEgSCA5LjY0MzI0MjQgYyAtMC4yNTQyNDgsMCAtMC4zOTE0MTgsMC4yOTgyNzcgLTAuMjI1NDc0LDAuNDkxMzgxIHoiCiAgICAgICBmaWxsPSIjYWRhZGFkIgogICAgICAgaWQ9InBhdGgzMzUiCiAgICAgICBzdHlsZT0ic3Ryb2tlLXdpZHRoOjAuMjY0NTgzIiAvPgogICAgPHBhdGgKICAgICAgIGQ9Ik0gMTMuMzM2NDk0LDEwLjg3MTk2OCAxMS42MDI4ODksOC44NDg4OTY2IGMgLTAuMDI3OTQsLTAuMDMyNTkgLTAuMDYyNjEsLTAuMDU4NzUgLTAuMTAxNjExLC0wLjA3NjY5IC0wLjAzOSwtMC4wMTc5NCAtMC4wODE0MywtMC4wMjcyMiAtMC4xMjQzNTksLTAuMDI3MjIgLTAuMDQyOTMsMCAtMC4wODUzNSwwLjAwOTMgLTAuMTI0MzYsMC4wMjcyMiAtMC4wMzkwMSwwLjAxNzk0IC0wLjA3MzY3LDAuMDQ0MSAtMC4xMDE2MTMsMC4wNzY2OSBMIDkuNDE3MzQ3MSwxMC44NzE5NjggYyAtMC4xNjU0NDcsMC4xOTMxMDMgLTAuMDI4MjgsMC40OTEzNzkgMC4yMjU5NzEsMC40OTEzNzkgaCAzLjQ2NzY5NzkgYyAwLjI1NDIzOCwwIDAuMzkxNDI1LC0wLjI5ODI3NiAwLjIyNTQ3OCwtMC40OTEzNzkgeiIKICAgICAgIGZpbGw9IiNhZGFkYWQiCiAgICAgICBpZD0icGF0aDIiCiAgICAgICBzdHlsZT0ic3Ryb2tlLXdpZHRoOjAuMjY0NTgzIiAvPgogIDwvZz4KPC9zdmc+Cg==" />
  {:else}
    <img alt={direction} class={direction} src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9Im5vIj8+CjxzdmcKICAgd2lkdGg9IjE2IgogICBoZWlnaHQ9IjIyIgogICB2aWV3Qm94PSIwIDAgMTYgMjIiCiAgIGZpbGw9Im5vbmUiCiAgIHZlcnNpb249IjEuMSIKICAgaWQ9InN2ZzEwNjgiCiAgIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIKICAgeG1sbnM6c3ZnPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CiAgPGRlZnMKICAgICBpZD0iZGVmczEwNzIiIC8+CiAgPHBhdGgKICAgICBkPSJtIDAuNTk0Mzc0NzEsNy45MDkwOTkgNi41NTIxODc5OSw3LjY0NjI1IGMgMC4xMDU2MSwwLjEyMzE4IDAuMjM2NjIsMC4yMjIwNiAwLjM4NDA0LDAuMjg5ODUgMC4xNDc0MiwwLjA2Nzc5IDAuMzA3NzYsMC4xMDI4OSAwLjQ3MDAyLDAuMTAyODkgMC4xNjIyNiwwIDAuMzIyNiwtMC4wMzUxIDAuNDcwMDIsLTAuMTAyODkgMC4xNDc0MiwtMC4wNjc3OSAwLjI3ODQzLC0wLjE2NjY3IDAuMzg0MDQsLTAuMjg5ODUgbCA2LjU1MjE4MDMsLTcuNjQ2MjUgYyAwLjYyNTMsLTAuNzI5ODQgMC4xMDY5LC0xLjg1NzE4OCAtMC44NTQxLC0xLjg1NzE4OCBIIDEuNDQ2NTYyNyBjIC0wLjk2MDkzNzk5LDAgLTEuNDc5Mzc1NjksMS4xMjczNDggLTAuODUyMTg3OTksMS44NTcxODggeiIKICAgICBmaWxsPSIjMDA3MGM0IgogICAgIGlkPSJwYXRoMTA2NiIgLz4KPC9zdmc+Cg==" />
  {/if}
</button>