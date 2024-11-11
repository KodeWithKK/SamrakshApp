import { ScrollView } from "react-native";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Button, Text, View } from "~/components/core";
import {
  FormDocumentPicker,
  FormSelect,
  FormTextInput,
} from "~/components/core/form-fields";
import { IReportForm, reportFormSchema } from "~/schema/report-form";

const ReportPerson = () => {
  const { control, handleSubmit } = useForm<IReportForm>({
    resolver: zodResolver(reportFormSchema),
  });

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

        <FormSelect
          label="Gender"
          control={control}
          name="gender"
          options={[
            { label: "Male", value: "male" },
            { label: "Female", value: "female" },
            { label: "Other", value: "other" },
          ]}
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

        <FormDocumentPicker
          label="Upload Person Image"
          control={control}
          name="file"
          documentType="image"
        />

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
          <Text className="font-medium text-lg text-primary-foreground">
            Submit
          </Text>
        </Button>
      </View>
    </ScrollView>
  );
};

export default ReportPerson;
