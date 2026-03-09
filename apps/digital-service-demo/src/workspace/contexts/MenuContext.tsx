import { createContext, useContext, useState, ReactNode, useEffect } from "react";

interface MenuContextType {
  menuOpen: boolean;
  setMenuOpen: (open: boolean) => void;
  isMobile: boolean;
}

export const MenuContext = createContext<MenuContextType | undefined>(undefined);

const MOBILE_BREAKPOINT = 768;

export function MenuProvider({ children }: { children: ReactNode }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < MOBILE_BREAKPOINT);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <MenuContext.Provider value={{ menuOpen, setMenuOpen, isMobile }}>
      {children}
    </MenuContext.Provider>
  );
}

export function useMenu() {
  const context = useContext(MenuContext);
  if (context === undefined) {
    throw new Error("useMenu must be used within MenuProvider");
  }
  return context;
}
