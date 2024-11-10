import { useState } from "react";
import { FlatList } from "react-native";

import { Control, FieldValues, Path, useController } from "react-hook-form";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { View } from "~/components/core";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import { ChevronDown, ChevronUp } from "~/lib/icons";
import { cn } from "~/lib/utils";

import FormErrorMessage from "./form-error-message";
import FormLabel from "./form-label";

interface Option {
  label: string;
  value: string;
}

interface FormSelectProps<T extends FieldValues> {
  name: Path<T>;
  control: Control<T>;
  label?: string;
  defaultValue?: Option;
  options: Option[];
}

const FormSelect = <T extends FieldValues>({
  name,
  control,
  label,
  defaultValue,
  options,
}: FormSelectProps<T>) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const insets = useSafeAreaInsets();

  const CheveronIcon = isOpen ? ChevronUp : ChevronDown;

  const contentInsets = {
    top: insets.top,
    bottom: insets.bottom,
    left: 16 - 2,
    right: 16 - 2,
  };

  const {
    field: { onChange, value },
    fieldState: { error },
  } = useController({
    control,
    name,
    defaultValue: defaultValue?.["value"] as any,
  });

  return (
    <View className="gap-2">
      <FormLabel>{label}</FormLabel>

      <Select
        defaultValue={defaultValue}
        onOpenChange={(val) => setIsOpen(val)}
        onValueChange={(option) => onChange(option?.value)}
      >
        <SelectTrigger className="w-full border-2">
          <SelectValue
            className={cn(
              "native:text-lg pla font-regular text-sm text-foreground",
              !value && "text-muted-foreground/50",
            )}
            placeholder="Select a fruit"
          />
          <CheveronIcon
            key="chevron-down-icon"
            size={16}
            aria-hidden={true}
            className={"text-foreground opacity-50"}
          />
        </SelectTrigger>

        <SelectContent insets={contentInsets} className="mt-1 w-full border-2">
          <SelectGroup>
            <FlatList
              data={options}
              keyExtractor={(option) => option.value}
              renderItem={({ item }) => (
                <SelectItem label={item.label} value={item.value} />
              )}
            />
          </SelectGroup>
        </SelectContent>
      </Select>

      <FormErrorMessage>{error?.message}</FormErrorMessage>
    </View>
  );
};

export default FormSelect;
