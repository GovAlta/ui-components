<script lang="ts">
  let _step: number;
  function onStepperChange(e: Event) {
    const ce = e as CustomEvent;
    _step = ce.detail.step;
  }

</script>

<goa-form-stepper testid="foo" on:_change={onStepperChange}>
  <goa-form-step text="Personal details"></goa-form-step>
  <goa-form-step text="Employment history"></goa-form-step>
  <goa-form-step text="References"></goa-form-step>
  <goa-form-step text="Review"></goa-form-step>
</goa-form-stepper>

<goa-pages current={_step} mb="3xl">
  <div>
    Page 1 content
  </div>
  <div>
    Page 2 content
  </div>
  <div>
    Page 3 content
  </div>
  <div>
    Page 4 content
  </div>
</goa-pages>


