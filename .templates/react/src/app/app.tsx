import { Outlet } from "react-router-dom";

import {
  GoabAppFooter,
  GoabAppHeader,
  GoabMicrositeHeader,
  GoabOneColumnLayout,
} from "@abgov/react-components";
import "@abgov/style";


export function App() {
  return (
    <GoabOneColumnLayout>
      <section slot="header">
        <GoabMicrositeHeader type="alpha" version="UAT" />
        <GoabAppHeader url="/" heading="Design System">
          <a href="/all">View All</a>
          <a href="/playground">Playground</a>
        </GoabAppHeader>
      </section>
      <div style={{ display: "flex", margin: "auto", width: "1024px" }}>
        <Outlet />
      </div>
      <section slot="footer">
        <GoabAppFooter />
      </section>
    </GoabOneColumnLayout>
  );
}

export default App;
