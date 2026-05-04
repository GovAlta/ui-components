import {
  GoabBadge,
  GoabButton,
  GoabTab,
  GoabTable,
  GoabTabs,
} from "@abgov/react-components";

export function SetASpecificTabToBeActive() {
  const review = [0, 1, 2, 3];
  const complete = [0, 1];

  return (
    <GoabTabs initialTab={2}>
      <GoabTab heading="All">
        <GoabTable width="100%">
          <thead>
            <tr>
              <th>Status</th>
              <th>Text</th>
              <th className="goa-table-number-header">Number</th>
              <th style={{ width: "1%", whiteSpace: "nowrap" }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {review.map((i) => (
              <tr key={`review-${i}`}>
                <td>
                  <GoabBadge type="important" content="Review pending" />
                </td>
                <td>Lorem Ipsum</td>
                <td className="goa-table-number-column">1234567890</td>
                <td>
                  <GoabButton type="tertiary" size="compact">
                    Action
                  </GoabButton>
                </td>
              </tr>
            ))}
            {complete.map((i) => (
              <tr key={`complete-${i}`}>
                <td>
                  <GoabBadge type="information" content="Complete" />
                </td>
                <td>Lorem Ipsum</td>
                <td className="goa-table-number-column">1234567890</td>
                <td>
                  <GoabButton type="tertiary" size="compact">
                    Action
                  </GoabButton>
                </td>
              </tr>
            ))}
          </tbody>
        </GoabTable>
      </GoabTab>
      <GoabTab
        heading={
          <>
            Review pending
            <GoabBadge type="important" content="4" icon={false} />
          </>
        }
      >
        <GoabTable width="100%">
          <thead>
            <tr>
              <th>Status</th>
              <th>Text</th>
              <th className="goa-table-number-header">Number</th>
              <th style={{ width: "1%", whiteSpace: "nowrap" }}>Action</th>
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
                  <GoabButton type="tertiary" size="compact">
                    Action
                  </GoabButton>
                </td>
              </tr>
            ))}
          </tbody>
        </GoabTable>
      </GoabTab>
      <GoabTab
        heading={
          <>
            Complete
            <GoabBadge type="information" content="338" icon={false} />
          </>
        }
      >
        <GoabTable width="100%">
          <thead>
            <tr>
              <th>Status</th>
              <th>Text</th>
              <th className="goa-table-number-header">Number</th>
              <th style={{ width: "1%", whiteSpace: "nowrap" }}>Action</th>
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
                  <GoabButton type="tertiary" size="compact">
                    Action
                  </GoabButton>
                </td>
              </tr>
            ))}
          </tbody>
        </GoabTable>
      </GoabTab>
    </GoabTabs>
  );
}
