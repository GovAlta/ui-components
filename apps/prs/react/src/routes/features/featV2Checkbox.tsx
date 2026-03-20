import React, { useState } from "react";
import {
  GoabBlock,
  GoabText,
  GoabOneColumnLayout,
  GoabPageBlock,
  GoabDivider,
  GoabCheckbox,
  GoabCheckboxList,
} from "@abgov/react-components";
import { GoabxCheckbox, GoabxCheckboxList } from "@abgov/react-components/experimental";
import {
  GoabCheckboxOnChangeDetail,
  GoabCheckboxListOnChangeDetail,
} from "@abgov/ui-components-common";
import { Link } from "react-router-dom";

export function FeatV2CheckboxRoute() {
  const [selectedRows, setSelectedRows] = useState<Set<string>>(new Set());
  const [checkboxListValue, setCheckboxListValue] = useState<string[]>([]);
  const [v2CompactListValue, setV2CompactListValue] = useState<string[]>([]);
  const [v1ListValue, setV1ListValue] = useState<string[]>([]);
  const [descListValue, setDescListValue] = useState<string[]>([]);
  const [v1DescListValue, setV1DescListValue] = useState<string[]>([]);

  const tableData = [
    { id: "row1", name: "Alice Johnson", email: "alice@example.com", status: "Active" },
    { id: "row2", name: "Bob Smith", email: "bob@example.com", status: "Pending" },
    { id: "row3", name: "Carol Davis", email: "carol@example.com", status: "Active" },
  ];

  const handleRowSelect = (rowId: string, detail: GoabCheckboxOnChangeDetail) => {
    const newSelected = new Set(selectedRows);
    if (detail.checked) {
      newSelected.add(rowId);
    } else {
      newSelected.delete(rowId);
    }
    setSelectedRows(newSelected);
  };

  return (
    <GoabPageBlock width="full">
      <GoabOneColumnLayout>
        <GoabBlock direction="column" gap="l">
          <goa-link mt={"xl"} leadingicon={"arrow-back"}>
            <Link to="/">Back</Link>
          </goa-link>
          <GoabText tag="h1" size="heading-l" mb={"m"}>
            V2 Checkbox Fixes
          </GoabText>

          <GoabText size="body-m">
            This page demonstrates fixes for checkbox spacing issues:
          </GoabText>
          <GoabBlock direction="column" gap="s" mb="m">
            <GoabText size="body-s">
              1. <strong>Checkbox auto-margin removed</strong> - Checkboxes no longer have
              default bottom margin, fixing alignment in tables
            </GoabText>
            <GoabText size="body-s">
              2. <strong>CheckboxList gap</strong> - CheckboxList now controls its own
              spacing between items using gap: var(--goa-space-m)
            </GoabText>
          </GoabBlock>

          <GoabDivider />

          {/* Test Case 1: Checkbox in Table */}
          <GoabText tag="h2" size="heading-m" mt="xl" mb="m">
            Test 1: Checkbox in Table
          </GoabText>
          <GoabText size="body-s" mb="m">
            Previously, checkboxes in tables had unwanted bottom margin causing
            misalignment. Now they align properly with the row content.
          </GoabText>

          <goa-table width="100%">
            <thead>
              <tr>
                <th>
                  <GoabxCheckbox
                    name="select-all"
                    checked={selectedRows.size === tableData.length}
                    indeterminate={
                      selectedRows.size > 0 && selectedRows.size < tableData.length
                    }
                    onChange={(detail: GoabCheckboxOnChangeDetail) => {
                      if (detail.checked) {
                        setSelectedRows(new Set(tableData.map((row) => row.id)));
                      } else {
                        setSelectedRows(new Set());
                      }
                    }}
                    ariaLabel="Select all rows"
                  />
                </th>
                <th>Name</th>
                <th>Email</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {tableData.map((row) => (
                <tr key={row.id}>
                  <td>
                    <GoabxCheckbox
                      name={`select-${row.id}`}
                      checked={selectedRows.has(row.id)}
                      onChange={(detail: GoabCheckboxOnChangeDetail) =>
                        handleRowSelect(row.id, detail)
                      }
                      ariaLabel={`Select ${row.name}`}
                    />
                  </td>
                  <td>{row.name}</td>
                  <td>{row.email}</td>
                  <td>{row.status}</td>
                </tr>
              ))}
            </tbody>
          </goa-table>

          <GoabText size="body-xs" mt="m">
            Selected: {selectedRows.size} of {tableData.length} rows
          </GoabText>

          <GoabDivider mt="xl" />

          {/* Test Case 2: CheckboxList Spacing */}
          <GoabText tag="h2" size="heading-m" mt="xl" mb="m">
            Test 2: CheckboxList Spacing
          </GoabText>
          <GoabText size="body-s" mb="m">
            CheckboxList now uses gap: var(--goa-space-m) for consistent spacing between
            items. Previously relied on individual checkbox margins.
          </GoabText>

          <GoabxCheckboxList
            name="preferences"
            value={checkboxListValue}
            onChange={(detail: GoabCheckboxListOnChangeDetail) =>
              setCheckboxListValue(detail.value)
            }
          >
            <GoabxCheckbox name="option1" text="Option 1: Email notifications" />
            <GoabxCheckbox name="option2" text="Option 2: SMS notifications" />
            <GoabxCheckbox name="option3" text="Option 3: Push notifications" />
          </GoabxCheckboxList>

          <GoabText size="body-xs" mt="m">
            Selected: {checkboxListValue.join(", ") || "none"}
          </GoabText>

          <GoabDivider mt="xl" />

          {/* Test Case 2b: CheckboxList with Descriptions */}
          <GoabText tag="h2" size="heading-m" mt="xl" mb="m">
            Test 2b: V2 CheckboxList with Descriptions
          </GoabText>
          <GoabText size="body-s" mb="m">
            Testing checkbox description alignment when descriptions are set per option.
          </GoabText>

          <GoabxCheckboxList
            name="with-descriptions"
            value={descListValue}
            onChange={(detail: GoabCheckboxListOnChangeDetail) =>
              setDescListValue(detail.value)
            }
          >
            <GoabxCheckbox
              name="desc1"
              text="Email notifications"
              description="Receive updates about your account via email"
            />
            <GoabxCheckbox
              name="desc2"
              text="SMS notifications"
              description="Get text messages for urgent alerts only"
            />
            <GoabxCheckbox
              name="desc3"
              text="Push notifications"
              description="Browser notifications when you're online"
            />
          </GoabxCheckboxList>

          <GoabDivider mt="xl" />

          {/* Test Case 2c: V1 CheckboxList with Descriptions (comparison) */}
          <GoabText tag="h2" size="heading-m" mt="xl" mb="m">
            Test 2c: V1 CheckboxList with Descriptions (comparison)
          </GoabText>
          <GoabText size="body-s" mb="m">
            V1 version for comparison.
          </GoabText>

          <GoabCheckboxList
            name="v1-with-descriptions"
            value={v1DescListValue}
            onChange={(detail: GoabCheckboxListOnChangeDetail) =>
              setV1DescListValue(detail.value)
            }
          >
            <GoabCheckbox
              name="v1desc1"
              text="Email notifications"
              description="Receive updates about your account via email"
            />
            <GoabCheckbox
              name="v1desc2"
              text="SMS notifications"
              description="Get text messages for urgent alerts only"
            />
            <GoabCheckbox
              name="v1desc3"
              text="Push notifications"
              description="Browser notifications when you're online"
            />
          </GoabCheckboxList>

          <GoabDivider mt="xl" />

          {/* Test Case 3: V2 Compact CheckboxList */}
          <GoabText tag="h2" size="heading-m" mt="xl" mb="m">
            Test 3: V2 Compact CheckboxList
          </GoabText>
          <GoabText size="body-s" mb="m">
            Compact checkbox list uses smaller gap (var(--goa-space-s)) between items.
          </GoabText>

          <GoabxCheckboxList
            name="compact-prefs"
            size="compact"
            value={v2CompactListValue}
            onChange={(detail: GoabCheckboxListOnChangeDetail) =>
              setV2CompactListValue(detail.value)
            }
          >
            <GoabxCheckbox
              name="compact1"
              size="compact"
              text="Compact option 1"
              description="Description for compact option 1"
            />
            <GoabxCheckbox
              name="compact2"
              size="compact"
              text="Compact option 2"
              description="Description for compact option 2"
            />
            <GoabxCheckbox
              name="compact3"
              size="compact"
              text="Compact option 3"
              description="Description for compact option 3"
            />
          </GoabxCheckboxList>

          <GoabText size="body-xs" mt="m">
            Selected: {v2CompactListValue.join(", ") || "none"}
          </GoabText>

          <GoabDivider mt="xl" />

          {/* Test Case 4: Standalone Checkbox */}
          <GoabText tag="h2" size="heading-m" mt="xl" mb="m">
            Test 4: V2 Standalone Checkbox (No Auto-Margin)
          </GoabText>
          <GoabText size="body-s" mb="m">
            V2 checkboxes no longer have default bottom margin. Spacing should be
            controlled by the parent layout.
          </GoabText>

          <GoabBlock direction="row" gap="xl" alignment="center">
            <GoabxCheckbox name="standalone1" text="Checkbox A" />
            <GoabxCheckbox name="standalone2" text="Checkbox B" />
            <GoabxCheckbox name="standalone3" text="Checkbox C" />
          </GoabBlock>

          <GoabText size="body-xs" mt="m">
            Notice: No extra margin between checkboxes - spacing controlled by GoabBlock
            gap.
          </GoabText>

          <GoabDivider mt="xl" />

          {/* V1 Regression Tests */}
          <GoabText tag="h2" size="heading-l" mt="xl" mb="m">
            V1 Regression Tests
          </GoabText>
          <GoabText size="body-s" mb="m">
            These tests verify V1 checkboxes still behave correctly after the V2 spacing
            changes.
          </GoabText>

          {/* Test Case 5: V1 Standalone Checkboxes */}
          <GoabText tag="h3" size="heading-m" mt="l" mb="m">
            Test 5: V1 Standalone Checkboxes (Auto-Margin)
          </GoabText>
          <GoabText size="body-s" mb="m">
            V1 checkboxes should still have their default bottom margin (space-m).
          </GoabText>

          <div style={{ border: "1px dashed #ccc", padding: "1rem" }}>
            <GoabCheckbox
              name="v1-standalone1"
              text="V1 Default - should have margin-bottom: space-m"
            />
            <GoabCheckbox
              name="v1-standalone2"
              text="V1 Default - should have margin-bottom: space-m"
            />
          </div>

          <GoabDivider mt="xl" />

          {/* Test Case 6: V1 CheckboxList */}
          <GoabText tag="h3" size="heading-m" mt="l" mb="m">
            Test 6: V1 CheckboxList (No Gap Change)
          </GoabText>
          <GoabText size="body-s" mb="m">
            V1 checkbox lists should look the same as before - individual checkbox margins
            control spacing, list gap is 0.
          </GoabText>

          <GoabCheckboxList
            name="v1-list"
            value={v1ListValue}
            onChange={(detail: GoabCheckboxListOnChangeDetail) =>
              setV1ListValue(detail.value)
            }
          >
            <GoabCheckbox name="v1opt1" text="V1 list option 1" />
            <GoabCheckbox name="v1opt2" text="V1 list option 2" />
            <GoabCheckbox name="v1opt3" text="V1 list option 3" />
          </GoabCheckboxList>

          <GoabText size="body-xs" mt="m">
            Selected: {v1ListValue.join(", ") || "none"}
          </GoabText>
        </GoabBlock>
      </GoabOneColumnLayout>
    </GoabPageBlock>
  );
}
