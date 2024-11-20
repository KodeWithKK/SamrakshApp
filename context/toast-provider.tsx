import { createContext, useContext, useMemo, useState } from "react";

import ToastContainer, { IToast } from "~/components/core/toast-container";

interface IToastContext {
  toast: {
    success: (message: string) => void;
    warning: (message: string) => void;
    info: (message: string) => void;
    error: (message: string) => void;
  };
}

const ToastContext = createContext<null | IToastContext>(null);

const ToastProvider = ({ children }: { children: React.ReactNode }) => {
  const [toasts, setToasts] = useState<IToast[]>([]);

  const addToast = (type: IToast["type"], message: string) => {
    const id = Math.random().toString();
    setToasts((prev) => [...prev, { id, message, type }]);

    setTimeout(() => {
      setToasts((prev) => prev.filter((toast) => toast.id !== id));
    }, 3300);
  };

  const toast = useMemo(
    () => ({
      success: (message: string) => addToast("success", message),
      warning: (message: string) => addToast("warning", message),
      info: (message: string) => addToast("info", message),
      error: (message: string) => addToast("error", message),
    }),
    [],
  );

  return (
    <ToastContext.Provider value={{ toast }}>
      {children}
      <ToastContainer toasts={toasts} />
    </ToastContext.Provider>
  );
};

export const useToastContext = () => {
  return useContext(ToastContext) as IToastContext;
};

export default ToastProvider;
