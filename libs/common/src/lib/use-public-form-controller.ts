import { useRef, useEffect, useState, useCallback } from 'react';
import {
  PublicFormController,
  AppState,
} from './public-form-controller';
import {
  GoabFieldsetItemValue
} from './common';
import { FieldValidator } from './validators';

export function usePublicFormController<T>(type: "details" | "list" = "details") {
  const controllerRef = useRef<PublicFormController<T>>(new PublicFormController<T>(type));
  const [state, setState] = useState<AppState<T> | AppState<T>[] | undefined>(undefined);

  useEffect(() => {
    // Create a proxy that updates React state when controller's state changes
    const originalStateGetter = Object.getOwnPropertyDescriptor(
      Object.getPrototypeOf(controllerRef.current),
      'state'
    )?.get;

    const originalStateSetter = Object.getOwnPropertyDescriptor(
      Object.getPrototypeOf(controllerRef.current),
      'state'
    )?.set;

    if (originalStateGetter && originalStateSetter) {
      Object.defineProperty(controllerRef.current, 'state', {
        get: function() {
          return originalStateGetter.call(this);
        },
        set: function(value) {
          originalStateSetter.call(this, value);
          setState(value);
        },
        configurable: true
      });
    }
  }, []);


  const init = useCallback((e: Event) => {
    if (!(e as CustomEvent).detail?.el) {
      console.error('El is null during initialization');
      return;
    }
    controllerRef.current.init(e);
  }, []);

  const initList = useCallback((e: Event) => {
    const customEvent = e as CustomEvent;
    if (!customEvent?.detail?.el) {
      console.error('El is null during list initialization');
      return;
    }
    controllerRef.current.initList(e);
  }, []);

  const initState = useCallback((state?: string | AppState<T> | AppState<T>[], callback?: () => void) => {
    if (!controllerRef.current._formRef) {
      console.error('Form ref not set.');
      return;
    }
    controllerRef.current.initState(state, callback);
  }, []);

  const continueTo = useCallback((next: T | undefined) => {
    controllerRef.current.continueTo(next);
  }, []);

  const validate = useCallback((
    e: Event,
    field: string,
    validators: FieldValidator[]
  ): [boolean, GoabFieldsetItemValue] => {
    return controllerRef.current.validate(e, field, validators);
  }, []);

  const getStateValue = useCallback((group: string, key: string): string => {
    return controllerRef.current.getStateValue(group, key);
  }, []);

  const getStateList = useCallback((): Record<string, string>[] => {
    return controllerRef.current.getStateList();
  }, []);

  return {
    state,
    init,
    initList,
    initState,
    continueTo,
    validate,
    getStateValue,
    getStateList,
    controller: controllerRef.current
  };
}
