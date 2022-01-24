import { GoABadge, GoAButton, GoAInput, GoANotification } from "@abgov/react-components";
export function App() {
  return (
    <main>
      <h1>React Demo App</h1>
      <GoAInput type="text" name="some-name" value="Hello" onChange={() => null}></GoAInput>
      <GoAButton onClick={() => console.log('you clicked')} type="primary">Button</GoAButton>

      <GoABadge content="Dark" type="dark"></GoABadge>

      <GoANotification type="information">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi saepe, maiores, praesentium minus quod reprehenderit consequuntur earum molestias aliquid amet, vitae eveniet harum incidunt sint. Numquam debitis molestias officia corporis.
      </GoANotification>
    </main>
  );
}

export default App;
