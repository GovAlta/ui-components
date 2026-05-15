import { useState } from "react";
import {
  GoabContainer,
  GoabBadge,
  GoabGrid,
  GoabLink,
  GoabText,
  GoabBlock,
  GoabButton,
  GoabModal,
  GoabButtonGroup,
  GoabFormItem,
  GoabDatePicker,
  GoabTable,
  GoabDropdown,
  GoabDropdownItem,
  GoabRadioGroup,
  GoabRadioItem,
  GoabTextArea,
  GoabTooltip,
  GoabInput,
  GoabFilterChip,
} from "@abgov/react-components";
import { GoabDatePickerOnChangeDetail } from "@abgov/ui-components-common";
import "./container.css";

export function DocsContainerRoute() {
  const [open, setOpen] = useState(false);
  const [effectiveDate, setEffectiveDate] = useState<Date | undefined>(new Date());
  const [typedChips, setTypedChips] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState("");

  const onChangeEffectiveDate = (detail: GoabDatePickerOnChangeDetail) => {
    setEffectiveDate(detail.value as Date);
  };

  const addChip = () => {
    if (inputValue.trim()) {
      setTypedChips([...typedChips, inputValue.trim()]);
      setInputValue("");
    }
  };

  const handleAddToCalendar = () => {
    console.log("Add to calendar clicked");
  };

  return (
    <div>
      <h2>Container</h2>

      <h3>Basic</h3>
      <GoabContainer>
        <h3>Page content</h3>
        <p>Content within the container has consistent padding and max-width.</p>
      </GoabContainer>

      <h3>Container type</h3>
      <GoabContainer type="non-interactive" mb="m">
        <p>Non-interactive content container</p>
      </GoabContainer>
      <GoabContainer type="interactive" mb="m">
        <p>Interactive container</p>
      </GoabContainer>
      <GoabContainer type="info" mb="m">
        <p>Informational container</p>
      </GoabContainer>
      <GoabContainer type="error" mb="m">
        <p>Error container</p>
      </GoabContainer>
      <GoabContainer type="success" mb="m">
        <p>Success container</p>
      </GoabContainer>
      <GoabContainer type="important">
        <p>Important container</p>
      </GoabContainer>

      <h3>Accent styles</h3>
      <GoabContainer accent="filled" mb="m">
        <p>Filled accent (default)</p>
      </GoabContainer>
      <GoabContainer accent="thick" mb="m">
        <p>Thick accent bar</p>
      </GoabContainer>
      <GoabContainer accent="thin">
        <p>Thin accent bar</p>
      </GoabContainer>

      <h3>With heading</h3>
      <GoabContainer accent="thick" type="non-interactive" title="Application details">
        <p>Container content with a heading using the title prop.</p>
      </GoabContainer>

      <h3>With heading and status</h3>
      <GoabContainer
        type="non-interactive"
        accent="thick"
        title="Heading"
        actions={<GoabBadge type="important" content="Priority" />}
      >
        Content
      </GoabContainer>

      <h3>Padding</h3>
      <GoabContainer padding="relaxed" mb="m">
        <p>Relaxed padding (default)</p>
      </GoabContainer>
      <GoabContainer padding="compact">
        <p>Compact padding for tighter layouts</p>
      </GoabContainer>

      <h3>Width</h3>
      <GoabContainer width="full" mb="m">
        <p>Full width (default) stretches to fill available space</p>
      </GoabContainer>
      <GoabContainer width="content">
        <p>Content width fits to content</p>
      </GoabContainer>

      <h3>Max height</h3>
      <GoabContainer maxHeight="150px">
        <p>This container has a maximum height of 150px.</p>
        <p>When the content exceeds the max height, the container becomes scrollable.</p>
        <p>This is useful for sections with variable content length.</p>
        <p>Additional content here to demonstrate scrolling behavior.</p>
      </GoabContainer>

      <h2>Examples</h2>

      <h3>Card grid</h3>
      <GoabGrid gap="xl" minChildWidth="320px">
        <GoabContainer accent="thin" mb="none">
          <GoabLink size="large" mb="m">
            <a href="#">Waitlist submission</a>
          </GoabLink>
          <GoabText mt="none" mb="none">
            Enter and maintain information about the households waiting for affordable
            housing with your organization.
          </GoabText>
        </GoabContainer>

        <GoabContainer accent="thin" mb="none">
          <GoabLink size="large" mb="m">
            <a href="#">Lodge assistance program</a>
          </GoabLink>
          <GoabText mt="none" mb="none">
            Keep track of the individuals who are placed in lodges and may qualify for the
            Lodge Assistance Program subsidy.
          </GoabText>
        </GoabContainer>

        <GoabContainer accent="thin" mb="none">
          <GoabLink size="large" mb="m">
            <a href="#">Education Support</a>
          </GoabLink>
          <GoabText mt="none" mb="none">
            Explore educational resources, enroll in courses, and track your academic
            progress effortlessly.
          </GoabText>
        </GoabContainer>

        <GoabContainer accent="thin" mb="none">
          <GoabLink size="large" mb="m">
            <a href="#">Social Assistance</a>
          </GoabLink>
          <GoabText mt="none" mb="none">
            Learn about available support programs, apply for financial aid, and access
            community resources.
          </GoabText>
        </GoabContainer>

        <GoabContainer accent="thin" mb="none">
          <GoabLink size="large" mb="m">
            <a href="#">Employment Opportunity</a>
          </GoabLink>
          <GoabText mt="none" mb="none">
            Search for job openings, access career development tools, and receive
            employment-related updates.
          </GoabText>
        </GoabContainer>

        <GoabContainer accent="thin" mb="none">
          <GoabLink size="large" mb="m">
            <a href="#">Housing Assistance</a>
          </GoabLink>
          <GoabText mt="none" mb="none">
            Find affordable housing options, apply for housing subsidies, and report
            maintenance issues seamlessly.
          </GoabText>
        </GoabContainer>
      </GoabGrid>

      <h3>Card view of case files</h3>
      <GoabContainer mt="l">
        <div className="case-file-row">
          <GoabBlock direction="column" gap="2xs">
            <GoabText size="heading-xs" mt="none" mb="2xs">
              Fiscal year: 2021/2022
            </GoabText>
            <GoabText size="body-s" mt="none" mb="none">
              Submitted: April 23, 2023
            </GoabText>
          </GoabBlock>
          <GoabBlock direction="row" gap="l" alignment="center">
            <GoabBadge type="default" content="Not started" />
            <GoabButton type="tertiary" size="compact">
              Start
            </GoabButton>
          </GoabBlock>
        </div>
      </GoabContainer>

      <GoabContainer>
        <div className="case-file-row">
          <GoabBlock direction="column" gap="2xs">
            <GoabText size="heading-xs" mt="none" mb="2xs">
              Fiscal year: 2020/2021
            </GoabText>
            <GoabText size="body-s" mt="none" mb="none">
              Submitted: April 9, 2022
            </GoabText>
          </GoabBlock>
          <GoabBlock direction="row" gap="l" alignment="center">
            <GoabBadge type="important" content="Information needed" />
            <GoabButton type="tertiary" size="compact">
              Edit
            </GoabButton>
          </GoabBlock>
        </div>
      </GoabContainer>

      <GoabContainer>
        <div className="case-file-row">
          <GoabBlock direction="column" gap="2xs">
            <GoabText size="heading-xs" mt="none" mb="2xs">
              Fiscal year: 2019/2020
            </GoabText>
            <GoabText size="body-s" mt="none" mb="none">
              Submitted: April 14, 2021
            </GoabText>
          </GoabBlock>
          <GoabBlock direction="row" gap="l" alignment="center">
            <GoabBadge type="success" content="Approved" />
            <GoabButton type="tertiary" size="compact">
              View
            </GoabButton>
          </GoabBlock>
        </div>
      </GoabContainer>

      <h3>Confirm a change</h3>
      <GoabButton onClick={() => setOpen(true)}>Save and continue</GoabButton>

      <GoabModal
        heading="Address has changed"
        open={open}
        onClose={() => setOpen(false)}
        actions={
          <GoabButtonGroup alignment="end">
            <GoabButton type="secondary" size="compact" onClick={() => setOpen(false)}>
              Undo address change
            </GoabButton>
            <GoabButton type="primary" size="compact" onClick={() => setOpen(false)}>
              Confirm
            </GoabButton>
          </GoabButtonGroup>
        }
      >
        <GoabContainer
          type="non-interactive"
          accent="filled"
          padding="compact"
          width="full"
        >
          <GoabText tag="h4" mt="none" mb="s">
            Before
          </GoabText>
          <GoabText mt="none">123456 78 Ave NW, Edmonton, Alberta</GoabText>
          <GoabText tag="h4" mt="none" mb="s">
            After
          </GoabText>
          <GoabText mt="none" mb="none">
            881 12 Ave NW, Edmonton, Alberta
          </GoabText>
        </GoabContainer>
        <GoabFormItem label="Effective date" mt="l">
          <GoabDatePicker
            onChange={onChangeEffectiveDate}
            name="effectiveDate"
            value={effectiveDate}
          />
        </GoabFormItem>
      </GoabModal>

      <h3>Display user information</h3>
      <GoabContainer>
        <GoabText tag="span" size="body-m" color="secondary" mt="none" mb="none">
          Housing Advisor
        </GoabText>
        <GoabText size="heading-m" mt="none" mb="s">
          Tracy Hero
        </GoabText>
        <GoabBlock direction="row" gap="s">
          <GoabBlock direction="column" gap="m">
            <GoabText tag="span" size="heading-xs" mt="none" mb="none">
              Email
            </GoabText>
            <GoabText tag="span" size="heading-xs" mt="none" mb="none">
              Phone
            </GoabText>
          </GoabBlock>
          <GoabBlock direction="column" gap="m">
            <GoabText tag="span" size="body-m" mt="none" mb="none">
              tracyhero@email.com
            </GoabText>
            <GoabText tag="span" size="body-m" mt="none" mb="none">
              283-203-4921
            </GoabText>
          </GoabBlock>
        </GoabBlock>
      </GoabContainer>

      <GoabContainer
        type="non-interactive"
        accent="thick"
        heading="Upcoming important due dates"
        actions={
          <GoabButton
            type="tertiary"
            size="compact"
            leadingIcon="calendar"
            onClick={handleAddToCalendar}
          >
            Add to calendar
          </GoabButton>
        }
      >
        <GoabTable width="100%" striped>
          <tbody>
            <tr>
              <td>Business plan submission</td>
              <td style={{ textAlign: "right" }}>June 30, 2024</td>
            </tr>
            <tr>
              <td>Annual review</td>
              <td style={{ textAlign: "right" }}>October 3, 2024</td>
            </tr>
            <tr>
              <td>Application submission</td>
              <td style={{ textAlign: "right" }}>December 20, 2024</td>
            </tr>
            <tr>
              <td>Application review</td>
              <td style={{ textAlign: "right" }}>January 3, 2025</td>
            </tr>
          </tbody>
        </GoabTable>
      </GoabContainer>

      <h3>Review and action</h3>
      <GoabGrid minChildWidth="315px">
        <GoabContainer accent="thin" type="non-interactive">
          <GoabText size="heading-m" mt="none" mb="m">
            Appearance details
          </GoabText>
          <GoabGrid minChildWidth="200px" gap="m">
            <GoabBlock direction="column" gap="xs">
              <GoabText size="body-s" color="secondary" mt="none" mb="none">
                Accused name
              </GoabText>
              <GoabText size="body-m" mt="none" mb="none">
                Doe, John Scott
              </GoabText>
            </GoabBlock>

            <GoabBlock direction="column" gap="xs">
              <GoabText size="body-s" color="secondary" mt="none" mb="none">
                Date of birth
              </GoabText>
              <GoabText size="body-m" mt="none" mb="none">
                Mar 14, 2021
              </GoabText>
            </GoabBlock>

            <GoabBlock direction="column" gap="xs">
              <GoabText size="body-s" color="secondary" mt="none" mb="none">
                Court location
              </GoabText>
              <GoabText size="body-m" mt="none" mb="none">
                Calgary
              </GoabText>
            </GoabBlock>

            <GoabBlock direction="column" gap="xs">
              <GoabText size="body-s" color="secondary" mt="none" mb="none">
                Upcoming appearance date(s)
              </GoabText>
              <GoabText size="body-m" mt="none" mb="none">
                Sep 20, 2021
              </GoabText>
            </GoabBlock>
          </GoabGrid>

          <GoabText size="heading-xs" mt="l" mb="s">
            Docket number{"(s)"} &amp; charges
          </GoabText>
          <GoabContainer type="non-interactive" padding="compact">
            <GoabText size="heading-xs" mt="none" mb="xs">
              {"1) 12345678"}
            </GoabText>
            <GoabText size="body-m" mt="none" mb="none">
              {"CC 334(1) - Theft under $5000"}
            </GoabText>
            <GoabText size="body-m" mt="none" mb="none">
              {"CC 268(1) - Aggravated assault"}
            </GoabText>
          </GoabContainer>

          <GoabContainer type="non-interactive" padding="compact">
            <GoabText size="heading-xs" mt="none" mb="xs">
              {"2) 12345678"}
            </GoabText>
            <GoabText size="body-m" mt="none" mb="none">
              {"CC 334(1) - Theft under $5000"}
            </GoabText>
            <GoabText size="body-m" mt="none" mb="none">
              {"CC 268(1) - Aggravated assault"}
            </GoabText>
          </GoabContainer>
        </GoabContainer>

        <GoabContainer accent="thin" width="content">
          <form>
            <GoabText size="heading-m" mt="none" mb="m">
              Adjournment request
            </GoabText>
            <GoabText size="body-m" mt="none" mb="none">
              Keep track of the individuals who are placed in lodges and may qualify for
              the Lodge Assistance Program subsidy.
            </GoabText>

            <GoabFormItem label="Case history and new request" mt="l">
              <GoabRadioGroup name="case" orientation="horizontal" onChange={() => { /* no-op */ }}>
                <GoabRadioItem value="grant" label="Grant" />
                <GoabRadioItem value="deny" label="Deny" />
              </GoabRadioGroup>
            </GoabFormItem>

            <GoabFormItem label="Reason to deny" mt="l">
              <GoabDropdown name="reason" width="100%" onChange={() => { /* no-op */ }}>
                <GoabDropdownItem value="1" label="Incomplete Application" />
                <GoabDropdownItem value="2" label="Eligibility Criteria Not Met" />
                <GoabDropdownItem value="3" label="Documentation Verification Failure" />
              </GoabDropdown>
            </GoabFormItem>

            <GoabFormItem label="Message" mt="l">
              <GoabTextArea
                name="message"
                rows={5}
                width="100%"
                value=""
                onChange={() => { /* no-op */ }}
              />
            </GoabFormItem>

            <GoabButton mt="xl" onClick={() => { /* no-op */ }}>
              Confirm adjournment
            </GoabButton>
          </form>
        </GoabContainer>
      </GoabGrid>

      <h3>Show full date in a tooltip</h3>
      <GoabContainer
        type="non-interactive"
        accent="thick"
        heading={
          <span>
            Joan Smith
            <GoabTooltip content="Nov 23, 2023 at 10:35 am">
              <span
                style={{
                  color: "var(--goa-color-text-secondary)",
                  font: "var(--goa-typography-body-xs)",
                }}
              >
                4 hours ago
              </span>
            </GoabTooltip>
          </span>
        }
      >
        <GoabText tag="p" size="body-m" mt="none" mb="none">
          Hover on the time it was added to see the full date and time.
        </GoabText>
      </GoabContainer>

      <h3>Show status on a card</h3>
      <GoabContainer
        type="non-interactive"
        accent="thick"
        heading="Heading"
        actions={<GoabBadge type="important" content="Priority" />}
      >
        Content
      </GoabContainer>

      <h3>Type to create a new filter</h3>
      <GoabFormItem label="Type to create a chip" mb="m">
        <GoabBlock gap="xs" direction="row">
          <div style={{ flex: 1 }}>
            <GoabInput
              name="chipInput"
              value={inputValue}
              onChange={(e) => setInputValue(e.value)}
              onKeyPress={(e) => {
                if (e.key === "Enter" && e.value.trim()) {
                  setTypedChips([...typedChips, e.value.trim()]);
                  setTimeout(() => setInputValue(""), 0);
                } else if (e.key === "Backspace" && !e.value.trim() && typedChips.length > 0) {
                  setTypedChips(typedChips.slice(0, -1));
                }
              }}
              width="100%"
            />
          </div>
          <GoabButton type="secondary" onClick={addChip}>Add</GoabButton>
        </GoabBlock>
      </GoabFormItem>
      <div>
        {typedChips.map((chip, index) => (
          <GoabFilterChip
            key={index}
            content={chip}
            mb="xs"
            mr="xs"
            onClick={() => setTypedChips(typedChips.filter((c) => c !== chip))}
          />
        ))}
      </div>
    </div>
  );
}

export default DocsContainerRoute;
