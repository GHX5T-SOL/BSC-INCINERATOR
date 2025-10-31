"use client";

import { useWeb3Modal } from "@web3modal/wagmi/react";
import { ReactNode, createContext, useContext, useState, useEffect } from "react";

interface Web3ModalContextType {
  open: () => Promise<void>;
  isAvailable: boolean;
}

const Web3ModalContext = createContext<Web3ModalContextType | null>(null);

export function useSafeWeb3Modal() {
  const context = useContext(Web3ModalContext);
  if (!context) {
    return {
      open: async () => {
        // Fallback to direct ethereum injection
        if (typeof window !== "undefined" && (window as any).ethereum) {
          await (window as any).ethereum.request({ method: 'eth_requestAccounts' });
        }
      },
      isAvailable: false,
    };
  }
  return context;
}

export function SafeWeb3ModalProvider({ children }: { children: ReactNode }) {
  const [modalState, setModalState] = useState<{open: () => Promise<void>; isAvailable: boolean}>({
    open: async () => {
      if (typeof window !== "undefined" && (window as any).ethereum) {
        await (window as any).ethereum.request({ method: 'eth_requestAccounts' });
      }
    },
    isAvailable: false,
  });

  // Always call hook unconditionally (React rules)
  const modal = useWeb3Modal();
  
  useEffect(() => {
    // Update state once hook is available
    setModalState({
      open: modal.open,
      isAvailable: true,
    });
  }, [modal]);

  return (
    <Web3ModalContext.Provider value={modalState}>
      {children}
    </Web3ModalContext.Provider>
  );
}

