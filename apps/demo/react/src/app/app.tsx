import { GoAAppHeader, GoAButton, GoAButtonGroup, GoACheckbox, GoAFormItem, GoAInput, GoAPageBlock, GoAServiceLevelHeader } from "@abgov/react-components";
import { useState } from "react";
export function App() {

  const [firstName, setFirstName] = useState<string>('');
  const [desserts, setDesserts] = useState(false);

  function submitForm(e: any) {
    console.log('submitForm', firstName);
    e.preventDefault();
  }

  return (
    <>
      <GoAServiceLevelHeader level="alpha" version="UAT" />

      <GoAAppHeader url="http://google.com" title="Digital File Service">
        <a href="#">Sign in</a>
      </GoAAppHeader>

      <GoAPageBlock>
        <form>
          <GoAFormItem name="firstname" label="First Name">
            <GoAInput id="firstname" name="firstname" type="text" value={firstName} onChange={(_name, value) => setFirstName(value) } />
          </GoAFormItem>

          <GoACheckbox
            name="desserts"
            text="Ice Cream"
            value="10"
            checked={desserts}
            onChange={(name, checked, value) => {
              setDesserts(checked);
              console.log(name, checked, value);
            }}
          />

          <GoAButtonGroup alignment="start">
            <GoAButton type="primary" onClick={submitForm}>Submit</GoAButton>
          </GoAButtonGroup>
        </form>
      </GoAPageBlock>
    </>
  );
}

export default App;
