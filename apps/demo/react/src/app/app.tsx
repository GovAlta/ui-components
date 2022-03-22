import { GoAAppHeader, GoAAppFooter, GoAMetaLink, GoANavigationLink, GoAButton, GoAButtonGroup, GoACheckbox, GoAFormItem, GoAInput, GoAPageBlock, GoARadioGroup, GoARadioItem, GoAMicrositeHeader } from "@abgov/react-components";
import { useState } from "react";
export function App() {

  const [firstName, setFirstName] = useState<string>('');
  const [desserts, setDesserts] = useState(false);

  function submitForm(e: any) {
    console.log('submitForm', firstName);
    e.preventDefault();
  }

  function onRadioChange(name: string, value: string) {
    console.log('onRadioChange', name, value);
  }

  return (
    <>
      <GoAMicrositeHeader level="alpha" version="UAT" />

      <GoAAppHeader url="http://google.com" title="Digital File Service">
        <a href="#">Sign in</a>
      </GoAAppHeader>

      <GoAPageBlock>
        <form>
          <GoAFormItem label="First Name">
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

      <GoARadioGroup name="basic" value="orange" onChange={onRadioChange}>
        <GoARadioItem name="basic" label="Red" value="red" />
        <GoARadioItem name="basic" label="Blue" value="blue" />
        <GoARadioItem name="basic" label="Orange" value="orange"/>
      </GoARadioGroup>

      <GoAAppFooter>
        <GoAMetaLink url="privacy.html" title="Privacy" />
        <GoAMetaLink url="disclaimer.html" title="Disclaimer" />
        <GoAMetaLink url="accessibility.html" title="Accessibility" />
        <GoAMetaLink url="using-alberta.html" title="Using Alberta.ca" />

        <GoANavigationLink url="a.html" title="Arts and culture" />
        <GoANavigationLink url="b.html" title="Education and training" />
        <GoANavigationLink url="c.html" title="Family and social supports" />
        <GoANavigationLink url="d.html" title="Housing and community" />
        <GoANavigationLink url="e.html" title="Life events" />

        <GoANavigationLink url="f.html" title="Business and economy" />
        <GoANavigationLink url="g.html" title="Emergencies and public safety" />
        <GoANavigationLink url="h.html" title="Government" />
        <GoANavigationLink url="i.html" title="Jobs and employment" />
        <GoANavigationLink url="j.html" title="Moving to Alberta" />

        <GoANavigationLink url="k.html" title="Driving and transportation" />
        <GoANavigationLink url="l.html" title="Environment" />
        <GoANavigationLink url="m.html" title="Health" />
        <GoANavigationLink url="n.html" title="Law and justice" />
        <GoANavigationLink url="o.html" title="Parks and recreation" />

        <GoANavigationLink  url="instagram.html" title="Instagram" />
        <GoANavigationLink  url="youtube.html" title="YouTube" />
        <GoANavigationLink  url="facebook.html" title="Facebook" />
        <GoANavigationLink  url="snapchat.html" title="Snapchat" />
        <GoANavigationLink  url="twitter.html" title="Twitter" />
      </GoAAppFooter>
    </>
  );
}

export default App;
