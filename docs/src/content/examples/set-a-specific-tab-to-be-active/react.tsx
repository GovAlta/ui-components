import {
  GoabxBadge,
  GoabxButton,
  GoabxTable,
  GoabxTabs,
} from "@abgov/react-components/experimental";
import { GoabTab } from "@abgov/react-components";

export function SetASpecificTabToBeActive() {
  const review = [0, 1, 2, 3];
  const complete = [0, 1];

  return (
    <GoabxTabs initialTab={2}>
      <GoabTab heading="All">
        <GoabxTable width="100%">
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
                  <GoabxBadge type="important" content="Review pending" />
                </td>
                <td>Lorem Ipsum</td>
                <td className="goa-table-number-column">1234567890</td>
                <td>
                  <GoabxButton type="tertiary" size="compact">
                    Action
                  </GoabxButton>
                </td>
              </tr>
            ))}
            {complete.map((i) => (
              <tr key={`complete-${i}`}>
                <td>
                  <GoabxBadge type="information" content="Complete" />
                </td>
                <td>Lorem Ipsum</td>
                <td className="goa-table-number-column">1234567890</td>
                <td>
                  <GoabxButton type="tertiary" size="compact">
                    Action
                  </GoabxButton>
                </td>
              </tr>
            ))}
          </tbody>
        </GoabxTable>
      </GoabTab>
      <GoabTab
        heading={
          <>
            Review pending
            <GoabxBadge type="important" content="4" icon={false} />
          </>
        }
      >
        <GoabxTable width="100%">
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
                  <GoabxBadge type="important" content="Review pending" />
                </td>
                <td>Lorem Ipsum</td>
                <td className="goa-table-number-column">1234567890</td>
                <td>
                  <GoabxButton type="tertiary" size="compact">
                    Action
                  </GoabxButton>
                </td>
              </tr>
            ))}
          </tbody>
        </GoabxTable>
      </GoabTab>
      <GoabTab
        heading={
          <>
            Complete
            <GoabxBadge type="information" content="338" icon={false} />
          </>
        }
      >
        <GoabxTable width="100%">
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
                  <GoabxBadge type="information" content="Complete" />
                </td>
                <td>Lorem Ipsum</td>
                <td className="goa-table-number-column">1234567890</td>
                <td>
                  <GoabxButton type="tertiary" size="compact">
                    Action
                  </GoabxButton>
                </td>
              </tr>
            ))}
          </tbody>
        </GoabxTable>
      </GoabTab>
    </GoabxTabs>
  );
}
