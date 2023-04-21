import {
  GoAPopover,
  GoAButtonGroup,
  GoAButton,
  GoASpacer,
  GoABlock,
} from "@abgov/react-components";

export default function Popover() {
  return (
    <>
      <h2>Popover</h2>
      <h3>Basic</h3>
      <GoAPopover>
        <h3>interactable content</h3>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi tempora
          optio illum iste consectetur harum vel voluptatem eos quos deleniti,
          sequi sapiente porro culpa repellendus eligendi in architecto natus
          omnis. Lorem ipsum dolor sit amet consectetur adipisicing elit.
          Repudiandae, nam corporis. Omnis tempora non aspernatur nostrum
          pariatur quibusdam magni eum vitae similique, laboriosam reiciendis
          repellat sapiente. Nobis laudantium facilis incidunt!
        </p>
        <GoAButtonGroup alignment="start">
          <GoAButton type="primary">Primary</GoAButton>
          <GoAButton type="submit">Submit</GoAButton>
          <GoAButton type="secondary">Secondary</GoAButton>
        </GoAButtonGroup>
        <div slot="target" style={{ whiteSpace: "nowrap" }}>
          <GoAButton type="secondary" size="compact">
            Open Popover
          </GoAButton>
        </div>
      </GoAPopover>

      <h3>Dynamic Positioning</h3>
      <GoABlock direction="column" gap="4xl">
        <div style={{ width: "100%", display: "flex" }}>
          <GoAPopover>
            <span>This</span>
            <div slot="target" style={{ whiteSpace: "nowrap" }}>
              <GoAButton type="secondary" size="compact">
                Click me
              </GoAButton>
            </div>
          </GoAPopover>
          <GoASpacer hSpacing="fill"></GoASpacer>
          <GoAPopover maxWidth="500px">
            <span>
              Lorem ipsum dolor sit amet consectetur, adipisicing elit.
              Obcaecati sapiente natus, asperiores qui eligendi reiciendis.
              Porro placeat qui laboriosam minus nihil nam aliquam
              necessitatibus! Doloremque corrupti quia ex eligendi deserunt.
            </span>
            <div slot="target" style={{ whiteSpace: "nowrap" }}>
              <GoAButton type="secondary" size="compact">
                Click me
              </GoAButton>
            </div>
          </GoAPopover>
        </div>
        <div style={{ width: "100%", display: "flex" }}>
          <GoASpacer hSpacing="fill"></GoASpacer>
          <GoAPopover>
            <h3>This is a popover</h3>
            <p>It can be used for a number of different contexts.</p>
            <div slot="target" style={{ whiteSpace: "nowrap" }}>
              <GoAButton type="secondary" size="compact">
                Click me
              </GoAButton>
            </div>
          </GoAPopover>
          <GoASpacer hSpacing="fill"></GoASpacer>
        </div>
        <div style={{ width: "100%", display: "flex" }}>
          <GoAPopover>
            <h3>This is a popover</h3>
            <p>
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quas
              optio debitis, dicta sequi dignissimos odio quis aliquam
              voluptatibus nihil officiis iusto nobis consequuntur quia non
              ducimus totam ratione? Earum, mollitia.
            </p>
            <div slot="target" style={{ whiteSpace: "nowrap" }}>
              <GoAButton type="secondary" size="compact">
                Click me
              </GoAButton>
            </div>
          </GoAPopover>
          <GoASpacer hSpacing="fill"></GoASpacer>
          <GoAPopover maxWidth="500px">
            <h3>This is a popover</h3>
            <p>
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Minus
              eligendi consectetur ullam recusandae! Eveniet, earum sequi aut
              iure et quia? Hic, ipsa perferendis. Et reprehenderit consequatur
              quod minus illo amet!
            </p>
            <div slot="target" style={{ whiteSpace: "nowrap" }}>
              <GoAButton type="secondary" size="compact">
                Click me
              </GoAButton>
            </div>
          </GoAPopover>
        </div>
      </GoABlock>
    </>
  );
}
