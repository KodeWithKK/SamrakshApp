import { TouchableOpacity } from "react-native";
import { Href, router } from "expo-router";

import { SvgProps } from "react-native-svg";

import { Text, View } from "~/components/core";
import {
  FoundedPersonIcon,
  MissingPersonIcon,
  ReportIcon,
  SOSIcon,
} from "~/lib/icons";

const HomeScreen = () => {
  return (
    <View className="flex-1 gap-2 bg-secondary/30 px-4 py-6 dark:bg-background">
      <View className="flex-row gap-2">
        <HomeButton
          Icon={ReportIcon}
          text="Report a Missing Person"
          href={"/report-person"}
        />
        <HomeButton Icon={SOSIcon} text="Raise a SOS" href={"/sos"} />
      </View>
      <View className="flex-row gap-2">
        <HomeButton
          Icon={MissingPersonIcon}
          text="View Missing Persons"
          href={"/missing-persons"}
        />
        <HomeButton
          Icon={FoundedPersonIcon}
          text="View Founded Persons"
          href={"/founded-persons"}
        />
      </View>
    </View>
  );
};

interface HomeButtonProps {
  Icon: React.FC<SvgProps>;
  text: string;
  href?: Href;
}

function HomeButton({ Icon, text, href }: Readonly<HomeButtonProps>) {
  return (
    <TouchableOpacity
      className="flex-1 items-center gap-2 rounded-lg bg-secondary px-4 py-5"
      onPress={() => router.push(href as Href)}
    >
      <Icon className="h-10 w-10 text-foreground" />
      <Text className="mt-2 text-center text-[15px] leading-tight text-secondary-foreground">
        {text}
      </Text>
    </TouchableOpacity>
  );
}

export default HomeScreen;
