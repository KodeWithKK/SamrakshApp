import { Text, View } from "~/components/core";

export default function Modal() {
  return (
    <View className="flex-1 bg-secondary/30 px-4 py-4">
      <View className="gap-4 rounded-xl border border-secondary px-4 py-4">
        <Text>
          This is a quick starter template, configured for your next React
          Native project.
        </Text>
        <Text className="text-xl font-bold">📚 What's Inside</Text>

        <View>
          <Text>- Expo Router</Text>
          <Text>- Nativewind</Text>
          <Text>- RN Reusables</Text>
          <Text>- Prettier Linter</Text>
          <Text>- Zustand</Text>
        </View>
      </View>
    </View>
  );
}
