import { View } from "~/components/core";
import { LoaderIcon } from "~/lib/icons";
import { cn } from "~/lib/utils";

interface InlineLoaderProps {
  loaderClass?: string;
}

export const InlineLoader = ({ loaderClass }: InlineLoaderProps) => {
  return (
    <View className="animate-spin duration-500">
      <LoaderIcon className={cn("h-8 w-8 text-white", loaderClass)} />
    </View>
  );
};
