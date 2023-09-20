<svelte:options tag="pg-form-stepper" />

<script lang="ts">
  import { onMount } from "svelte";

  let step = 1;
  let state = [
    "complete",
    "incomplete"
  ]

  onMount(() => {
    document.querySelector("goa-form-stepper").addEventListener("_change", (e) => {
      step = (e as CustomEvent).detail.step;
    })
  })

  function change(offset: number) {
    if (step <= 0 || step >= 4) return;
    
    state[`${step}`] = Math.random() > 0.5 ? "complete" : "incomplete"
    step += offset;    
  }
</script>

<div class="scroll">
  <goa-form-stepper {step}>
    <goa-form-step text="Personal Info" status={state[0]} />
    <goa-form-step text="Payment Details" status={state[1]} />
    <goa-form-step text="Other" status={state[2]} />
    <goa-form-step text="Other 2" />
  </goa-form-stepper>
</div>
<goa-pages current={step}>
  <section>
    This is the first page
  </section>
  <section>
    This is the second page
  </section>
  <section>
    This is the third page
  </section>
  <section>
    This is the last page
  </section>
</goa-pages>
<section>
  <button on:click={() => change(-1)}>Previous</button>
  <button on:click={() => change(1)}>Next</button>
</section>

<style>
  .scroll {
    overflow-x: auto;
    padding: 1rem;
  }
</style>