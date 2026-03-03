import { createContext, useContext, useState, useCallback, ReactNode } from "react";

type DrawerType = "review" | null;
type DecisionType = "approve" | "deny" | "requestInfo" | null;

interface ActionHandlers {
  onSubmitReview?: (decision: Exclude<DecisionType, null>, details: string) => Promise<void>;
}

interface PushDrawerContextValue {
  isOpen: boolean;
  drawerType: DrawerType;
  decision: DecisionType;
  setDecision: (decision: DecisionType) => void;
  formValue: string;
  setFormValue: (value: string) => void;
  openDrawer: () => void;
  closeDrawer: () => void;
  handlers: ActionHandlers;
  registerHandlers: (handlers: ActionHandlers) => void;
}

const PushDrawerContext = createContext<PushDrawerContextValue | null>(null);

export function PushDrawerProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [drawerType, setDrawerType] = useState<DrawerType>(null);
  const [decision, setDecision] = useState<DecisionType>(null);
  const [formValue, setFormValue] = useState("");
  const [handlers, setHandlers] = useState<ActionHandlers>({});

  const openDrawer = useCallback(() => {
    setDrawerType("review");
    setDecision(null);
    setFormValue("");
    setIsOpen(true);
  }, []);

  const closeDrawer = useCallback(() => {
    setIsOpen(false);
    setFormValue("");
    setDecision(null);
    setTimeout(() => setDrawerType(null), 300);
  }, []);

  const registerHandlers = useCallback((newHandlers: ActionHandlers) => {
    setHandlers(newHandlers);
  }, []);

  return (
    <PushDrawerContext.Provider value={{
      isOpen,
      drawerType,
      decision,
      setDecision,
      formValue,
      setFormValue,
      openDrawer,
      closeDrawer,
      handlers,
      registerHandlers,
    }}>
      {children}
    </PushDrawerContext.Provider>
  );
}

export function usePushDrawer() {
  const context = useContext(PushDrawerContext);
  if (!context) {
    throw new Error("usePushDrawer must be used within a PushDrawerProvider");
  }
  return context;
}
