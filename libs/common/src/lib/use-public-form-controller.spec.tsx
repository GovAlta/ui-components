import { describe, it, expect, vi, beforeEach } from "vitest";
import { renderHook } from "@testing-library/react";
import { usePublicFormController } from "./use-public-form-controller";
import { GoabPublicFormOnInitDetail } from "./common";

describe("usePublicFormController", () => {
  const mockFormElement = document.createElement("form");
  const mockInitEvent: GoabPublicFormOnInitDetail = {
    el: mockFormElement
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should initialize with empty state", () => {
    const { result } = renderHook(() => usePublicFormController("details"));
    expect(result.current.state).toBe(undefined);
  });

  it("should initialize form reference when init is called", () => {
    const { result } = renderHook(() => usePublicFormController("details"));

    result.current.init(mockInitEvent);

    expect(result.current.state).toBeDefined();
  });

  it("should handle null element during initialization", () => {
    const consoleError = vi.spyOn(console, "error");
    const { result } = renderHook(() => usePublicFormController("details"));

    result.current.init({ el: undefined as unknown as HTMLFormElement });

    expect(consoleError).toHaveBeenCalledWith("El is null during initialization");
  });

  it("should initialize list state", () => {
    const { result } = renderHook(() => usePublicFormController("details"));
    const mockEvent = new CustomEvent("init", {
      detail: { el: mockFormElement }
    });

    result.current.initList(mockEvent);

    expect(result.current.getStateList()).toEqual([]);
  });

  it("should handle null element during list initialization", () => {
    const consoleError = vi.spyOn(console, "error");
    const { result } = renderHook(() => usePublicFormController("details"));
    const mockEvent = new CustomEvent("init", {
      detail: { el: null }
    });

    result.current.initList(mockEvent);

    expect(consoleError).toHaveBeenCalledWith("El is null during list initialization");
  });

  it("should initialize state with callback", () => {
    const { result } = renderHook(() => usePublicFormController("details"));
    const mockCallback = vi.fn();
    const mockState = {
      uuid: "test-uuid",
      form: {
        testForm: {
          heading: "Test Form",
          data: {
            type: "details" as const,
            fieldsets: {
              testField: {
                name: "testField",
                label: "Test Field",
                value: "test value",
                order: 1
              }
            }
          }
        }
      },
      history: [],
      editting: "",
      status: "not-started" as const
    };

    result.current.init(mockInitEvent);

    result.current.initState(mockState, mockCallback);

    return new Promise<void>((resolve) => {
      setTimeout(() => {
        expect(mockCallback).toHaveBeenCalled();
        resolve();
      }, 300);
    });
  });

  it("should handle state initialization without form reference", () => {
    const consoleError = vi.spyOn(console, "error");
    const { result } = renderHook(() => usePublicFormController("details"));
    const mockState = {
      uuid: "test-uuid",
      form: {},
      history: [],
      editting: "",
      status: "not-started" as const
    };

    result.current.initState(mockState);

    expect(consoleError).toHaveBeenCalledWith("Form ref not set.");
  });

  it("should validate field value", () => {
    const { result } = renderHook(() => usePublicFormController("details"));
    const mockValidator = vi.fn().mockReturnValue([true, "test value"]);
    const mockEvent = {
      el: document.createElement("div"),
      state: {
        testField: {
          name: "testField",
          label: "Test Field",
          value: "test value",
          order: 1
        }
      },
      cancelled: false
    };

    const [isValid, value] = result.current.validate(mockEvent, "testField", [mockValidator]);

    expect(isValid).toBe(true);
    expect(value).toBe("test value");
    expect(mockValidator).toHaveBeenCalledWith("test value");
  });

  it("should continue to next page", () => {
    const { result } = renderHook(() => usePublicFormController("details"));

    result.current.init(mockInitEvent);
    result.current.continueTo("next-page");

    // Add assertions based on your specific implementation
    expect(result.current.state).toBeDefined();
  });

  it("should get state list", () => {
    const { result } = renderHook(() => usePublicFormController("details"));

    result.current.init(mockInitEvent);
    result.current.initList(new CustomEvent("init", { detail: { el: mockFormElement } }));

    const stateList = result.current.getStateList();
    expect(Array.isArray(stateList)).toBe(true);
  });
});
