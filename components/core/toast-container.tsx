import { Portal } from "@rn-primitives/portal";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";

import { Text } from "~/components/core";

export interface IToast {
  id: string;
  message: string;
}

interface ToastContainerProps {
  toasts: IToast[];
}

const ToastContainer = ({ toasts }: ToastContainerProps) => {
  return (
    <Portal name="toast-portal">
      <SafeAreaView className="absolute left-5 right-5 top-5 z-50">
        {toasts.map((toast) => (
          <Toast key={toast.id} message={toast.message} />
        ))}
      </SafeAreaView>
    </Portal>
  );
};

interface ToastProps {
  message: string;
}

const Toast = ({ message }: ToastProps) => {
  const translateY = useSharedValue(0);
  const opacity = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
    opacity: opacity.value,
  }));

  const panGesture = Gesture.Pan()
    .onUpdate((e) => {
      translateY.value = e.translationY;
    })
    .onEnd(() => {
      if (translateY.value > 100) {
        opacity.value = withTiming(0, { duration: 300 });
      } else {
        translateY.value = withSpring(0);
      }
    });

  return (
    <GestureDetector gesture={panGesture}>
      <Animated.View
        className="mb-2 rounded bg-gray-800 px-4 py-2 text-white"
        style={[animatedStyle]}
      >
        <Text className="text-sm text-white">{message}</Text>
      </Animated.View>
    </GestureDetector>
  );
};

export default ToastContainer;
