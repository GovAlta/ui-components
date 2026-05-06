import { platformBrowserDynamic } from "@angular/platform-browser-dynamic";
import { AppModule } from "./app/app.module";
// This import has a side effect: token-version.ts calls applyTokenVersion at
// module load, which puts the V2 stylesheet link in <head> before Angular
// bootstraps. Without this, the page would flash V1 on first paint.
import {
  applyTokenVersion,
  resolveTokenVersion,
} from "./app/token-version/token-version";

platformBrowserDynamic()
  .bootstrapModule(AppModule)
  .then(() => {
    // Re-apply after Angular's bundled styles.css is in <head>, so the V2
    // link lands last in the cascade. Without this, the bundled V1 @import
    // overrides V2 and the toggle appears to do nothing.
    applyTokenVersion(resolveTokenVersion());
  })
  .catch((err) => console.error(err));
