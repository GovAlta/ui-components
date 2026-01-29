import {
  GoabBlock,
  GoabDivider,
  GoabText,
  GoabTabs,
  GoabTab,
  GoabTable,
  GoabBadge,
  GoabButton,
} from "@abgov/react-components";

export default function Feat3306Component() {
  const review = [0, 1, 2, 3];
  const complete = [0, 1];

  return (
    <GoabBlock direction="column" gap="l">
      <GoabBlock direction="column" gap="s">
        <GoabText tag="h1" mb="0" mt="0">
          <a
            href="https://github.com/GovAlta/ui-components/issues/3306"
            rel="noreferrer"
            target="_blank"
          >
            3306
          </a>{" "}
        </GoabText>
        <GoabText tag="p">
          Add ability to set the `slug` for a Tab component. This slug value will work for
          tabs that use a string `heading` value as well as when a `heading` slot is
          defined.
        </GoabText>
      </GoabBlock>

      <GoabDivider mt="xl" mb="xl" />

      {/* Add feature implementation here */}
      <GoabTabs initialTab={1}>
        <GoabTab heading="All" slug="all">
          <GoabTable width="100%">
            <thead>
              <tr>
                <th>Status</th>
                <th>Text</th>
                <th className="goa-table-number-header">Number</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {review.map((i) => (
                <tr key={i}>
                  <td>
                    <GoabBadge type="important" content="Review pending" />
                  </td>
                  <td>Lorem Ipsum</td>
                  <td className="goa-table-number-column">1234567890</td>
                  <td>
                    <GoabButton type="tertiary">Action</GoabButton>
                  </td>
                </tr>
              ))}
              {complete.map((i) => (
                <tr key={i}>
                  <td>
                    <GoabBadge type="information" content="Complete" />
                  </td>
                  <td>Lorem Ipsum</td>
                  <td className="goa-table-number-column">1234567890</td>
                  <td>
                    <GoabButton type="tertiary">Action</GoabButton>
                  </td>
                </tr>
              ))}
            </tbody>
          </GoabTable>
        </GoabTab>
        <GoabTab
          slug="review-pending"
          heading={
            <>
              Review pending<GoabBadge type="important" content="4"></GoabBadge>
            </>
          }
        >
          There should be a slug here
          <GoabTable width="100%">
            <thead>
              <tr>
                <th>Status</th>
                <th>Text</th>
                <th className="goa-table-number-header">Number</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {review.map((i) => (
                <tr key={i}>
                  <td>
                    <GoabBadge type="important" content="Review pending" />
                  </td>
                  <td>Lorem Ipsum</td>
                  <td className="goa-table-number-column">1234567890</td>
                  <td>
                    <GoabButton type="tertiary">Action</GoabButton>
                  </td>
                </tr>
              ))}
            </tbody>
          </GoabTable>
        </GoabTab>
        <GoabTab
          heading={
            <>
              Complete<GoabBadge type="information" content="338"></GoabBadge>
            </>
          }
        >
          <GoabTable width="100%">
            <thead>
              <tr>
                <th>Status</th>
                <th>Text</th>
                <th className="goa-table-number-header">Number</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {complete.map((i) => (
                <tr key={i}>
                  <td>
                    <GoabBadge type="information" content="Complete" />
                  </td>
                  <td>Lorem Ipsum</td>
                  <td className="goa-table-number-column">1234567890</td>
                  <td>
                    <GoabButton type="tertiary">Action</GoabButton>
                  </td>
                </tr>
              ))}
            </tbody>
          </GoabTable>
        </GoabTab>
      </GoabTabs>

      <GoabDivider mt="xl" mb="xl" />

      <GoabText tag="h3">Test: Two Tab Sets on Same Page</GoabText>
      <GoabText tag="p">
        Second tab set with <code>initialTab=2</code> and different slugs.
      </GoabText>

      <GoabTabs initialTab={2}>
        <GoabTab heading="Dashboard" slug="second-dashboard">
          <GoabText>Content for Dashboard tab (second set)</GoabText>
        </GoabTab>
        <GoabTab heading="Settings" slug="second-settings">
          <GoabText>
            Content for Settings tab (second set) - This should be initially selected
          </GoabText>
        </GoabTab>
        <GoabTab heading="Profile" slug="second-profile">
          <GoabText>Content for Profile tab (second set)</GoabText>
        </GoabTab>
      </GoabTabs>
    </GoabBlock>
  );
}
