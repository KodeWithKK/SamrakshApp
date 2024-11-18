import AppProvider from "./app-provider";
import RootProvider from "./root-provider";
import ToastProvider from "./toast-provider";

const ContextProviders = ({ children }: { children: React.ReactNode }) => {
  return (
    <RootProvider>
      <AppProvider>
        <ToastProvider>{children}</ToastProvider>
      </AppProvider>
    </RootProvider>
  );
};

export default ContextProviders;
