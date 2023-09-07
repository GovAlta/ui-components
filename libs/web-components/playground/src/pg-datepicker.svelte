<svelte:options tag="pg-date-picker" />

<script lang="ts">  
  let date = new Date();
  let min = new Date(2010, 0, 1);
  let max = new Date(2030, 0, 1)
  function onChange(e: CustomEvent) {
    date = e.detail.value;
    console.log("tge date", date, typeof date)
  }

  function noop(e: CustomEvent) {
    console.log("nothing")
  }
</script>

<h2>Selected Date</h2>
{date?.toISOString()}

<h5>Single day with no initial date</h5>
<goa-date-picker on:_change={noop} />

<h5>Single day with initial date</h5>
<goa-date-picker date={date?.toISOString()} on:_change={onChange} />

<h5>Calendar</h5>
<goa-calendar {date} on:_change={onChange} />

<h5>Calendar</h5>
<goa-calendar mt="9" {date} on:_change={onChange} {min} {max}  />

<div style="position: relative; margin-top: 600px;">
  <h5>Datepicker within a position:relative element</h5>
  <goa-date-picker date={date?.toISOString()} on:_change={onChange} relative="true" />
</div>
