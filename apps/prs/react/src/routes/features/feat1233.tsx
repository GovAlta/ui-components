import { useEffect, useState } from "react";
import {
  GoabBlock,
  GoabButton,
  GoabButtonGroup,
  GoabDropdownItem,
  GoabDropdownMultiselect,
  GoabFormItem,
  GoabModal,
  GoabText,
} from "@abgov/react-components";

const FRUIT_POOL = [
  { value: "apple", label: "Apple" },
  { value: "banana", label: "Banana" },
  { value: "cherry", label: "Cherry" },
  { value: "date", label: "Date" },
  { value: "elderberry", label: "Elderberry" },
  { value: "fig", label: "Fig" },
];

export function Feat1233DropdownMultiselectRoute() {
  const [selected1, setSelected1] = useState<string[]>([]);
  const [selected2, setSelected2] = useState<string[]>(["apple", "banana"]);
  const [brooklyn99Selected, setBrooklyn99Selected] = useState<string[]>([
    "Andy Samberg",
    "Stephanie Beatriz",
    "Terry Crews",
    "Andre Braugher",
  ]);
  const [selectedFilterable, setSelectedFilterable] = useState<string[]>([]);
  const [selectedSelectAll, setSelectedSelectAll] = useState<string[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedInModal, setSelectedInModal] = useState<string[]>([]);
  const [filterableModalOpen, setFilterableModalOpen] = useState(false);
  const [selectedFilterableInModal, setSelectedFilterableInModal] = useState<string[]>(
    [],
  );
  const [asyncOptions, setAsyncOptions] = useState<{ value: string; label: string }[]>(
    [],
  );
  const [asyncLoading, setAsyncLoading] = useState(true);
  const [selectedAsync, setSelectedAsync] = useState<string[]>([]);

  // Simulate options arriving from an API after a delay.
  useEffect(() => {
    const timer = setTimeout(() => {
      setAsyncOptions(FRUIT_POOL.slice(0, 3));
      setAsyncLoading(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  const addOption = () => {
    setAsyncOptions((prev) => {
      const next = FRUIT_POOL[prev.length];
      return next ? [...prev, next] : prev;
    });
  };

  const removeLastOption = () => {
    setAsyncOptions((prev) => prev.slice(0, -1));
  };

  const onBrooklyn99Change = (e: { value: string[] }) => {
    setBrooklyn99Selected(e.value);
  };

  return (
    <main>
      <GoabText tag="h1" mt="none">
        feat(#1233): DropdownMultiselect component
      </GoabText>
      <GoabText>
        A dropdown component that presents a CheckboxList for multiple selection. The
        trigger displays a comma-separated summary of selected labels with ellipsis
        overflow. Keyboard: ArrowDown/Enter/Space opens, Escape and Tab close.
      </GoabText>

      <GoabBlock direction="column" gap="xl">
        <section>
          <GoabText tag="h2">Basic usage</GoabText>
          <GoabText>
            Select items from the list. The trigger label updates as you select.
          </GoabText>
          <div style={{ maxWidth: "400px" }}>
            <GoabFormItem label="Favourite fruit">
              <GoabDropdownMultiselect
                name="fruit-basic"
                placeholder="Select fruit"
                value={selected1}
                onChange={(e) => setSelected1(e.value)}
                testId="basic-multiselect"
              >
                <GoabDropdownItem value="apple" label="Apple" />
                <GoabDropdownItem value="banana" label="Banana" />
                <GoabDropdownItem value="cherry" label="Cherry" />
                <GoabDropdownItem value="date" label="Date" />
                <GoabDropdownItem value="elderberry" label="Elderberry" />
              </GoabDropdownMultiselect>
            </GoabFormItem>
            <GoabText>Selected: {selected1.join(", ") || "(none)"}</GoabText>
          </div>
        </section>

        <section>
          <GoabText tag="h2">Ellipsis overflow</GoabText>
          <GoabText>
            When the selected labels exceed the trigger width, they truncate with an
            ellipsis.
          </GoabText>
          <div style={{ maxWidth: "250px" }}>
            <GoabDropdownMultiselect
              name="nine-nine-characters"
              placeholder="Best Brooklyn Nine-Nine characters"
              value={brooklyn99Selected}
              onChange={onBrooklyn99Change}
              testId="overflow-multiselect"
            >
              <GoabDropdownItem value="Andy Samberg" label="Jake Peralta" />
              <GoabDropdownItem value="Stephanie Beatriz" label="Rosa Diaz" />
              <GoabDropdownItem value="Terry Crews" label="Terry Jeffords" />
              <GoabDropdownItem value="Melissa Fumero" label="Amy Santiago" />
              <GoabDropdownItem value="Joe Lo Truglio" label="Charles Boyle" />
              <GoabDropdownItem value="Chelsea Peretti" label="Gina Linetti" />
              <GoabDropdownItem value="Andre Braugher" label="Raymond Holt" />
              <GoabDropdownItem value="Michael Hitchcock" label="Dirk Blocker" />
              <GoabDropdownItem value="Joel McKinnon Miller" label="Norm Scully" />
            </GoabDropdownMultiselect>
          </div>
          <GoabText>Selected: {brooklyn99Selected.join(", ") || "(none)"}</GoabText>
        </section>

        <section>
          <GoabText tag="h2">Count labelFormal</GoabText>
          <GoabText>
            When the selected labels exceed the trigger width, they truncate with an "n
            selected" label.
          </GoabText>
          <div style={{ maxWidth: "250px" }}>
            <GoabDropdownMultiselect
              name="nine-nine-characters"
              placeholder="Best Brooklyn Nine-Nine characters"
              value={brooklyn99Selected}
              labelFormat="count"
              onChange={onBrooklyn99Change}
              testId="overflow-multiselect"
            >
              <GoabDropdownItem value="Andy Samberg" label="Jake Peralta" />
              <GoabDropdownItem value="Stephanie Beatriz" label="Rosa Diaz" />
              <GoabDropdownItem value="Terry Crews" label="Terry Jeffords" />
              <GoabDropdownItem value="Melissa Fumero" label="Amy Santiago" />
              <GoabDropdownItem value="Joe Lo Truglio" label="Charles Boyle" />
              <GoabDropdownItem value="Chelsea Peretti" label="Gina Linetti" />
              <GoabDropdownItem value="Andre Braugher" label="Raymond Holt" />
              <GoabDropdownItem value="Michael Hitchcock" label="Dirk Blocker" />
              <GoabDropdownItem value="Joel McKinnon Miller" label="Norm Scully" />
            </GoabDropdownMultiselect>
          </div>
        </section>
        <section>
          <GoabText tag="h2">Controlled (pre-selected value)</GoabText>
          <GoabText tag="p">(and leadingIcon)</GoabText>
          <div style={{ maxWidth: "400px" }}>
            <GoabDropdownMultiselect
              name="fruit-controlled"
              placeholder="Select fruit"
              leadingIcon="airplane"
              value={selected2}
              onChange={(e) => setSelected2(e.value)}
              testId="controlled-multiselect"
            >
              <GoabDropdownItem value="apple" label="Apple" />
              <GoabDropdownItem value="banana" label="Banana" />
              <GoabDropdownItem value="cherry" label="Cherry" />
            </GoabDropdownMultiselect>
            <GoabText>Selected: {selected2.join(", ") || "(none)"}</GoabText>
          </div>
        </section>

        <section>
          <GoabText tag="h2">Disabled state</GoabText>
          <div style={{ maxWidth: "400px" }}>
            <GoabDropdownMultiselect
              name="fruit-disabled"
              placeholder="Select fruit"
              disabled={true}
              value={["apple"]}
              testId="disabled-multiselect"
            >
              <GoabDropdownItem value="apple" label="Apple" />
              <GoabDropdownItem value="banana" label="Banana" />
            </GoabDropdownMultiselect>
          </div>
        </section>

        <section>
          <GoabText tag="h2">Error state</GoabText>
          <div style={{ maxWidth: "400px" }}>
            <GoabFormItem
              label="Required selection"
              error="Please select at least one option."
            >
              <GoabDropdownMultiselect
                name="fruit-error"
                placeholder="Select fruit"
                error={true}
                testId="error-multiselect"
              >
                <GoabDropdownItem value="apple" label="Apple" />
                <GoabDropdownItem value="banana" label="Banana" />
              </GoabDropdownMultiselect>
            </GoabFormItem>
          </div>
        </section>

        <section>
          <GoabText tag="h2">Filterable</GoabText>
          <GoabText>
            Type in the trigger to filter options. Only options whose label starts with
            the typed string are shown. Previously checked options remain selected even
            when hidden. The filter clears when the dropdown closes.
          </GoabText>
          <div style={{ maxWidth: "400px" }}>
            <GoabFormItem label="Province or territory">
              <GoabDropdownMultiselect
                name="provinces-filterable"
                placeholder="Select provinces"
                filterable={true}
                value={selectedFilterable}
                onChange={(e) => setSelectedFilterable(e.value)}
                testId="filterable-multiselect"
              >
                <GoabDropdownItem value="ab" label="Alberta" />
                <GoabDropdownItem value="bc" label="British Columbia" />
                <GoabDropdownItem value="mb" label="Manitoba" />
                <GoabDropdownItem value="nb" label="New Brunswick" />
                <GoabDropdownItem value="nl" label="Newfoundland and Labrador" />
                <GoabDropdownItem value="ns" label="Nova Scotia" />
                <GoabDropdownItem value="on" label="Ontario" />
                <GoabDropdownItem value="pe" label="Prince Edward Island" />
                <GoabDropdownItem value="qc" label="Quebec" />
                <GoabDropdownItem value="sk" label="Saskatchewan" />
              </GoabDropdownMultiselect>
            </GoabFormItem>
            <GoabText>Selected: {selectedFilterable.join(", ") || "(none)"}</GoabText>
          </div>
        </section>

        <section>
          <GoabText tag="h2">Show Select All</GoabText>
          <GoabText>
            The selectAll prop adds a "Select All" checkbox above the list. Checking it
            selects every option. Unchecking clears all. It shows as indeterminate when
            some (but not all) options are selected.
          </GoabText>
          <div style={{ maxWidth: "400px" }}>
            <GoabFormItem label="Favourite fruit">
              <GoabDropdownMultiselect
                name="fruit-select-all"
                placeholder="Select fruit"
                showSelectAll={true}
                filterable={true}
                value={selectedSelectAll}
                onChange={(e) => setSelectedSelectAll(e.value)}
                testId="select-all-multiselect"
              >
                <GoabDropdownItem value="apple" label="Apple" />
                <GoabDropdownItem value="banana" label="Banana" />
                <GoabDropdownItem value="cherry" label="Cherry" />
                <GoabDropdownItem value="date" label="Date" />
                <GoabDropdownItem value="elderberry" label="Elderberry" />
              </GoabDropdownMultiselect>
            </GoabFormItem>
            <GoabText>Selected: {selectedSelectAll.join(", ") || "(none)"}</GoabText>
          </div>
        </section>

        <section>
          <GoabText tag="h2">Compact size</GoabText>
          <div style={{ maxWidth: "400px" }}>
            <GoabDropdownMultiselect
              name="fruit-compact"
              placeholder="Select fruit"
              size="compact"
              testId="compact-multiselect"
            >
              <GoabDropdownItem value="apple" label="Apple" />
              <GoabDropdownItem value="banana" label="Banana" />
              <GoabDropdownItem value="cherry" label="Cherry" />
            </GoabDropdownMultiselect>
          </div>
        </section>

        <section>
          <GoabText tag="h2">Fixed width</GoabText>
          <GoabText>
            The width prop sets a fixed width on both the trigger and the popover panel,
            instead of relying on a wrapper. The open panel should match the trigger width
            exactly.
          </GoabText>
          <GoabBlock direction="column" gap="m">
            <GoabFormItem label="Narrow (240px)">
              <GoabDropdownMultiselect
                name="fruit-width-narrow"
                placeholder="Select fruit"
                width="240px"
                testId="width-narrow-multiselect"
              >
                <GoabDropdownItem value="apple" label="Apple" />
                <GoabDropdownItem value="banana" label="Banana" />
                <GoabDropdownItem value="elderberry" label="Elderberry (a long label)" />
              </GoabDropdownMultiselect>
            </GoabFormItem>
            <GoabFormItem label="Wide (480px)">
              <GoabDropdownMultiselect
                name="fruit-width-wide"
                placeholder="Select fruit"
                width="480px"
                testId="width-wide-multiselect"
              >
                <GoabDropdownItem value="apple" label="Apple" />
                <GoabDropdownItem value="banana" label="Banana" />
                <GoabDropdownItem value="cherry" label="Cherry" />
              </GoabDropdownMultiselect>
            </GoabFormItem>
          </GoabBlock>
        </section>

        <section>
          <GoabText tag="h2">Percentage width (fill parent)</GoabText>
          <GoabText>
            With a percentage width the component sizes relative to its parent container
            (the dashed box below is 600px wide). The popover panel, measured in pixels
            from the trigger, should still match the rendered trigger width. Resize the
            window to confirm both track the parent.
          </GoabText>
          <div
            style={{
              width: "600px",
              maxWidth: "100%",
              padding: "1rem",
              border: "1px dashed #888",
            }}
          >
            <GoabFormItem label="100% of parent" mb="m">
              <GoabDropdownMultiselect
                name="fruit-width-full"
                placeholder="Select fruit"
                width="100%"
                testId="width-full-multiselect"
              >
                <GoabDropdownItem value="apple" label="Apple" />
                <GoabDropdownItem value="banana" label="Banana" />
                <GoabDropdownItem value="cherry" label="Cherry" />
              </GoabDropdownMultiselect>
            </GoabFormItem>
            <GoabFormItem label="50% of parent">
              <GoabDropdownMultiselect
                name="fruit-width-half"
                placeholder="Select fruit"
                width="50%"
                testId="width-half-multiselect"
              >
                <GoabDropdownItem value="apple" label="Apple" />
                <GoabDropdownItem value="banana" label="Banana" />
                <GoabDropdownItem value="cherry" label="Cherry" />
              </GoabDropdownMultiselect>
            </GoabFormItem>
          </div>
        </section>

        <section>
          <GoabText tag="h2">Dynamic options (async load)</GoabText>
          <GoabText>
            Options usually come from an API, not a static list. Here the options load
            after a 3 second delay. Open the dropdown before they load to see the empty
            state, then watch the list populate. Use the buttons to add or remove options
            at runtime.
          </GoabText>
          <div style={{ maxWidth: "400px" }}>
            <GoabButtonGroup alignment="start">
              <GoabButton type="secondary" onClick={addOption}>
                Add option
              </GoabButton>
              <GoabButton type="secondary" onClick={removeLastOption}>
                Remove last option
              </GoabButton>
            </GoabButtonGroup>
            <GoabFormItem label="Fruit (loaded async)" mt="s">
              <GoabDropdownMultiselect
                name="fruit-async"
                placeholder={asyncLoading ? "Loading options..." : "Select fruit"}
                value={selectedAsync}
                onChange={(e) => setSelectedAsync(e.value)}
                testId="async-multiselect"
              >
                {asyncOptions.map((o) => (
                  <GoabDropdownItem key={o.value} value={o.value} label={o.label} />
                ))}
              </GoabDropdownMultiselect>
            </GoabFormItem>
            <GoabText>Selected: {selectedAsync.join(", ") || "(none)"}</GoabText>
          </div>
        </section>

        <section>
          <GoabText tag="h2">Filterable inside a modal</GoabText>
          <GoabText>
            Verifies that the filter input inside a modal receives focus, typing filters
            options correctly, and that the popover renders above the modal overlay.
          </GoabText>
          <GoabButton type="secondary" onClick={() => setFilterableModalOpen(true)}>
            Open modal
          </GoabButton>
          <GoabModal
            open={filterableModalOpen}
            heading="Select provinces"
            onClose={() => setFilterableModalOpen(false)}
            actions={
              <GoabButtonGroup alignment="end">
                <GoabButton
                  type="secondary"
                  onClick={() => setFilterableModalOpen(false)}
                >
                  Cancel
                </GoabButton>
                <GoabButton type="primary" onClick={() => setFilterableModalOpen(false)}>
                  Confirm
                </GoabButton>
              </GoabButtonGroup>
            }
          >
            <GoabFormItem label="Province or territory">
              <GoabDropdownMultiselect
                name="provinces-in-modal"
                placeholder="Select provinces"
                filterable={true}
                value={selectedFilterableInModal}
                onChange={(e) => setSelectedFilterableInModal(e.value)}
                testId="filterable-modal-multiselect"
              >
                <GoabDropdownItem value="ab" label="Alberta" />
                <GoabDropdownItem value="bc" label="British Columbia" />
                <GoabDropdownItem value="mb" label="Manitoba" />
                <GoabDropdownItem value="nb" label="New Brunswick" />
                <GoabDropdownItem value="nl" label="Newfoundland and Labrador" />
                <GoabDropdownItem value="ns" label="Nova Scotia" />
                <GoabDropdownItem value="on" label="Ontario" />
                <GoabDropdownItem value="pe" label="Prince Edward Island" />
                <GoabDropdownItem value="qc" label="Quebec" />
                <GoabDropdownItem value="sk" label="Saskatchewan" />
              </GoabDropdownMultiselect>
            </GoabFormItem>
            <GoabText>
              Selected: {selectedFilterableInModal.join(", ") || "(none)"}
            </GoabText>
          </GoabModal>
        </section>

        <section>
          <GoabText tag="h2">Inside a modal</GoabText>
          <GoabText>
            Verifies the dropdown popover renders above the modal and that opening or
            interacting with the dropdown does not close the modal.
          </GoabText>
          <GoabButton type="secondary" onClick={() => setModalOpen(true)}>
            Open modal
          </GoabButton>
          <GoabModal
            open={modalOpen}
            heading="Select your fruit"
            onClose={() => setModalOpen(false)}
            actions={
              <GoabButtonGroup alignment="end">
                <GoabButton type="secondary" onClick={() => setModalOpen(false)}>
                  Cancel
                </GoabButton>
                <GoabButton type="primary" onClick={() => setModalOpen(false)}>
                  Confirm
                </GoabButton>
              </GoabButtonGroup>
            }
          >
            <GoabFormItem label="Favourite fruit">
              <GoabDropdownMultiselect
                name="fruit-in-modal"
                placeholder="Select fruit"
                value={selectedInModal}
                onChange={(e) => setSelectedInModal(e.value)}
                testId="modal-multiselect"
              >
                <GoabDropdownItem value="apple" label="Apple" />
                <GoabDropdownItem value="banana" label="Banana" />
                <GoabDropdownItem value="cherry" label="Cherry" />
                <GoabDropdownItem value="date" label="Date" />
                <GoabDropdownItem value="elderberry" label="Elderberry" />
              </GoabDropdownMultiselect>
            </GoabFormItem>
            <GoabText>Selected: {selectedInModal.join(", ") || "(none)"}</GoabText>
          </GoabModal>
        </section>

        <section>
          <GoabText tag="h2">MaxHeight Test</GoabText>
          <GoabText>
            Make a long list of items to test the maxHeight of the dropdown. The dropdown
            should scroll when the list exceeds the maxHeight.
          </GoabText>
          <GoabFormItem label="Favourite fruit">
            <GoabDropdownMultiselect
              name="maxheight"
              placeholder="Pick some numbers"
              value={selectedInModal}
              onChange={(e) => setSelectedInModal(e.value)}
              testId="modal-maxheight"
              maxHeight="500px"
            >
              {[...Array(100).keys()].map((i) => (
                <GoabDropdownItem key={i} value={`fruit-${i}`} label={`Fruit ${i}`} />
              ))}
            </GoabDropdownMultiselect>
          </GoabFormItem>
        </section>
      </GoabBlock>
    </main>
  );
}
