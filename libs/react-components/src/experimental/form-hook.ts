import { useState } from "react";

// export type FormState = {
//   form: Record<string, string>;
//   errors: Record<string, string>;
//   history: string[];
//   lastModified?: Date;
// };

// useSimpleForm types
type ContinueTo = (next: string) => void;
type OnMount = (next: ContinueTo) => void;
type SimpleForm = {
  onMount: OnMount;
  continueTo: ContinueTo;
};

export function useSimpleForm(): SimpleForm {
  const [continueTo, setContinueTo] = useState<{ fn: ContinueTo }>({
    fn: (_: string) => {
      // empty
    },
  });

  function onMount(next: ContinueTo) {
    const _next = (id: string) => {
      next(id);
    };
    setContinueTo({ fn: _next });
  }

  return { onMount, continueTo: continueTo.fn };
}
