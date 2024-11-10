import { TextInputProps } from "react-native";

import { Control, Controller, FieldValues, Path } from "react-hook-form";

import { Input } from "../ui/input";

interface FormTextInputProps<T extends FieldValues> extends TextInputProps {
  name: Path<T>;
  control: Control<T>;
}

const FormTextInput = <T extends FieldValues>({
  name,
  control,
  ...restProps
}: FormTextInputProps<T>) => {
  return (
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
  );
};

export default FormTextInput;
