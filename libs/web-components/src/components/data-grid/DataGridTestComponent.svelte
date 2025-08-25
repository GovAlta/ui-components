<script>
  import DataGrid from './DataGrid.svelte';
</script>

<DataGrid keyboardNav="layout">
  <!-- Header Row -->
  <div data-grid="row">
    <div data-grid="cell-0" data-testid="header-name">Name</div>
    <div data-grid="cell-1" data-testid="header-age">Age</div>
    <div data-grid="cell-2" data-testid="header-city">City</div>
  </div>

  <!-- Data Row 1 -->
  <div data-grid="row">
    <div data-grid="cell-0" data-testid="row1-name">John Doe</div>
    <div data-grid="cell-1" data-testid="row1-age">30</div>
    <div data-grid="cell-2" data-testid="row1-city">Edmonton</div>
  </div>

  <!-- Data Row 2 -->
  <div data-grid="row">
    <div data-grid="cell-0" data-testid="row2-name">Jane Smith</div>
    <div data-grid="cell-1" data-testid="row2-age">25</div>
    <div data-grid="cell-2" data-testid="row2-city">Calgary</div>
  </div>

  <!-- Data Row 3 with input elements -->
  <div data-grid="row">
    <div data-grid="cell-0" data-testid="row3-name">
      <input type="text" value="Alice Johnson" data-testid="input-name" />
    </div>
    <div data-grid="cell-1" data-testid="row3-age">
      <input type="number" value="28" data-testid="input-age" />
    </div>
    <div data-grid="cell-2" data-testid="row3-city">
      <select data-testid="select-city">
        <option value="edmonton">Edmonton</option>
        <option value="calgary">Calgary</option>
        <option value="vancouver">Vancouver</option>
      </select>
    </div>
  </div>

  <!-- Data Row 4 with buttons -->
  <div data-grid="row">
    <div data-grid="cell-0" data-testid="row4-name">
      <button data-testid="btn-edit">Edit</button>
    </div>
    <div data-grid="cell-1" data-testid="row4-age">
      <button data-testid="btn-delete">Delete</button>
    </div>
    <div data-grid="cell-2" data-testid="row4-city">
      <a href="#" data-testid="link-view">View Details</a>
    </div>
  </div>
</DataGrid>
