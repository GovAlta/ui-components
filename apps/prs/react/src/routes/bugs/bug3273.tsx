import { GoabSideMenu, GoabSideMenuGroup } from "@abgov/react-components";
import { Link } from "react-router-dom";

export function Bug3273Route() {
  return (
    <div>
      <h2>Bug 3273: Keep side menu group open</h2>
      <p>This page tests a nested side menu group.</p>

      <h4>Scenario one</h4>
      <p>
        When you open the Child Group,
        <br />
        And you select the Child Item,
        <br />
        Then the Child Group will be open,
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
