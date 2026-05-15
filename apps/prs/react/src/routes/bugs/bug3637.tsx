import {
  GoabDataGrid,
  GoabTable,
  GoabTableSortHeader,
  GoabCheckbox
} from "@abgov/react-components";

export function Bug3637Route() {

  return (
    <div>
      <h1>3637 - Checkbox Table Header Row Height Bug </h1>
      <div className="table-wrapper">
        <GoabDataGrid keyboardNav="table" keyboardIconPosition="right">
          <GoabTable width="100%">
            <thead>
              <tr>
                <th className="goa-table-cell--checkbox"><GoabCheckbox name="" text=""></GoabCheckbox></th>
                <th>
                  <GoabTableSortHeader name="name">Name</GoabTableSortHeader>
                </th>
                <th>
                  <GoabTableSortHeader name="status">Status</GoabTableSortHeader>
                </th>
                <th>Assigned to</th>
                <th>
                  <GoabTableSortHeader name="due-date">Due date</GoabTableSortHeader>
                </th>
                <th>
                  <GoabTableSortHeader name="jurisdiction">Jurisdiction</GoabTableSortHeader>
                </th>
                <th>File number</th>
                <th>
                  <GoabTableSortHeader name="priority">Priority</GoabTableSortHeader>
                </th>
                <th></th>
              </tr>
            </thead>
            <tbody>
            </tbody>
          </GoabTable>
        </GoabDataGrid>
      </div>
    </div>
  );
}
