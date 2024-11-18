import { createContext, useContext, useState } from "react";

import ToastContainer, { IToast } from "~/components/core/toast-container";

interface IToastContext {
  showToast: (message: string) => void;
}

const ToastContext = createContext<null | IToastContext>(null);

const ToastProvider = ({ children }: { children: React.ReactNode }) => {
  const [toasts, setToasts] = useState<IToast[]>([]);

  const showToast = (message: string) => {
    const id = Math.random().toString();
    setToasts((prev) => [...prev, { id, message }]);

    setTimeout(() => {
      setToasts((prev) => prev.filter((toast) => toast.id !== id));
    }, 3000);
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <ToastContainer toasts={toasts} />
    </ToastContext.Provider>
  );
};

export const useToastContext = () => {
  return useContext(ToastContext) as IToastContext;
};

export default ToastProvider;
