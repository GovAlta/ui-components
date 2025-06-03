import { Link, Outlet } from "react-router-dom";

import { TestContent } from "./TestContent";

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
          <a href="/test">Test</a>
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
