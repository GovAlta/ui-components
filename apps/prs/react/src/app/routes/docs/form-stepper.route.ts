import { DocsFormStepperRoute } from "../../../routes/docs/form-stepper/form-stepper";
import type { PrRouteDefinition } from "../../route-manifest";

export default {
  type: "docs",
  id: "form-stepper",
  path: "docs/form-stepper",
  title: "Form Stepper",
  component: DocsFormStepperRoute,
} satisfies PrRouteDefinition;
