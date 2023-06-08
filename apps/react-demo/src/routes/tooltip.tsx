import { GoAButton, GoATooltip, GoAIcon } from "@abgov/react-components";

export default function Tooltip() {
  const positions = ["top", "bottom", "right", "left"];
  const alignments = ["right", "left"];

  return (
    <>
      <h2>Tooltip</h2>

      <h3>Tooltip with GoAIcon</h3>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          flexWrap: "wrap",
          justifyContent: "space-between",
        }}
      >
        {positions.map((position) =>
          position === "top" || position === "bottom" ? (
            alignments.map((align) => (
              <div key={position + align} style={{ margin: "10px" }}>
                <GoATooltip
                  content={`This is a ${position} tooltip with ${align} alignment`}
                  position={position}
                  hAlign={align}
                >
                  <GoAIcon type="information-circle" />
                </GoATooltip>
              </div>
            ))
          ) : (
            <div key={position} style={{ margin: "10px" }}>
              <GoATooltip
                content={`This is a ${position} tooltip`}
                position={position}
              >
                <GoAIcon type="information-circle" />
              </GoATooltip>
            </div>
          )
        )}
      </div>

      <h3>Tooltip with GoAButton</h3>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          flexWrap: "wrap",
          justifyContent: "space-between",
        }}
      >
        {positions.map((position) =>
          position === "top" || position === "bottom" ? (
            alignments.map((align) => (
              <div key={position + align} style={{ margin: "10px" }}>
                <GoATooltip
                  content={`Hover me for a ${position} tooltip with ${align} alignment`}
                  position={position}
                  hAlign={align}
                >
                  <GoAButton type="secondary">{`${
                    position.charAt(0).toUpperCase() + position.slice(1)
                  } Hover me`}</GoAButton>
                </GoATooltip>
              </div>
            ))
          ) : (
            <div key={position} style={{ margin: "10px" }}>
              <GoATooltip
                content={`Hover me for a ${position} tooltip`}
                position={position}
              >
                <GoAButton type="secondary">{`${
                  position.charAt(0).toUpperCase() + position.slice(1)
                } Hover me`}</GoAButton>
              </GoATooltip>
            </div>
          )
        )}
      </div>
    </>
  );
}
