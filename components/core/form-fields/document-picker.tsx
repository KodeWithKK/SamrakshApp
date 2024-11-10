import { useCallback } from "react";
import { ImageBackground, TouchableOpacity, ViewProps } from "react-native";
import * as ExpoDocumentPicker from "expo-document-picker";

import { Control, FieldValues, Path, useController } from "react-hook-form";

import { Text, View } from "~/components/core";
import { UploadIcon } from "~/lib/icons";
import { cn } from "~/lib/utils";

import ErrorMessage from "./error-message";

interface DocumentPickerAsset {
  uri: string;
  name: string;
  size?: number;
  mimeType?: string;
}

interface DocumentPickerProps<T extends FieldValues> extends ViewProps {
  name: Path<T>;
  control: Control<T>;
  documentType: "image" | "video" | "any";
  label?: string;
}

export const DocumentPicker = <T extends FieldValues>({
  name,
  control,
  label,
  documentType,
}: DocumentPickerProps<T>) => {
  const {
    field: { onChange, value },
    fieldState: { error },
  } = useController({ name, control });

  const openPicker = useCallback(async () => {
    try {
      const options: ExpoDocumentPicker.DocumentPickerOptions = {
        type:
          (documentType === "image" && "image/*") ||
          (documentType === "video" && "video/*") ||
          "*/*",
        copyToCacheDirectory: true,
      };

      const result = await ExpoDocumentPicker.getDocumentAsync(options);
      const asset = result.assets?.[0];

      if (asset) {
        onChange({
          uri: asset.uri,
          name: asset.name,
          size: asset.size,
          mimeType: asset.mimeType,
        } as DocumentPickerAsset);
      }
    } catch (error) {
      console.error("Error picking document:", error);
    }
  }, [documentType, onChange]);

  return (
    <View className="gap-2">
      {label && <Text className="text-muted-foreground">{label}</Text>}

      <TouchableOpacity
        activeOpacity={0.75}
        onPress={openPicker}
        className={cn(
          "h-64 rounded-md border-2 border-dashed border-border bg-background",
          value && "border-0 bg-black",
        )}
      >
        <ImageBackground
          source={{ uri: value?.uri }}
          resizeMode="cover"
          className="h-full w-full items-center justify-center"
          imageClassName="rounded-md opacity-30"
        >
          <View className="-mt-4 items-center">
            <UploadIcon
              className={cn(
                "text-bg h-24 w-24 text-muted-foreground",
                value && "text-gray-200",
              )}
            />
            <Text
              className={cn("text-muted-foreground", value && "text-gray-200")}
            >
              Upload Image
            </Text>
          </View>
        </ImageBackground>
      </TouchableOpacity>

      <ErrorMessage>{error?.message}</ErrorMessage>
    </View>
  );
};
