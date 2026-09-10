<!-- svelte-ignore missing-custom-element-compile-options -->
<svelte:options customElement="goa-app-header" />

<!-- Script -->
<script lang="ts">
  import { onDestroy, onMount, tick } from "svelte";
  import { MOBILE_BP, TABLET_BP } from "../../common/breakpoints";
  import AppHeaderNavigation from "../app-header-navigation/AppHeaderNavigation.svelte";

  // optional
  /** Set the service name to display in the app header. */
  export let heading: string = "";
  /** Secondary text displayed under the service name. */
  export let secondarytext: string = "";
  /** Set the URL to link from the alberta.ca logo. A full url is required. */
  export let url: string = "";
  /** Sets a data-testid attribute for automated testing. */
  export let testid: string = "";
  /** Maximum width of the content area. */
  export let maxcontentwidth = "";
  /** Sets the breakpoint in px for the full menu to display. */
  export let fullmenubreakpoint: number = TABLET_BP; // minimum window width to show all menu links
  /** When true, clicking the menu button dispatches _menuClick event instead of toggling the menu. Use for custom menu handling. */
  export let hasmenuclickhandler: string = "false"; // If this is yes, we will not expand menu when clicking a toggle button

  // Private

  const _mobileLogo =
    "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIiIGhlaWdodD0iMzIiIHZpZXdCb3g9IjAgMCAzMiAzMiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3QgeD0iMC4wMjgzMjAzIiB3aWR0aD0iMzEuNjk1NCIgaGVpZ2h0PSIzMS42ODc2IiByeD0iNCIgZmlsbD0iIzAwQjZFRCIvPgo8ZyBjbGlwLXBhdGg9InVybCgjY2xpcDBfNTg2NTNfMjAzODgwKSI+CjxtYXNrIGlkPSJtYXNrMF81ODY1M18yMDM4ODAiIHN0eWxlPSJtYXNrLXR5cGU6YWxwaGEiIG1hc2tVbml0cz0idXNlclNwYWNlT25Vc2UiIHg9Ii0xMSIgeT0iLTIiIHdpZHRoPSI0NyIgaGVpZ2h0PSIzOSI+CjxwYXRoIGQ9Ik0yMi4wMTYxIDMxLjEwMTVDMTkuNTQ1MyAzMC4xOTY5IDE3LjEzMzggMjkuMTQgMTQuNzk1OCAyNy45MzY5QzE2LjkxODMgMjcuMTYzMSAxOC45ODc5IDI2LjI1MzIgMjAuOTkxNSAyNS4yMTMxQzIxLjE5NTkgMjcuMTk3NiAyMS41Mzc3IDI5LjE2NTggMjIuMDE0NiAzMS4xMDM2TTM1LjI4NCA2LjcxMTMyQzM0LjI1MDEgNi41ODE1OCAzNC43ODczIDcuMDU4OTYgMzQuNDk5MiA4LjQxMTU0QzMzLjI1MzcgMTQuMjQzMyAyOC40NDkzIDE4LjQ0NjYgMjMuNjI2MiAyMS4yNjY0QzIzLjEyMDggMTQuNTg4MSAyMy4zMjczIDcuMTczNjQgMjQuNTkzNyAyLjYyOTkyQzI1LjY2MjMgLTEuMjA1NjIgMjYuOTMzMSAtMC41MDE3MjkgMjUuMzU2OSAtMS4zMDc0QzIzLjY5NjIgLTIuMTU1MzYgMjEuOTE2NCAtMS4wMzUwMiAyMC40NzQ2IDEuODIyMUMxOS4wMzI3IDQuNjc5MjIgMTIuMzkyOSAyMC4xODkxIDEuNzc5MTMgMzAuNjYyMUMtMy42NDk3OCAzNi4wMjMgLTguNTYwMjggMzMuMjYxOSAtOS41NDM2OCAzMi40Mzc2Qy0xMC4zNDM3IDMxLjc2NjcgLTEwLjYzOSAzMi44MDI0IC05LjY0NjIxIDMzLjg2MzNDLTUuMjU1NTcgMzguNTYzMyAxLjE1ODkxIDM1Ljg2NjcgMy40OTQ2NyAzMy41NDkzQzkuOTQ5NTggMjcuMTQ0MSAxNy40NTQzIDEzLjM1NTkgMjAuNDkwNCA3LjUwNTUyQzIwLjEzNjkgMTIuNjAxIDIwLjIxODMgMTcuNzE3MSAyMC43MzM4IDIyLjc5ODlDMTguMjg4NSAyMy45OTAxIDE1LjczODIgMjQuOTU1OSAxMy4xMTQ5IDI1LjY4NEMxMS42MTAyIDI2LjA3NTQgMTAuNjc5NiAyNi42ODM5IDEwLjY1MjEgMjcuMzc1NkMxMC42MjI1IDI4LjEzMzMgMTEuNjMyNiAyOC43NzI2IDEzLjA5MzMgMjkuNDYwOEMxNS42OTI2IDMwLjY4NjUgMjMuMzA4NSAzNC4yNTgyIDI1LjE4NTEgMzUuMzM4NEMyNi43OTE2IDM2LjI2MzggMjcuNTc1NyAzNS41NDIgMjguMDUxNSAzNC41NDI4QzI4LjY3MzIgMzMuMjQwNCAyNi45Njg1IDMyLjQ4NzggMjUuMzE2NSAzMS45OTc1QzI0LjU4NzQgMjkuMjQ4NSAyNC4wOTIxIDI2LjQ0MzcgMjMuODM1NiAyMy42MTI1QzI3LjcwNzEgMjEuMjQ3MSAzMS41MTg3IDE4LjA5MzIgMzMuNzE1OCAxNC4xNjAyQzM0LjQyNTIgMTIuNzc3OSAzNC45NTI1IDExLjMxMDggMzUuMjg0OCA5Ljc5NDk0QzM1LjUxNDggOC44NjE0NSAzNS41Nzc2IDcuODk1MDcgMzUuNDcwMyA2LjkzOTk3QzM1LjQ3MDMgNi45Mzk5NyAzNS40NDE0IDYuNzMxMzkgMzUuMjg0OCA2LjcxMTMyIiBmaWxsPSIjNTQ1ODYwIi8+CjwvbWFzaz4KPGcgbWFzaz0idXJsKCNtYXNrMF81ODY1M18yMDM4ODApIj4KPHJlY3QgeD0iMC4wMjgzMjAzIiB5PSItMC4wMDE5NTMxMiIgd2lkdGg9IjMxLjY5NTQiIGhlaWdodD0iMzEuNjk1NCIgcng9IjMuMDQ3NjIiIGZpbGw9IndoaXRlIi8+CjwvZz4KPC9nPgo8ZGVmcz4KPGNsaXBQYXRoIGlkPSJjbGlwMF81ODY1M18yMDM4ODAiPgo8cmVjdCB5PSIwLjAwNTg1OTM4IiB3aWR0aD0iMzIiIGhlaWdodD0iMzEuOTkyMiIgcng9IjQiIGZpbGw9IndoaXRlIi8+CjwvY2xpcFBhdGg+CjwvZGVmcz4KPC9zdmc+Cg==";
  const _desktopLogo =
    "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTE4IiBoZWlnaHQ9IjMyIiB2aWV3Qm94PSIwIDAgMTE4IDMyIiBmaWxsPSJub25lIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgo8ZyBjbGlwLXBhdGg9InVybCgjY2xpcDBfNTg0NDdfNDI3MDkpIj4KPHBhdGggZD0iTTExNy45NDYgMTZIMTA2Ljk3NFYyNi45NzE3SDExNy45NDZWMTZaIiBmaWxsPSIjMDBCNkVEIi8+CjxwYXRoIGQ9Ik00OS43OTY2IDI1LjMwMzZDNDguNzAxMSAyNS40MDg4IDQ3LjU1NzIgMjUuNTE0OCA0Ni4zNTQ5IDI1LjU2NjlDNDYuNzkyMiAyMi4yNDggNDguNTk0MyAxNy42NjczIDUwLjgzMzcgMTguMzk4N0M1Mi4xNDQ3IDE4LjgyMDIgNTEuNDM0NCAyMi43MTk4IDQ5Ljc5NTcgMjUuMzAxOEw0OS43OTY2IDI1LjMwMzZaTTQ3LjAwOTUgMjcuNTY3NEM0Ni42ODM4IDI3LjYyMDEgNDYuMzUxOSAyNy42MjAxIDQ2LjAyNjIgMjcuNTY3NEM0Ni4xMTEgMjcuNTA4NCA0Ni4xODAxIDI3LjQyOTYgNDYuMjI3OCAyNy4zMzc5QzQ2LjI3NTUgMjcuMjQ2MSA0Ni4zMDAzIDI3LjE0NDIgNDYuMzAwMSAyNy4wNDA4VjI2LjYxOTNDNDYuOTAwOCAyNi42MTkzIDQ3LjgyOTMgMjYuNTE0MiA0OC45NzY4IDI2LjQwODFDNDguNDcyMSAyNy4wMDczIDQ3Ljc3NzUgMjcuNDE2MyA0Ny4wMDk1IDI3LjU2NzRaTTYwLjY2NTkgMTkuNjY2QzYyLjA4NjQgMTguMzk4NyA2Mi43OTY3IDE4LjUwNjYgNjIuOTU3MyAxOC44MjNDNjMuMzM5OCAxOS41NjA4IDYxLjcwMTEgMjIuMTQyOCA1OC40Nzg1IDIzLjU2NTVDNTguODEwNCAyMi4wNzk3IDU5LjU3IDIwLjcyNCA2MC42NjMyIDE5LjY2Nkg2MC42NjU5Wk0xMTMuMzc0IDIwLjkzMDVDMTEzLjIxIDE4LjM0ODUgMTEwLjg2MiAxNy45MjcgMTEwLjUzNCAxOC42NjQ4QzExMC40MjUgMTguOTI4MSAxMTEuNDA4IDE4LjgyMyAxMTEuNDA4IDIwLjY2NzFDMTExLjQwOCAyMy42NzA3IDEwOC4yNCAyNy42MjIzIDEwNC4xOTYgMjcuNjIyM0MxMDIuNzkzIDI3LjcwNzEgMTAxLjQxMSAyNy4yNDQgMTAwLjM0MSAyNi4zMzAxQzk5LjI3MTkgMjUuNDE2MyA5OC41OTc1IDI0LjEyMjkgOTguNDYwMSAyMi43MjE2Qzk4LjI5NTcgMjEuNjE1MyA5OC41Njk2IDIwLjA4NjYgOTYuNjAzMiAyMC4yOTc4Qzk1LjIzMzggMjAuNDU1OSA5NC4wMzYgMjIuOTg0OSA5Mi4yODc4IDI1LjE0MzZDOTAuODEyNSAyNi45ODc4IDkwLjE1NyAyNi44Mjk2IDkwLjQ4NDcgMjUuMjQ4OEM5MC45MjIgMjMuMjQ2NCA5Mi42MTU1IDE4LjYwOTkgOTQuNTgxOSAxOC4yOTM2Qzk1LjUxMDQgMTguMTM1NCA5NS44MzgxIDE5LjY2NTEgOTYuMjI1MiAxOC43MTUxQzk2LjM2NDIgMTguMzgwNyA5Ni40MTg5IDE4LjAxNzEgOTYuMzg0NSAxNy42NTY1Qzk2LjM1MDEgMTcuMjk1OSA5Ni4yMjc2IDE2Ljk0OTQgOTYuMDI3OSAxNi42NDc0Qzk1LjgyODIgMTYuMzQ1MyA5NS41NTc0IDE2LjA5NzIgOTUuMjM5MyAxNS45MjQ3Qzk0LjkyMTIgMTUuNzUyMyA5NC41NjU3IDE1LjY2MDkgOTQuMjA0IDE1LjY1ODZDOTIuNzgzNSAxNS42NTg2IDkxLjA5IDE3LjEzNDMgODkuNjcwNCAxOC43NjcyQzg4LjQ2OSAyMC4yNDI5IDgyLjI5NTggMjguOTg5MiA3OS42NzM5IDI3LjA5MjlDNzguNDcyNSAyNi4xOTY5IDc4LjU3ODQgMjIuNjEyOCA3OS4zNDYyIDE4LjM5ODdDODAuNDU2IDE3LjkxNzYgODEuNjQ5OCAxNy42NjA2IDgyLjg1OTEgMTcuNjQyNkM4NC4wNjg0IDE3LjYyNDUgODUuMjY5MyAxNy44NDU4IDg2LjM5MyAxOC4yOTM2Qzg3LjEwMzMgMTguNjA5OSA4Ny4yMTQ2IDE4LjU1NjkgODYuODg1MSAxNy44MTkxQzg2LjQ0NzggMTYuNzEyOCA4My45OTAyIDE0Ljk3MzcgODAuMTEyMSAxNS43NjM3QzgwLjAwMjUgMTUuNzYzNyA3OS45NDc4IDE1LjgxNjcgNzkuODM4MiAxNS44MTY3QzgwLjE2NiAxNC40NDUzIDgwLjQ5MzcgMTMuMDI0NCA4MC45MzM3IDExLjY1MzlDODEuMzE2MiAxMC4zODk0IDgyLjM1NDIgOC4yMjg4NyA3OS41NjQzIDcuODYwNEM3OC42OTA3IDcuNzAyMjMgNzkuMDczMiA4LjEyMzcyIDc4Ljc0MjcgOS4yODMwN0M3OC4xOTUgMTEuMzkwNiA3Ny41NDEzIDE0LjEyODkgNzcuMDQ5MiAxNi45MjNDNzQuNTE3NiAxOC4zNjY4IDcyLjQ1MTYgMjAuNTA2MSA3MS4wOTUxIDIzLjA4ODJDNzEuNDEwNSAyMS44OTMyIDcxLjY0NzggMjAuNjc4OSA3MS44MDU0IDE5LjQ1MjlDNzEuODM2IDE5LjE0OTkgNzEuNzUyIDE4Ljg0NjQgNzEuNTY5OSAxOC42MDI0QzcxLjM4NzkgMTguMzU4NSA3MS4xMjEgMTguMTkxOCA3MC44MjIyIDE4LjEzNTRDNzAuMjIxNSAxNy45NzcyIDY5LjQ1MjggMTguMjQwNiA2OC43NDYyIDE5LjI0MTdDNjcuMDUyNyAyMS41NjA0IDY0LjkyMjkgMjUuMTk1NyA2MS42NDU1IDI2LjcyMzVDNTkuMjk2NSAyNy44Mjk5IDU4LjI1ODUgMjYuNzIzNSA1OC4yMDQ2IDI0Ljk4NjRDNTguNjE1NyAyNC44NzgxIDU5LjAxNzQgMjQuNzM3MSA1OS40MDYxIDI0LjU2NDlDNjMuNjY2NyAyMi43NzM3IDY1LjA4NzIgMjAuMDMzNSA2NC4wNDkyIDE4LjM0NzVDNjMuMDExMiAxNi43NjY3IDYwLjExNjMgMTcuMjQxMiA1Ny43Njc0IDE5LjYxMkM1Ni41Mjk5IDIwLjk4MTcgNTUuNzgwNiAyMi43MjM0IDU1LjYzNjYgMjQuNTY0OUM1NC42NTM0IDI0Ljc3NjEgNTMuNTYwNiAyNC45MzA2IDUyLjMwNDQgMjUuMDkxNUM1NC4yNzA5IDIxLjk4MjggNTQuMTA3NCAxNy43NjcgNTEuMjA4OSAxNy4wM0M0Ny44MjIgMTYuMTg3IDQ2LjEyODUgMTkuMzQ4NyA0NS40MTkxIDIxLjk4MjhDNDUuNjkzIDE5LjAzMjQgNDYuMTI5NCAxNi4wODEgNDYuNjc1MyAxMy4xODM1QzQ2Ljk0OTIgMTEuOTE5IDQ3LjgyMiA5Ljc1ODUxIDQ1LjAzMjEgOS4zOTAwNEM0NC4xNTg0IDkuMjMxODcgNDQuMjY3IDkuNjUzMzcgNDQuMzIxOCAxMC44MTI3QzQ0LjQzMTQgMTIuMzkzNiA0Mi42MjgzIDIxLjgyNTYgNDMuNTU2OCAyNS45MzU0QzQyLjM1NTQgMjYuMzAxMSA0MS44NjMzIDI3LjE5OTkgNDMuMzkyNCAyOC4wOTU5QzQ0LjMxNzQgMjguNDgxMiA0NS4zMTU5IDI4LjY1NzQgNDYuMzE2NyAyOC42MTE5QzQ3LjMxNzUgMjguNTY2MyA0OC4yOTU5IDI4LjMwMDMgNDkuMTgyMiAyNy44MzI2QzUwLjAwNjIgMjcuNDI5OCA1MC43NDcyIDI2Ljg3NTYgNTEuMzY2OCAyNi4xOTg3QzUyLjc4NzQgMjYuMDQwNiA1NC4yNjE3IDI1Ljc3NzIgNTUuNjI3NSAyNS41NjZDNTUuODQ1NiAyNy40MTAyIDU3LjEwMjcgMjguNzc5OCA1OS45NDI5IDI4LjUxNjVDNjMuOTg1MyAyOC4xNTA4IDY3LjU5MDQgMjMuMzUyNSA2OC45NTYyIDIxLjAzNDdDNjguNjgyMyAyMy41MTE2IDY3LjA0NDUgMjguOTM4IDY5Ljg4NDYgMjguNjc0N0M3MC45ODAxIDI4LjU2OTUgNzAuNTQwMSAyOC40MTE0IDcwLjU5NDkgMjcuNDYzMkM3MC44Njg3IDI0LjE5NjQgNzMuNjU0MSAyMS40MDQxIDc2LjQzNzYgMTkuNzE3MkM3NS45NDU1IDIzLjcyMTkgNzYuMTA5OCAyNy4zMDYgNzguMDIxNSAyOC40MTE0QzgxLjUxNzEgMzAuNTE4OCA4Ni4zNzkzIDI0Ljk4NjQgODkuMTA5OSAyMS42MTQ0Qzg3Ljc0MDUgMjQuNjE3OSA4Ni45NzkxIDI4LjQxMTQgODkuMDAwMyAyOC45OTFDOTEuNDA0MSAyOS42NzU4IDkzLjMxNTcgMjUuNzc3MiA5NS41NTUxIDIyLjgyNThDOTUuODI5IDI0LjkzMzMgOTcuMzAzNCAyOC42MjE2IDEwMy4yMDMgMjguNjIxNkMxMDkuNTM5IDI4LjU2ODYgMTEzLjUyNyAyNC44ODAzIDExMy4zNjMgMjAuOTI4NkwxMTMuMzc0IDIwLjkzMDVaTTI3LjgyMTYgMjcuNTExN0MyNS42OTI2IDI2Ljc2NTYgMjMuNjEyNyAyNS44ODU1IDIxLjU5NDUgMjQuODc2NkMyMy40MjM0IDI0LjIzMTIgMjUuMjExMSAyMy40NzQ1IDI2Ljk0NzkgMjIuNjExQzI3LjEzNzUgMjQuMjYxMSAyNy40MjkzIDI1Ljg5NzggMjcuODIxNiAyNy41MTE3Wk00My45NTEyIDMwLjQ2NzZDNDMuODk2NCAzMC4zMDk1IDQzLjQ1OTEgMzAuNTIwNyA0My4wNzc1IDMwLjQ2NzZDNDEuOTI5OSAzMC4zMDk1IDQwLjQwMDggMjguNzgxNyAzOS45NjM1IDI2LjMwNDhDMzkuMTQxOSAyMS44MjQ3IDM5LjYzNTggMTcuNDAwMyA0MS4wMDE1IDEwLjgxMzZDNDEuMjc1NCA5LjU0OTE0IDQyLjE0OSA3LjM4ODYyIDM5LjM1ODIgNi45NjcxMkMzOC40ODQ2IDYuODYxOTggMzguOTIwOSA3LjI4MzQ3IDM4LjcwMjcgOC4zODk3OUMzNy42MDcyIDEzLjI5MDUgMzMuNDU4OSAxNi44MjA2IDI5LjMwNzggMTkuMTkxNUMyOC44NzA2IDEzLjYwNTkgMjkuMDM0IDcuMzM1NTkgMzAuMTI5NSAzLjU0MjExQzMxLjA2MDcgMC4zMjgzMTQgMzIuMTUyNSAwLjkwNzk4NyAzMC43ODY4IDAuMjIzMTY4QzI5LjQyMSAtMC40NjE2NSAyNy44MzcxIDAuNDMzNDYgMjYuNTgwOSAyLjg1NTQ3QzI1LjMyNDggNS4yNzc0OCAxOS41OTM0IDE4LjI5NjMgMTAuNDEzIDI3LjA5NTdDNS43MTY5NiAzMS41NzQgMS40NTQ1MiAyOS4yNTYyIDAuNjM0NzEgMjguNTcxNEMtMC4wNzU1NDUzIDI3Ljk5MTcgLTAuMjkzNzM0IDI4Ljg4NzcgMC41MjUxNTkgMjkuNzgyOEM0LjI5NDYyIDMzLjc4NzUgOS44NjYyIDMxLjUyIDExLjg4NjUgMjkuNTcxNkMxNy40NTUzIDI0LjE5NzMgMjMuOTU4MSAxMi42MDQ4IDI2LjU4NDYgNy43MDQ5N0MyNi4yNzQ5IDExLjk4ODYgMjYuMzQ3OSAxNi4yOTE0IDI2LjgwMjggMjAuNTYyQzI0LjY5MTYgMjEuNTU3NCAyMi40OTg1IDIyLjM2ODQgMjAuMjQ4IDIyLjk4NThDMTguOTM3IDIzLjMwMjIgMTguMTE3MiAyMy44Mjg4IDE4LjExNzIgMjQuNDA4NUMxOC4xMTcyIDI0Ljk4ODIgMTguOTkwOSAyNS41Njc5IDIwLjI0OCAyNi4xNDU3QzIyLjQ4NzQgMjcuMTk5OSAyOS4wOTcgMzAuMTUwNCAzMC42ODA5IDMxLjA5ODVDMzIuMDUwMyAzMS44ODg1IDMyLjc1NjkgMzEuMjU2NyAzMy4xMzk0IDMwLjQxMzdDMzMuNjg3MSAyOS4zMDc0IDMyLjIxMDkgMjguNjc2NSAzMC43OTA0IDI4LjMwNjJDMzAuMTY0NyAyNS45OTE5IDI5LjcyNjMgMjMuNjMwOCAyOS40Nzk1IDIxLjI0NTlDMzIuODExNiAxOS4yNDM2IDM2LjE0MzggMTYuNjA5NCAzOC4wMDA3IDEzLjI5MTRDMzcuNTA5NiAxNi4wMzQzIDM2LjMwNzIgMjUuNDYzNiAzOS4zNzAxIDI5LjQxNTNDMzkuNzkzNiAyOS45NjA3IDQwLjM0MDEgMzAuMzk3OCA0MC45NjQ5IDMwLjY5MDdDNDEuNTg5NiAzMC45ODM2IDQyLjI3NDggMzEuMTI0IDQyLjk2NDMgMzEuMTAwM0M0My43MjkzIDMxLjA0NzMgNDQuMDU5OCAzMC41NzM3IDQzLjk0NzUgMzAuNDY3NiIgZmlsbD0iIzU0NTg2MCIvPgo8L2c+CjxkZWZzPgo8Y2xpcFBhdGggaWQ9ImNsaXAwXzU4NDQ3XzQyNzA5Ij4KPHJlY3Qgd2lkdGg9IjExNy45NDYiIGhlaWdodD0iMzIiIGZpbGw9IndoaXRlIi8+CjwvY2xpcFBhdGg+CjwvZGVmcz4KPC9zdmc+Cg==";

  let _rootEl: HTMLElement;
  let _windowWidth = window.innerWidth;

  // Slot detection
  let _hasBannerSlot = false;
  let _hasNavigationSlot = false;

  // Utilities responsive
  let _utilitiesSlotItems: Element[] = [];
  let _utilitiesItemCount = 0;
  let _showUtilitiesMenu = false; // Start false - show items initially to measure
  let _utilitiesMenuOpen = false;
  let _utilitiesPlaceholderEl: HTMLElement | null = null;
  let _utilitiesInitialMeasurementDone = false;
  let _utilitiesCheckTimeout: number | null = null;

  // Reactive

  $: _mobile = _windowWidth < MOBILE_BP;

  // Check utilities space when window width changes
  $: if (_windowWidth && _utilitiesInitialMeasurementDone) {
    checkUtilitiesSpace();
  }

  // Hooks

  onMount(async () => {
    detectSlots();
    detectUtilitiesItems();

    document.addEventListener("click", handleClickOutside);

    await tick();

    if (_utilitiesPlaceholderEl && _utilitiesItemCount >= 2) {
      await tick();

      checkUtilitiesSpace();
      _utilitiesInitialMeasurementDone = true;
    }
  });

  onDestroy(() => {
    document.removeEventListener("click", handleClickOutside);

    // Clean up utilities check timeout
    if (_utilitiesCheckTimeout) {
      clearTimeout(_utilitiesCheckTimeout);
    }
  });

  // Functions

  // Detect if named slots have content
  function detectSlots() {
    if (!_rootEl) return;

    // In Shadow DOM, slotted elements are in the light DOM (component's children)
    // We need to check the host element's children, not _rootEl's children
    const hostElement = _rootEl.getRootNode() as ShadowRoot;
    const lightDomChildren = hostElement.host?.children || [];

    // Check for elements with slot="banner" attribute
    _hasBannerSlot = Array.from(lightDomChildren).some(
      (el) => el.getAttribute("slot") === "banner",
    );

    // Check for elements with slot="navigation" attribute
    _hasNavigationSlot = Array.from(lightDomChildren).some(
      (el) => el.getAttribute("slot") === "navigation",
    );
  }

  // Count utilities slot items for responsive menu behavior
  function detectUtilitiesItems() {
    if (!_rootEl) return;

    const hostElement = _rootEl.getRootNode() as ShadowRoot;
    const lightDomChildren = hostElement.host?.children || [];

    // Find all elements with slot="utilities" attribute
    _utilitiesSlotItems = Array.from(lightDomChildren).filter(
      (el) => el.getAttribute("slot") === "utilities",
    );

    _utilitiesItemCount = _utilitiesSlotItems.length;
  }

  // Close the utilities menu when the user clicks outside it.
  function handleClickOutside(event: MouseEvent) {
    if (!_utilitiesMenuOpen) return;

    const path = event.composedPath();
    const clickedInsideUtilities = path.some((el) => {
      return (
        el instanceof Element &&
        (el.classList?.contains("utilities-menu-button") ||
          el.classList?.contains("utilities-dropdown"))
      );
    });

    if (!clickedInsideUtilities) {
      _utilitiesMenuOpen = false;
    }
  }

  // Check if utilities should be shown in menu based on available space
  function checkUtilitiesSpace() {
    // Clear any pending timeout
    if (_utilitiesCheckTimeout) {
      clearTimeout(_utilitiesCheckTimeout);
    }

    // Debounce the check to prevent infinite loops
    _utilitiesCheckTimeout = window.setTimeout(() => {
      if (!_utilitiesPlaceholderEl || _utilitiesItemCount < 2) {
        if (_showUtilitiesMenu !== false) {
          _showUtilitiesMenu = false;
        }
        return;
      }

      // MOBILE RULE: Always show menu button on mobile (<640px) when 2+ items
      if (_mobile && _utilitiesItemCount >= 2) {
        if (_showUtilitiesMenu !== true) {
          _showUtilitiesMenu = true;
        }
        return;
      }

      // TABLET/DESKTOP: Space-based calculation
      // Get the header placeholder (parent container) width
      const shadowRoot = _utilitiesPlaceholderEl.getRootNode() as ShadowRoot;
      const headerPlaceholder = shadowRoot?.querySelector(
        ".header-placeholder",
      ) as HTMLElement;

      if (!headerPlaceholder) {
        if (_showUtilitiesMenu !== false) {
          _showUtilitiesMenu = false;
        }
        return;
      }

      const headerWidth = headerPlaceholder.offsetWidth;

      // Use minimum widths for predictable calculation
      // Service/phase wrapper has min-width: 200px and uses flex: 1, so reserve that space
      const logoArea = shadowRoot?.querySelector(".logo-area") as HTMLElement;
      const logoWidth = logoArea?.offsetWidth || (_mobile ? 32 : 118); // Fixed logo sizes

      const servicePhaseMinWidth = 200; // Minimum width for service area
      const headerPadding = 96; // 48px left + 48px right padding on header
      const gapBetweenElements = 48; // Gaps between major sections (24px * 2)

      // Calculate available space for utilities using minimum service area width
      // This prevents the service area flex growing/shrinking from affecting the calculation
      const availableWidth =
        headerWidth -
        logoWidth -
        servicePhaseMinWidth -
        headerPadding -
        gapBetweenElements;

      // Measure actual utility items
      const utilitySlot = shadowRoot?.querySelector(
        'slot[name="utilities"]',
      ) as HTMLSlotElement;
      let totalItemsWidth = 0;

      if (utilitySlot) {
        const slottedItems = utilitySlot.assignedElements();

        if (slottedItems.length > 0) {
          // Measure actual widths
          slottedItems.forEach((item) => {
            const itemEl = item as HTMLElement;
            totalItemsWidth += itemEl.offsetWidth || 100;
          });

          // Add gaps between items
          const gap = 12;
          totalItemsWidth += (slottedItems.length - 1) * gap;
        } else {
          // Fallback: estimate if items not yet rendered
          const estimatedItemWidth = 100;
          const gap = 12;
          totalItemsWidth =
            _utilitiesItemCount * estimatedItemWidth +
            (_utilitiesItemCount - 1) * gap;
        }
      }

      // Determine if menu should be shown
      const shouldShowMenu = totalItemsWidth > availableWidth;

      // Only update if state needs to change (prevents infinite loop)
      if (_showUtilitiesMenu !== shouldShowMenu) {
        _showUtilitiesMenu = shouldShowMenu;
      }
    }, 100); // 100ms debounce
  }
</script>

<svelte:window bind:innerWidth={_windowWidth} />

<!-- HTML -->
<div
  class="container"
  bind:this={_rootEl}
  data-testid={testid}
  class:mobile={_mobile}
>
  <div class="structure">
    <!-- Banner slot - only show if content provided -->
    {#if _hasBannerSlot}
      <div class="banner-placeholder">
        <slot name="banner"></slot>
      </div>
    {/if}

    <!-- Header section (always visible) -->
    <div class="header-placeholder">
      <!-- Logo area with optional URL link -->
      <div class="logo-area">
        {#if url}
          <a href={url} data-testid="logo-link">
            <div
              role="img"
              aria-label="GoA Logo"
              class="logo-mobile"
              style="--logo-default: url({_mobileLogo});"
            ></div>
            <div
              role="img"
              aria-label="GoA Logo"
              class="logo-desktop"
              style="--logo-default: url({_desktopLogo});"
            ></div>
          </a>
        {:else}
          <div
            role="img"
            aria-label="GoA Logo"
            class="logo-mobile"
            style="--logo-default: url({_mobileLogo});"
          ></div>
          <div
            role="img"
            aria-label="GoA Logo"
            class="logo-desktop"
            style="--logo-default: url({_desktopLogo});"
          ></div>
        {/if}
      </div>

      <!-- Service + Phase wrapper (horizontal on desktop, vertical on mobile) -->
      <div class="service-phase-wrapper">
        <div class="service-placeholder">
          <span class="service-name">{heading || "[Service Name]"}</span>
          {#if secondarytext}
            <span class="secondary-text">{secondarytext}</span>
          {/if}
        </div>
        <div class="phase-placeholder">
          <slot name="phase"></slot>
        </div>
      </div>

      <div class="utilities-placeholder" bind:this={_utilitiesPlaceholderEl}>
        {#if _showUtilitiesMenu}
          <!-- 2+ items: Show compact Menu button -->
          <button
            class="utilities-menu-button"
            on:click={() => (_utilitiesMenuOpen = !_utilitiesMenuOpen)}
            aria-expanded={_utilitiesMenuOpen}
            aria-label="Utilities menu"
          >
            Menu
            <goa-icon
              type={_utilitiesMenuOpen ? "chevron-up" : "chevron-down"}
              size="small"
            />
          </button>

          {#if _utilitiesMenuOpen}
            <div class="utilities-dropdown">
              <slot name="utilities"></slot>
            </div>
          {/if}
        {:else}
          <!-- 0-1 items: Show directly -->
          <slot name="utilities"></slot>
        {/if}
      </div>
    </div>

    <!-- Navigation section - only show if content provided -->
    {#if _hasNavigationSlot}
      <AppHeaderNavigation windowWidth={_windowWidth} mobile={_mobile}>
        <slot name="navigation" />
      </AppHeaderNavigation>
    {/if}
  </div>
</div>

<style>
  /* General App header styling -------------------------------------- */
  *,
  :global(::slotted(*)) {
    font: var(--goa-app-header-typography-service-name);
  }

  .container {
    border-bottom: none;
    background-color: var(--goa-app-header-color-bg);
    padding: 0;
  }

  .structure {
    display: flex;
    flex-direction: column;
    width: 100%;
  }

  /* Banner Section */
  /* Banner is a custom slot - teams provide their own styling */
  /* Hardcoded example styles (not tokens) - teams will override */
  .banner-placeholder {
    background: #6c757d; /* Example: gray background */
    color: #ffffff; /* Example: white text */
    min-height: 16px;
    display: flex;
    align-items: center;
    padding: 0 var(--goa-app-header-padding-h-desktop);
  }

  .mobile .banner-placeholder {
    padding: 0 var(--goa-app-header-padding-h-mobile);
  }

  /* Header Section */
  .header-placeholder {
    display: flex;
    gap: var(--goa-app-header-logo-service-gap);
    align-items: center;
    padding: var(--goa-app-header-padding-v)
      var(--goa-app-header-padding-h-desktop);
    border-bottom: var(--goa-app-header-border-bottom);
  }

  .mobile .header-placeholder {
    gap: var(--goa-app-header-logo-service-gap-small-screen);
    padding: var(--goa-app-header-padding-v)
      var(--goa-app-header-padding-h-mobile);
    align-items: flex-start; /* Top-align logo and service name on mobile */
  }

  /* Service + Phase Wrapper */
  .service-phase-wrapper {
    flex: 1;
    min-width: var(--goa-app-header-min-width-service-name);
    display: flex;
    flex-direction: row;
    flex-wrap: wrap; /* Allow wrapping when space is tight */
    align-items: flex-start; /* Top-align phase badge with service name */
    justify-content: center;
    gap: var(--goa-app-header-service-phase-gap-horizontal);
    row-gap: var(--goa-app-header-service-phase-row-gap);
  }

  .mobile .service-phase-wrapper {
    flex-direction: column;
    align-items: flex-start;
    gap: var(--goa-app-header-service-phase-gap-vertical);
    min-width: 0; /* Allow to shrink on mobile */
    flex-wrap: nowrap; /* No wrapping on mobile, already stacked */
  }

  /* Service Area */
  .service-placeholder {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: var(--goa-app-header-service-name-secondary-text-gap);
    text-align: center;
  }

  .mobile .service-placeholder {
    text-align: left;
    align-items: flex-start;
  }

  /* Phase Badge Area */
  .phase-placeholder {
    display: flex;
    align-items: center;
  }

  /* Service name and secondary text styling */
  .service-name {
    font: var(--goa-app-header-typography-service-name);
    color: var(--goa-app-header-color-service-name);
  }

  .mobile .service-name {
    font: var(--goa-app-header-typography-service-name-mobile);
    color: var(--goa-app-header-color-service-name);
    margin-top: 6px; /* Visually center single-line service name with logo */
  }

  .secondary-text {
    font: var(--goa-app-header-secondary-text-typography-desktop);
    color: var(--goa-app-header-secondary-text-color);
  }

  .mobile .secondary-text {
    font: var(--goa-app-header-secondary-text-typography-mobile);
  }

  /* Utilities Area */
  .utilities-placeholder {
    position: relative;
    display: flex;
    gap: var(--goa-app-header-utilities-gap);
    align-items: center;
  }

  /* Style links in utilities slot - medium link style without underline */
  /* Need !important to override nav item styles */
  .utilities-placeholder :global(::slotted(a)) {
    text-decoration: none !important;
    font-weight: 400 !important;
    font-size: 18px !important;
    line-height: 26px !important;
    color: var(--goa-color-text-default) !important;
    border: none !important;
    background: transparent !important;
    padding: 0 !important;
    height: auto !important;
    box-shadow: none !important;
  }

  .utilities-placeholder :global(::slotted(a:hover)) {
    text-decoration: underline !important;
    color: var(--goa-color-interactive-hover) !important;
    border: none !important;
    background: transparent !important;
    box-shadow: none !important;
  }

  /* Utilities Menu Button (2+ items responsive behavior) */
  .utilities-menu-button {
    position: relative;
    display: inline-flex;
    align-items: center;
    gap: var(--goa-space-2xs);
    padding: var(--goa-space-xs) var(--goa-space-s);
    background: transparent;
    border: 1px solid var(--goa-color-greyscale-200);
    border-radius: var(--goa-border-radius-m);
    color: var(--goa-color-text-default);
    font-size: 18px;
    font-weight: 400;
    line-height: 26px;
    cursor: pointer;
    white-space: nowrap;
    transition:
      background-color 0.2s ease,
      border-color 0.2s ease;
  }

  .utilities-menu-button:hover {
    background: var(--goa-color-greyscale-50);
    border-color: var(--goa-color-greyscale-300);
  }

  .utilities-menu-button:focus-visible {
    outline: 3px solid var(--goa-color-interactive-focus);
    outline-offset: -3px;
  }

  .utilities-menu-button[aria-expanded="true"] {
    background: var(--goa-color-greyscale-100);
  }

  /* Utilities Dropdown */
  .utilities-dropdown {
    position: absolute;
    top: calc(100% + 4px);
    right: 0;
    min-width: 200px;
    background: var(--goa-color-greyscale-white);
    box-shadow:
      0px 12px 16px -4px rgba(16, 29, 40, 0.08),
      0px 4px 6px -2px rgba(16, 29, 40, 0.03);
    border: 0.5px solid var(--goa-color-greyscale-150);
    border-radius: 8px;
    padding: 8px;
    z-index: 1000;
    display: flex;
    flex-direction: column;
    gap: 0;
  }

  /* Style items inside the utilities dropdown - match app-header-menu styling */
  .utilities-dropdown :global(::slotted(a)),
  .utilities-dropdown :global(::slotted(a:visited)) {
    /* Typography - match app-header-menu */
    font-size: 18px !important;
    font-weight: 500 !important;
    line-height: 24px !important;
    color: var(--goa-color-text-default) !important;

    /* Remove borders */
    box-shadow: none !important;
    border: none !important;

    /* Spacing - match app-header-menu */
    padding: 12px 8px !important;

    /* Border radius */
    border-radius: 6px !important;

    /* Display */
    display: block;
    text-decoration: none;
    background: transparent;
    transition: background-color 0.2s ease;
  }

  .utilities-dropdown :global(::slotted(a:hover)) {
    background: var(--goa-color-greyscale-100, #f1f1f1) !important;
    color: var(--goa-color-text-default, #000000) !important;
    text-decoration: none !important;
  }

  .utilities-dropdown :global(::slotted(a:focus-visible)) {
    outline: 3px solid var(--goa-color-interactive-focus, #004f84) !important;
    outline-offset: -3px !important;
    background: var(--goa-color-greyscale-100, #f1f1f1) !important;
  }

  /* Style buttons inside the utilities dropdown - make them look like menu items */
  .utilities-dropdown :global(::slotted(goa-button)),
  .utilities-dropdown :global(::slotted(button)) {
    /* Force full width and text-only appearance */
    width: 100% !important;
    display: block !important;
    text-align: left !important;

    /* Typography - match menu items */
    font-size: 18px !important;
    font-weight: 500 !important;
    line-height: 24px !important;
    color: var(--goa-color-text-default, #000000) !important;

    /* Remove button styling, make it look like a menu item */
    background: transparent !important;
    border: none !important;
    box-shadow: none !important;

    /* Spacing - match menu items */
    padding: 12px 8px !important;
    margin: 0 !important;

    /* Border radius */
    border-radius: 6px !important;

    /* Cursor */
    cursor: pointer;
    transition: background-color 0.2s ease;
  }

  .utilities-dropdown :global(::slotted(goa-button:hover)),
  .utilities-dropdown :global(::slotted(button:hover)) {
    background: var(--goa-color-greyscale-100) !important;
  }

  .utilities-dropdown :global(::slotted(goa-button:focus-visible)),
  .utilities-dropdown :global(::slotted(button:focus-visible)) {
    outline: 3px solid var(--goa-color-interactive-focus) !important;
    outline-offset: -3px !important;
    background: var(--goa-color-greyscale-100) !important;
  }

  /* Logo styling */
  .logo-area {
    display: flex;
    align-items: center;
  }

  /* Logo switching - use media query for 768px breakpoint */
  /* Above 768px: Show horizontal logo */
  @media (min-width: 768px) {
    .logo-desktop {
      display: block;
      height: var(--goa-app-header-logo-desktop-height, 32px);
      width: 118px;
      background-image: var(--goa-app-header-logo-desktop, var(--logo-default));
      background-size: contain;
      background-repeat: no-repeat;
    }

    .logo-mobile {
      display: none;
    }
  }

  /* Below 768px: Show square logo */
  @media (max-width: 767px) {
    .logo-desktop {
      display: none;
    }

    .logo-mobile {
      display: block;
      width: var(--goa-app-header-logo-mobile-size, 32px);
      height: var(--goa-app-header-logo-mobile-size, 32px);
      background-image: var(--goa-app-header-logo-mobile, var(--logo-default));
      background-size: contain;
      background-repeat: no-repeat;
    }
  }
</style>
