import { ScrollView, TouchableOpacity } from "react-native";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Button, Text, View } from "~/components/core";
import { FormTextInput } from "~/components/core/form-fields";
import { useDocumentPicker } from "~/hooks/use-document-picker";
import { IReportForm, reportFormSchema } from "~/schema/report-form";

const ReportPerson = () => {
  const { control, handleSubmit } = useForm<IReportForm>({
    resolver: zodResolver(reportFormSchema),
  });

  const { data, openPicker } = useDocumentPicker({
    control,
    name: "file",
    documentType: "image",
  });

  console.log(data);

  const onSubmit = handleSubmit((data) => console.log(data));

  return (
    <ScrollView>
      <View className="flex-1 gap-4 bg-secondary/30 px-4 pb-8 pt-4 dark:bg-background">
        <Text className="mb-4 font-semibold text-[15px] uppercase text-muted-foreground">
          Missing Person Details
        </Text>

        <FormTextInput
          label="Name"
          control={control}
          name="fullname"
          placeholder="Enter full name"
        />

        <FormTextInput
          label="Gender"
          control={control}
          name="gender"
          placeholder="Enter gender"
        />

        <FormTextInput
          label="Age"
          control={control}
          name="age"
          inputMode="numeric"
          placeholder="Enter age"
        />

        <FormTextInput
          label="Appearnce"
          control={control}
          name="describe_appearance"
          placeholder="Enter appearance details"
        />

        <FormTextInput
          label="Last Seen"
          control={control}
          name="last_seen_location"
          placeholder="Enter last seen location"
        />

        <TouchableOpacity
          className="self-start rounded-md border-2 border-border bg-secondary p-3"
          onPress={openPicker}
        >
          <Text className="text-center text-secondary-foreground">
            Upload Image File
          </Text>
        </TouchableOpacity>

        <Text className="my-4 font-semibold text-[15px] uppercase text-muted-foreground">
          Follow Up Details
        </Text>

        <FormTextInput
          label="Name"
          control={control}
          name="follow_up_name"
          placeholder="Enter full name"
        />

        <FormTextInput
          label="Phone Number"
          control={control}
          name="follow_up_phone"
          inputMode="tel"
          placeholder="Enter phone number"
        />

        <FormTextInput
          label="Email"
          control={control}
          name="follow_up_email"
          inputMode="email"
          placeholder="Enter email"
        />

        <FormTextInput
          label="Address"
          control={control}
          name="follow_up_address"
          placeholder="Enter address"
        />

        <Button className="mt-4" onPress={onSubmit}>
          <Text>Submit</Text>
        </Button>
      </View>
    </ScrollView>
  );
};

export default ReportPerson;
