import { Avatar } from "@rneui/themed";
import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { UserData } from "../../supabase";

const Feed = ({ userData }: { userData: UserData }) => {
  return (
    <SafeAreaView className="p-6">
      <View className="flex-row items-center justify-between">
        <Text className="text-xl font-bold text-white">VF</Text>
        <Avatar
          source={{
            uri: `https://api.dicebear.com/5.x/lorelei-neutral/png?seed=${
              userData.username as string
            }`,
          }}
          size="medium"
          rounded
        />
      </View>
    </SafeAreaView>
  );
};

export default Feed;
