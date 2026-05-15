import { describe, it, expect } from "vitest";
import { PublicFormController } from "./public-form-controller";

describe("PublicFormController", () => {
  const pfc = new PublicFormController("details");

  describe("clean", () => {
    const data = JSON.parse(
      `{"uuid":"5cdcd318-0219-49a8-9dc1-cd2df5f02875","form":{"what-is-your-role":{"data":{"type":"details","fieldsets":{"role":{"name":"role","value":"Recipient","label":"Role","order":1}}}},"children-subform":{"data":{"type":"list","items":[{"uuid":"f47d2410-8ab9-4bb0-9571-9fc5211416a9","form":{"name":{"data":{"type":"details","fieldsets":{"firstName":{"name":"firstName","value":"asdf","label":"First name","order":1},"lastName":{"name":"lastName","value":"asdf","label":"Last name","order":2}}}},"alternate-name":{"data":{"type":"details","fieldsets":{"alternate-name":{"name":"alternate-name","value":"asdf","label":"Alternate name","order":1}}}},"dob":{"heading":""},"complete":{"heading":"Complete"}},"history":["name","alternate-name","dob","complete"],"editting":"","lastModified":"2025-01-28T19:50:56.255Z","status":"not-started"},{"uuid":"9d3c44fe-2a38-4faf-a684-8d93799bbf8b","form":{"name":{"data":{"type":"details","fieldsets":{"firstName":{"name":"firstName","value":"dsfdfgh","label":"First name","order":1},"lastName":{"name":"lastName","value":"dfgh","label":"Last name","order":2}}}},"alternate-name":{"data":{"type":"details","fieldsets":{"alternate-name":{"name":"alternate-name","value":"dfgh","label":"Alternate name","order":1}}}}},"history":["name","alternate-name","dob","complete"],"editting":"","lastModified":"2025-01-28T19:51:02.919Z","status":"not-started"}]}},"address":{"data":{"type":"details","fieldsets":{"city":{"name":"city","value":"dfgh","label":"City","order":1},"address":{"name":"address","value":"dfgh","label":"Address","order":2},"postal-code":{"name":"postal-code","value":"dfg","label":"Postal Code","order":3}}}},"summary":{"heading":"Summary"},"index":{"heading":""}},"history":["children-subform","address","summary"],"editting":"","status":"not-started"}`,
    );

    it("should clean the data", () => {
      const cleaned = pfc.clean(data);
      expect(data.history.length).toBe(3);
      expect(data.history.length).toEqual(Object.keys(cleaned).length);
    });
  });
});
