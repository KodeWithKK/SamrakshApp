import { View } from "~/components/core";
import { LoaderIcon } from "~/lib/icons";

export const InlineLoader = () => {
  return (
    <View className="animate-spin duration-500">
      <LoaderIcon className="h-8 w-8 text-white" />
    </View>
  );
};
