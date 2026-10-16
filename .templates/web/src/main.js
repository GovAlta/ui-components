import "@abgov/web-components";
import { mount } from "svelte";
import App from "./app/App.svelte";

let app;
const target = document.getElementById("app");
if (target) {
  app = mount(App, { target });
} else {
  console.error("Target element not found");
}
export default app;
