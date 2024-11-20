import { Portal } from "@rn-primitives/portal";
import { SafeAreaView } from "react-native-safe-area-context";

import Toast from "./toast";

export interface IToast {
  id: string;
  message: string;
  type: "success" | "error" | "warning" | "info";
}

interface ToastContainerProps {
  toasts: IToast[];
}

const ToastContainer = ({ toasts }: ToastContainerProps) => {
  return (
    <Portal name="toast-portal">
      <SafeAreaView className="absolute left-5 right-5 top-5 z-50 gap-2">
        {toasts.map((toast) => (
          <Toast key={toast.id} message={toast.message} type={toast.type} />
        ))}
      </SafeAreaView>
    </Portal>
  );
};

export default ToastContainer;
