import { GoabContainer, GoabText, GoabBlock } from "@abgov/react-components";

export function Feat2328Route() {
  return (
    <main>
      <GoabText tag="h1" mb="m">
        Container height scenarios
      </GoabText>
      <GoabBlock gap="l" direction="column">
        <GoabText tag="h2" mb="m">
          No maxHeight or minHeight
        </GoabText>
        <GoabBlock gap="l">
          <GoabContainer maxWidth="400px">
            <p>Basic simple text to extend to 400px width</p>
          </GoabContainer>
          <GoabContainer maxWidth="400px">
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus at ornare
              velit. Duis mi est, hendrerit sit amet eleifend nec, faucibus non nisl.
              Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere
              cubilia curae; Sed ornare odio odio, quis iaculis mi ultricies a. Sed
              vehicula, ante sit amet porttitor sollicitudin, arcu mi pharetra enim,
              aliquam posuere sapien odio in nisi. Curabitur congue odio quam, a fringilla
              metus ullamcorper vel. Nulla magna urna, ultrices eu nibh ac, dictum
              pulvinar justo. Nam porta massa pulvinar, congue turpis eget, finibus nulla.
              Suspendisse potenti. Class aptent taciti sociosqu ad litora torquent per
              conubia nostra, per inceptos himenaeos. Cras quis risus libero.
            </p>
          </GoabContainer>
        </GoabBlock>
        <GoabText tag="h2" mb="m">
          minHeight 300px or equivalent
        </GoabText>
        <GoabBlock gap="l">
          <GoabContainer maxWidth="400px" minHeight="300px">
            <p>Basic simple text to extend to 400px width</p>
          </GoabContainer>
          <GoabContainer maxWidth="400px" minHeight="31ch">
            <p>31ch</p>
            <p>Basic simple text to extend to 400px width</p>
          </GoabContainer>
          <GoabContainer maxWidth="400px" minHeight="19rem">
            <p>19rem</p>
            <p>Basic simple text to extend to 400px width</p>
          </GoabContainer>
        </GoabBlock>
        <GoabText tag="h2" mb="m">
          maxHeight 300px or equivalent
        </GoabText>
        <GoabBlock gap="l">
          <GoabContainer maxWidth="400px" maxHeight="300px">
            <p>Basic simple text to extend to 400px width</p>
          </GoabContainer>
          <GoabContainer maxWidth="400px" maxHeight="31ch">
            <p>31ch</p>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus at ornare
              velit. Duis mi est, hendrerit sit amet eleifend nec, faucibus non nisl.
              Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere
              cubilia curae; Sed ornare odio odio, quis iaculis mi ultricies a. Sed
              vehicula, ante sit amet porttitor sollicitudin, arcu mi pharetra enim,
              aliquam posuere sapien odio in nisi. Curabitur congue odio quam, a fringilla
              metus ullamcorper vel. Nulla magna urna, ultrices eu nibh ac, dictum
              pulvinar justo. Nam porta massa pulvinar, congue turpis eget, finibus nulla.
              Suspendisse potenti. Class aptent taciti sociosqu ad litora torquent per
              conubia nostra, per inceptos himenaeos. Cras quis risus libero.
            </p>
          </GoabContainer>
          <GoabContainer maxWidth="400px" maxHeight="19rem">
            <p>19rem</p>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus at ornare
              velit. Duis mi est, hendrerit sit amet eleifend nec, faucibus non nisl.
              Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere
              cubilia curae; Sed ornare odio odio, quis iaculis mi ultricies a. Sed
              vehicula, ante sit amet porttitor sollicitudin, arcu mi pharetra enim,
              aliquam posuere sapien odio in nisi. Curabitur congue odio quam, a fringilla
              metus ullamcorper vel. Nulla magna urna, ultrices eu nibh ac, dictum
              pulvinar justo. Nam porta massa pulvinar, congue turpis eget, finibus nulla.
              Suspendisse potenti. Class aptent taciti sociosqu ad litora torquent per
              conubia nostra, per inceptos himenaeos. Cras quis risus libero.
            </p>
          </GoabContainer>
        </GoabBlock>

        <GoabText tag="h2" mb="m">
          minHeight 300px and maxHeight 400px or equivalent
        </GoabText>
        <GoabBlock gap="l">
          <GoabContainer maxWidth="400px" minHeight="300px" maxHeight="400px">
            <p>Basic simple text to extend to 400px width</p>
          </GoabContainer>
          <GoabContainer maxWidth="400px" minHeight="31ch" maxHeight="41ch">
            <p>31ch and 41ch</p>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus at ornare
              velit. Duis mi est, hendrerit sit amet eleifend nec, faucibus non nisl.
              Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere
              cubilia curae; Sed ornare odio odio, quis iaculis mi ultricies a. Sed
              vehicula, ante sit amet porttitor sollicitudin, arcu mi pharetra enim,
              aliquam posuere sapien odio in nisi. Curabitur congue odio quam, a fringilla
              metus ullamcorper vel. Nulla magna urna, ultrices eu nibh ac, dictum
              pulvinar justo. Nam porta massa pulvinar, congue turpis eget, finibus nulla.
              Suspendisse potenti. Class aptent taciti sociosqu ad litora torquent per
              conubia nostra, per inceptos himenaeos. Cras quis risus libero.
            </p>
          </GoabContainer>
          <GoabContainer maxWidth="400px" minHeight="19rem" maxHeight="25rem">
            <p>19rem and 25rem</p>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus at ornare
              velit. Duis mi est, hendrerit sit amet eleifend nec, faucibus non nisl.
              Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere
              cubilia curae; Sed ornare odio odio, quis iaculis mi ultricies a. Sed
              vehicula, ante sit amet porttitor sollicitudin, arcu mi pharetra enim,
              aliquam posuere sapien odio in nisi. Curabitur congue odio quam, a fringilla
              metus ullamcorper vel. Nulla magna urna, ultrices eu nibh ac, dictum
              pulvinar justo. Nam porta massa pulvinar, congue turpis eget, finibus nulla.
              Suspendisse potenti. Class aptent taciti sociosqu ad litora torquent per
              conubia nostra, per inceptos himenaeos. Cras quis risus libero.
            </p>
          </GoabContainer>
        </GoabBlock>
      </GoabBlock>
    </main>
  );
}

export default Feat2328Route;
