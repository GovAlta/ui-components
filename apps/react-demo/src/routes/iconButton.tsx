import { GoAIconButton } from "@abgov/react-components";

export default function IconButton() {
  return (
    <>
      <h1>Icon Button</h1>

      <h2>Types</h2>
      <GoAIconButton
        icon="airplane"
        onClick={() => console.log("clicked")}
      ></GoAIconButton>
      <GoAIconButton
        icon="close"
        onClick={() => console.log("clicked")}
      ></GoAIconButton>
      <GoAIconButton
        icon="refresh"
        onClick={() => console.log("clicked")}
      ></GoAIconButton>
      <GoAIconButton
        icon="play-back"
        onClick={() => console.log("clicked")}
      ></GoAIconButton>

      <h2>Sizes</h2>
      <GoAIconButton icon="close" size="small"></GoAIconButton>
      <GoAIconButton icon="close" size="medium"></GoAIconButton>
      <GoAIconButton icon="close" size="large"></GoAIconButton>

      <h2>Variant</h2>
      <GoAIconButton icon="close" variant="color"></GoAIconButton>
      <GoAIconButton icon="close" variant="nocolor"></GoAIconButton>

      <h2>Title</h2>
      <GoAIconButton icon="close" title="Close"></GoAIconButton>
      <GoAIconButton icon="download" title="Download"></GoAIconButton>

      <h2>Disabled</h2>
      <GoAIconButton icon="close" disabled></GoAIconButton>
      <GoAIconButton icon="download" disabled></GoAIconButton>
    </>
  );
}
