import { useCallback } from "react";
import { ViewProps } from "react-native";
import * as DocumentPicker from "expo-document-picker";

import { Control, FieldValues, Path, useController } from "react-hook-form";

interface UseDocumentPickerParams<T extends FieldValues> extends ViewProps {
  name: Path<T>;
  control: Control<T>;
  documentType: "image" | "video" | "any";
}

interface DocumentData {
  uri: string;
  name: string;
  size?: number;
  mimeType?: string;
}

interface UseDocumentPickerReturn {
  data: DocumentData | null;
  openPicker: () => Promise<void>;
}

export const useDocumentPicker = <T extends FieldValues>({
  name,
  control,
  documentType,
}: UseDocumentPickerParams<T>): UseDocumentPickerReturn => {
  const {
    field: { onChange, value },
  } = useController({ name, control });

  const openPicker = useCallback(async () => {
    try {
      const options: DocumentPicker.DocumentPickerOptions = {
        type:
          (documentType === "image" && "image/*") ||
          (documentType === "video" && "video/*") ||
          "*/*",
        copyToCacheDirectory: true,
      };

      const result = await DocumentPicker.getDocumentAsync(options);
      const asset = result.assets?.[0];

      if (asset) {
        onChange({
          uri: asset.uri,
          name: asset.name,
          size: asset.size,
          mimeType: asset.mimeType,
        });
      }
    } catch (error) {
      console.error("Error picking document:", error);
    }
  }, []);

  return { data: value ?? null, openPicker };
};
