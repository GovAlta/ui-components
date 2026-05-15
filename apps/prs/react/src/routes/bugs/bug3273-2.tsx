import { GoabSideMenu, GoabSideMenuGroup } from "@abgov/react-components";
import { Link } from "react-router-dom";

export function Bug3273Page2Route() {
  return (
    <div>
      <h2>Bug 3273: Keep side menu group open</h2>
      <p>This page tests a nested side menu group.</p>

      <h4>Scenario two</h4>
      <p>
        When you select the Parent Item,
        <br />
        Then the Child Group will be closed,
        <br />
        And the Parent Group will be open.
      </p>

      <div style={{ maxWidth: "300px", marginTop: "24px" }}>
        <GoabSideMenu>
          <GoabSideMenuGroup heading="Parent Group">
            <Link to="/bugs/3273">Parent Item</Link>

            <GoabSideMenuGroup heading="Child Group">
              <Link to="/bugs/3273-2">Child Item</Link>
            </GoabSideMenuGroup>
          </GoabSideMenuGroup>
        </GoabSideMenu>
      </div>
    </div>
  );
}
