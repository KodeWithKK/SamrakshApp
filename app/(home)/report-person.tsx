import { ScrollView } from "react-native";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Button, Text, View } from "~/components/core";
import FormTextInput from "~/components/core/FormTextInput";
import { reportFormSchema, ReportFormValues } from "~/schema/report-form";

const ReportPerson = () => {
  const {
    control,
    handleSubmit,
    // formState: { errors },
  } = useForm<ReportFormValues>({
    resolver: zodResolver(reportFormSchema),
  });

  const onSubmit = handleSubmit((data) => console.log(data));

  return (
    <ScrollView>
      <View className="flex-1 gap-4 bg-secondary/30 px-4 pb-8 pt-4 dark:bg-background">
        <Text className="mb-4 font-semibold text-[15px] uppercase text-muted-foreground">
          Missing Person Details
        </Text>

        <View className="gap-1">
          <Text>Name</Text>
          <FormTextInput
            control={control}
            name="fullname"
            placeholder="Enter full name"
          />
        </View>

        <View className="gap-1">
          <Text className="mb-1">Gender</Text>
          <FormTextInput
            control={control}
            name="gender"
            placeholder="Enter gender"
          />
        </View>

        <View className="gap-1">
          <Text className="mb-1">Age</Text>
          <FormTextInput
            control={control}
            name="age"
            inputMode="numeric"
            placeholder="Enter age"
          />
        </View>

        <View className="gap-1">
          <Text className="mb-1">Appearance</Text>
          <FormTextInput
            control={control}
            name="describe_appearance"
            placeholder="Enter appearance details"
          />
        </View>

        <View className="gap-1">
          <Text className="mb-1">Last Seen</Text>
          <FormTextInput
            control={control}
            name="last_seen_location"
            placeholder="Enter last seen location"
          />
        </View>

        <Text className="my-4 font-semibold text-[15px] uppercase text-muted-foreground">
          Follow Up Details
        </Text>

        <View className="gap-1">
          <Text className="mb-1">Name</Text>
          <FormTextInput
            control={control}
            name="follow_up_name"
            placeholder="Enter full name"
          />
        </View>

        <View className="gap-1">
          <Text className="mb-1">Phone Number</Text>
          <FormTextInput
            control={control}
            name="follow_up_phone"
            inputMode="tel"
            placeholder="Enter phone number"
          />
        </View>

        <View className="gap-1">
          <Text className="mb-1">Email</Text>
          <FormTextInput
            control={control}
            name="follow_up_email"
            inputMode="email"
            placeholder="Enter email"
          />
        </View>

        <View className="gap-1">
          <Text className="mb-1">Address</Text>
          <FormTextInput
            control={control}
            name="follow_up_address"
            placeholder="Enter address"
          />
        </View>

        <Button className="mt-4" onPress={onSubmit}>
          <Text>Submit</Text>
        </Button>
      </View>
    </ScrollView>
  );
};

export default ReportPerson;
