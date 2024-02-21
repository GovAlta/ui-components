import * as matchers from "vitest-dom/matchers";
import * as moreExpect from "vitest-dom/extend-expect";

import { expect } from "vitest";

expect.extend(matchers);
expect.extend(moreExpect);
