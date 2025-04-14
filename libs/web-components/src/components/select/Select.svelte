<svelte:options customElement={{
  tag: "goa-select",
}} />

<script lang="ts">
  import { onMount } from "svelte";
  import { performOnce, receive } from "../../common/utils";

  type Option = { content: Element[], value: string};

  export let name: string;

  let _options: Option[] = [];
  let _el: HTMLSelectElement;
  let _debounceId: unknown;

  onMount(() => {
    addEventListener("goa:bind", (e) => {
      const option = (e as CustomEvent).detail as Option;
      _options = [..._options, option];
      _debounceId = performOnce(_debounceId, () => {
        bindChildren(_options);
      })
    })
  });

  function bindChildren(options: Option[]) {
    for (const option of options) {
      const el = document.createElement("option") as HTMLOptionElement;
      el.value = option.value;
      option.content.forEach(item => el.appendChild(item));
      _el.appendChild(el);
    }
  }
</script>

<select bind:this={_el} {name}>
  <slot />
</select>

<style>
  select {
    &, &::picker(select) {
      appearance: base-select;
    }

    border-radius: 4px;
    border: 1px solid #999;

    &::picker(select) {
      transition:
        opacity .2s ease,
        transform .2s var(--ease-out-3),
        display .2s allow-discrete,
        overlay .2s allow-discrete;
    }

    &::picker-icon {
      display: none;
    }

    /* set the off stage styles */
    &:not(:open)::picker(select) {
      opacity: 0;
      transform: scale(.95);
    }

    /* set the on stage styles */
    &:open::picker(select) {
      opacity: 1;
      transform: scale(1);
    }

    &::picker-icon {
      display: none;
    }

    /* set the off stage styles */
    &:not(:open)::picker(select) {
      opacity: 0;
      transform: scale(.95);
    }

    /* set the on stage styles */
    &:open::picker(select) {
      opacity: 1;
      transform: scale(1);
    }
  }

</style>
