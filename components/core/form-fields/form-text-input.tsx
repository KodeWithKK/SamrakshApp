import { TextInputProps } from "react-native";

import {
  Control,
  Controller,
  FieldValues,
  Path,
  useController,
} from "react-hook-form";

import { Text, View } from "..";
import { Input } from "../../ui/input";
import ErrorMessage from "./error-message";

interface FormTextInputProps<T extends FieldValues> extends TextInputProps {
  name: Path<T>;
  control: Control<T>;
  label?: string;
}

const FormTextInput = <T extends FieldValues>({
  name,
  control,
  label,
  ...restProps
}: FormTextInputProps<T>) => {
  const {
    fieldState: { error },
  } = useController({ name, control });

  return (
    <View className="gap-2">
      {label && <Text className="text-muted-foreground">{label}</Text>}
      <Controller
        name={name}
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <Input
            value={value}
            onBlur={onBlur}
            onChangeText={onChange}
            {...restProps}
          />
        )}
      />
      <ErrorMessage>{error?.message}</ErrorMessage>
    </View>
  );
};

export default FormTextInput;
