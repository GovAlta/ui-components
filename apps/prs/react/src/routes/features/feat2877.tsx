import React from "react";
import {
  GoabBadge,
  // GoabLink,
  GoabBlock,
  GoabText,
  GoabOneColumnLayout,
  GoabPageBlock,
  GoabDivider,
} from "@abgov/react-components";
import { Link } from "react-router-dom";

export function Feat2877Route() {
  return (
    <GoabPageBlock width="full">
      <GoabOneColumnLayout>
        <GoabBlock direction="column" gap="l">
          <goa-link mt={"xl"} leadingicon={"arrow-back"}>
            <Link to="/">Back</Link>
          </goa-link>
          <GoabText tag="h1" size="heading-l" mb={"m"}>
            PR 2877 - Badge Icon Property Testing
          </GoabText>

          <GoabDivider />

          {/* Critical Test Cases for the Fix */}
          <GoabText tag="h2" size="heading-m" mt="xl" mb="m">
            Icon Boolean Handling
          </GoabText>

          <GoabBlock direction="column" gap="m" mb="xl">
            <GoabText size="body-s" mb="s">
              Test 1: icon=&#123;true&#125; - Should show icon
            </GoabText>
            <GoabBadge type="information" content="Icon True" icon={true} />

            <GoabText size="body-s" mb="s" mt="m">
              Test 2: icon=&#123;false&#125; - Should NOT show icon
            </GoabText>
            <GoabBadge type="success" content="Icon False" icon={false} />

            <GoabText size="body-s" mb="s" mt="m">
              Test 3: icon prop not provided - Should NOT show icon (default behavior)
            </GoabText>
            <GoabBadge type="important" content="Icon Not provided" />

            <GoabText size="body-s" mb="s" mt="m">
              Test 4: icon=&#123;undefined&#125; - Should NOT show icon (same as not
              provided)
            </GoabText>
            <GoabBadge type="emergency" content="Icon Undefined" icon={undefined} />
          </GoabBlock>

          <GoabDivider />

          {/* Custom Icon Type Tests */}
          <GoabText tag="h2" size="heading-m" mt="xl" mb="m">
            Custom Icon Type Tests
          </GoabText>

          <GoabBlock direction="column" gap="m" mb="xl">
            <GoabText size="body-s" mb="s">
              Test 5: iconType="home" (no icon prop) - Should show custom home icon
            </GoabText>
            <GoabBadge type="information" content="Home Icon" iconType="home" />

            <GoabText size="body-s" mb="s" mt="m">
              Test 6: iconType="star" + icon=&#123;false&#125; - Should hide icon (false
              overrides iconType)
            </GoabText>
            <GoabBadge
              type="success"
              content="Hidden Custom"
              icon={false}
              iconType="star"
            />

            <GoabText size="body-s" mb="s" mt="m">
              Test 7: iconType="star" + icon=&#123;true&#125; - Should show custom star
              icon
            </GoabText>
            <GoabBadge type="important" content="Star Icon" icon={true} iconType="star" />
          </GoabBlock>

          <GoabDivider />

          {/* New Badge Types */}
          <GoabText tag="h2" size="heading-m" mt="xl" mb="m">
            New Badge Types
          </GoabText>

          <GoabBlock direction="row" gap="m" mb="xl">
            <GoabBadge type="archived" content="Archived" />
            <GoabBadge type="aqua" content="Aqua" />
            <GoabBadge type="black" content="Black" />
            <GoabBadge type="blue" content="Blue" />
            <GoabBadge type="green" content="Green" />
            <GoabBadge type="orange" content="Orange" />
            <GoabBadge type="pink" content="Pink" />
            <GoabBadge type="red" content="Red" />
            <GoabBadge type="violet" content="Violet" />
            <GoabBadge type="white" content="White" />
            <GoabBadge type="yellow" content="Yellow" />
          </GoabBlock>

          <GoabText tag="h3" size="heading-s" mt="l" mb="m">
            Light Variants
          </GoabText>

          <GoabBlock direction="row" gap="m" mb="xl">
            <GoabBadge type="aqua-light" content="Aqua Light" />
            <GoabBadge type="black-light" content="Black Light" />
            <GoabBadge type="blue-light" content="Blue Light" />
            <GoabBadge type="green-light" content="Green Light" />
            <GoabBadge type="orange-light" content="Orange Light" />
            <GoabBadge type="pink-light" content="Pink Light" />
            <GoabBadge type="red-light" content="Red Light" />
            <GoabBadge type="violet-light" content="Violet Light" />
            <GoabBadge type="yellow-light" content="Yellow Light" />
          </GoabBlock>

          <GoabDivider />

          {/* Edge Cases */}
          <GoabText tag="h2" size="heading-m" mt="xl" mb="m">
            Edge Cases
          </GoabText>

          <GoabBlock direction="column" gap="m" mb="xl">
            <GoabText size="body-s" mb="s">
              Badge with no content (icon only)
            </GoabText>
            <GoabBadge type="information" icon={true} />

            <GoabText size="body-s" mb="s" mt="m">
              Badge with no content and icon=&#123;false&#125;
            </GoabText>
            <GoabBadge type="success" icon={false} />

            <GoabText size="body-s" mb="s" mt="m">
              Badge with custom icon and no content
            </GoabText>
            <GoabBadge type="important" iconType="calculator" />
          </GoabBlock>

          <GoabDivider mb={"3xl"} />
        </GoabBlock>
      </GoabOneColumnLayout>
    </GoabPageBlock>
  );
}
