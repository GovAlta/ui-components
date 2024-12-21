<svelte:options customElement="goa-form-state" />

<script lang="ts">
  import {
    FormState,
    FormStateBroadcastChangeMsg,
    FormStateInitMsg,
    FormStateUpdateMsg,
    FormStateSubscribeMsg,
    FormStateUnsubscribeMsg, FormStateRelayDetail,
  } from "../../types/relay-types";
  import { debounce, receive, relay } from "../../common/utils";
  import { onMount } from "svelte";

  let _el: HTMLElement;
  let _subscribers: HTMLElement[] = [];
  let _updateTimeoutId: any;

  // let _msgQuery:

  let _state: FormState = {
    id: crypto.randomUUID(),
    form: {},
    history: [],
    editting: "",
    lastModified: undefined,
    status: "not-started",
  };

  onMount(() => {
    console.log("FormState::onMount");
    receive(_el, (type, data, e) => {
      console.log(`  RECEIVE:${type}`, data);
      switch (type) {
        case FormStateSubscribeMsg:
          onSubscribe(data as FormStateRelayDetail);
          e.stopPropagation();
          break;
        case FormStateUnsubscribeMsg:
          onUnsubscribe(data as FormStateRelayDetail);
          e.stopPropagation();
          break;
        case FormStateUpdateMsg:
          onUpdate(data as FormState);
          e.stopPropagation();
          break;
        default:
          console.log("FormState::default", type, data);
      }
    });

    // dispatch out to the containing Form element, which then sends message to children
    // with a reference to the form-state element
    relay(_el, FormStateInitMsg, { el: _el }, { bubbles: true });
  });

  function onSubscribe(data: FormStateRelayDetail) {
    console.debug("FormState::subscribe", { data });
    const receiver = (data as FormStateRelayDetail).el;
    _subscribers.push(receiver);

    // ensure that the new subscriber has the most recent state
    relay<FormState>(receiver, FormStateBroadcastChangeMsg, _state);
  }

  function onUnsubscribe(data: FormStateRelayDetail) {
    _subscribers = _subscribers.filter((el) => el !== data.el);
  }

  function onUpdate(data: FormState) {
    console.log("FormState::update", data);
    _state = data as FormState;
    _updateTimeoutId = debounce(_updateTimeoutId, dispatchState, 100);
  }

  function dispatchState() {
    console.log("FormState::dispatchState", { _state, count: _subscribers.length, _subscribers });
    _subscribers.forEach((el) => {
      relay<FormState>(el, FormStateBroadcastChangeMsg, _state);
    });
  }

</script>

<div bind:this="{_el}" />
