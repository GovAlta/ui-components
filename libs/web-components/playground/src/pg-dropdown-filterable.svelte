<svelte:options tag="pg-dropdown-filterable"/>
<script lang="ts">
    const countries = [
      {
        value: "w",
        label: "Whale"
      },
      {
        value: "2",
        label: "Alabama"
      },
      {
        value: "3",
        label: "Alaska"
      },
      {
        value: "4",
        label: "American Samoa"
      },
      {
        value: "5",
        label: "Arizona"
      },
      {
        value: "6",
        label: "Arkansas"
      },
      {
        value: "7",
        label: "California"
      },
      {
        value: "8",
        label: "Colorado"
      },
      {
        value: "9",
        label: "Connecticut"
      },
      {
        value: "10",
        label: "Delaware"
      },
      {
        value: "11",
        label: "District Of Columbia"
      }
    ];
    let value = countries[0].value;
    function handleChange(e) {
      console.log("handleChange", e.detail);
    }
    function handleChangeDropdown(e) {
      console.log("dropdown ", e.detail);
    }
</script>
<h4>Basic</h4>
<span>Combobox: </span>
<goa-dropdown on:_change={() => {}} name="country" filterable="true" placeholder="Country" on:_change={handleChangeDropdown}>
  {#each countries as country}
    <goa-dropdown-item value={country.value} label={country.label}></goa-dropdown-item>
  {/each}
</goa-dropdown>
<button on:click={() => value = ""}>Reset</button>
<span>Dropdown:</span>
<goa-dropdown on:_change={(e) => {value = e.detail.value}} name="country" value="{value}" placeholder="Country" on:_change={handleChangeDropdown}>
  {#each countries as country}
    <goa-dropdown-item value={country.value} label={country.label}></goa-dropdown-item>
  {/each}
</goa-dropdown>

<h4>Error</h4>
<span>Combobox: </span>
<goa-dropdown id="country_error" filterable="true" name="country" placeholder="Country" value="w" error="true" on:_change={handleChange}>
  {#each countries as country}
    <goa-dropdown-item value={country.value} label={country.label}></goa-dropdown-item>
  {/each}
</goa-dropdown>
<span>Dropdown</span>
<goa-dropdown id="country_error" name="country" placeholder="Country" value="w" error="true" on:_change={handleChange}>
  {#each countries as country}
    <goa-dropdown-item value={country.value} label={country.label}></goa-dropdown-item>
  {/each}
</goa-dropdown>


<h4>Native</h4>
<span>Combobox: </span>
<goa-dropdown id="country" name="country" filterable="true" placeholder="Country" value="w" native="true" on:_change={handleChange}>
  {#each countries as country}
    <goa-dropdown-item value={country.value} label={country.label}></goa-dropdown-item>
  {/each}
</goa-dropdown>
<span>Dropdown: </span>
<goa-dropdown id="country" name="country" placeholder="Country" value="w" native="true" on:_change={handleChange}>
  {#each countries as country}
    <goa-dropdown-item value={country.value} label={country.label}></goa-dropdown-item>
  {/each}
</goa-dropdown>

<h4>Disabled</h4>
<span>Combobox: </span>
<goa-dropdown filterable="true" value="w" name="disabled" disabled>
  {#each countries as country}
    <goa-dropdown-item value={country.value} label={country.label}></goa-dropdown-item>
  {/each}
</goa-dropdown>
<span>Dropdown: </span>
<goa-dropdown name="disabled" value="w" disabled>
  {#each countries as country}
    <goa-dropdown-item value={country.value} label={country.label}></goa-dropdown-item>
  {/each}
</goa-dropdown>

<h4>Leading icon</h4>
<span>Combobox: </span>
<goa-dropdown name="country" filterable="true" leadingicon="airplane">
  {#each countries as country}
    <goa-dropdown-item value={country.value} label={country.label}></goa-dropdown-item>
  {/each}
</goa-dropdown>
<span>Dropdown: </span>
<goa-dropdown name="country" leadingicon="airplane">
  {#each countries as country}
    <goa-dropdown-item value={country.value} label={country.label}></goa-dropdown-item>
  {/each}
</goa-dropdown>

<h4>Max height</h4>
<span>Combobox: </span>
<goa-dropdown name="country" filterable="true" maxheight="80px">
  {#each countries as country}
    <goa-dropdown-item value={country.value} label={country.label}></goa-dropdown-item>
  {/each}
</goa-dropdown>

<span>Dropdown: </span>
<goa-dropdown name="country" maxheight="80px">
  {#each countries as country}
    <goa-dropdown-item value={country.value} label={country.label}></goa-dropdown-item>
  {/each}
</goa-dropdown>

<h4>Width</h4>
<span>Combobox: </span>
<goa-dropdown name="country" filterable="true" width="350px">
  {#each countries as country}
    <goa-dropdown-item value={country.value} label={country.label}></goa-dropdown-item>
  {/each}
</goa-dropdown>
<span>Dropdown: </span>
<goa-dropdown name="country" width="350px">
  {#each countries as country}
    <goa-dropdown-item value={country.value} label={country.label}></goa-dropdown-item>
  {/each}
</goa-dropdown>
