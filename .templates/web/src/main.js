import "@abgov/web-components";
import App from "./app/App.svelte";

let app;
const target = document.getElementById("app");
if (target) {
  app = new App({ target });
} else {
  console.error("Target element not found");
}
export default app;
