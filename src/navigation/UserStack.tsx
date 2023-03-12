import { Entypo } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { DarkTheme, NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Session } from "@supabase/supabase-js";
import { useEffect, useState } from "react";
import { ActivityIndicator, View } from "react-native";

import { supabase, UserData } from "../../supabase";
import Feed from "../screens/Feed";
import Profile from "../screens/Profile";

export type UserStackParamList = { Home: undefined };

export type TabParamList = {
  Feed: undefined;
  Gallery: undefined;
  Upload: undefined;
  Profile: undefined;
  Account: undefined;
};

type SessionProps = { session: Session };

const Tab = createBottomTabNavigator<TabParamList>();
const Stack = createNativeStackNavigator<UserStackParamList>();

const HomeScreen = ({ session }: SessionProps) => {
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState<UserData | null>(null);

  useEffect(() => {
    if (session) {
      const getUserData = async () => {
        try {
          if (!session?.user) throw new Error("No user on the session!");

          const { data, error } = await supabase
            .from("profiles")
            .select("*")
            .eq("id", session.user.id)
            .single();

          if (error) throw error;
          if (data) setUserData(data);
        } catch (error) {
          console.log("error", error);
        } finally {
          setLoading(false);
        }
      };

      void getUserData();
    }
  }, [session]);

  if (loading || !userData)
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#fff" />
      </View>
    );

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: { height: 70, backgroundColor: "#000" },
        tabBarShowLabel: false,
      }}
    >
      <Tab.Screen
        name="Feed"
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <Entypo
              name="home"
              size={focused ? 32 : 28}
              color={focused ? "#fff" : "#71717a"}
            />
          ),
        }}
      >
        {(props) => (
          <Feed {...props} key={session.user.id} userData={userData} />
        )}
      </Tab.Screen>

      <Tab.Screen
        name="Gallery"
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <Entypo
              name="grid"
              size={focused ? 32 : 28}
              color={focused ? "#fff" : "#71717a"}
            />
          ),
        }}
      >
        {(props) => (
          <Feed {...props} key={session.user.id} userData={userData} />
        )}
      </Tab.Screen>

      <Tab.Screen
        name="Upload"
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <Entypo
              name="plus"
              size={focused ? 32 : 28}
              color={focused ? "#fff" : "#71717a"}
            />
          ),
        }}
      >
        {(props) => (
          <Feed {...props} key={session.user.id} userData={userData} />
        )}
      </Tab.Screen>

      <Tab.Screen
        name="Profile"
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <Entypo
              name="user"
              size={focused ? 32 : 28}
              color={focused ? "#fff" : "#71717a"}
            />
          ),
        }}
      >
        {(props) => (
          <Profile {...props} key={session.user.id} session={session} />
        )}
      </Tab.Screen>

      <Tab.Screen
        name="Account"
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <Entypo
              name="cog"
              size={focused ? 32 : 28}
              color={focused ? "#fff" : "#71717a"}
            />
          ),
        }}
      >
        {(props) => (
          <Profile {...props} key={session.user.id} session={session} />
        )}
      </Tab.Screen>
    </Tab.Navigator>
  );
};

const UserStack = ({ session }: SessionProps) => {
  return (
    <NavigationContainer theme={DarkTheme}>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" options={{ headerShown: false }}>
          {(props) => (
            <HomeScreen {...props} key={session.user.id} session={session} />
          )}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default UserStack;
