import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Session } from "@supabase/supabase-js";

import Account from "../screens/Account";

export type UserStackParamList = {
  Account: undefined;
};

export type TabParamList = {
  Details: undefined;
};

type SessionProps = {
  session: Session;
};

const Tab = createBottomTabNavigator<TabParamList>();
const Stack = createNativeStackNavigator<UserStackParamList>();

const HomeScreen = ({ session }: SessionProps) => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Details" options={{ headerShown: false }}>
        {(props) => (
          <Account {...props} key={session.user.id} session={session} />
        )}
      </Tab.Screen>
    </Tab.Navigator>
  );
};

const UserStack = ({ session }: SessionProps) => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Account">
        <Stack.Screen name="Account" options={{ headerShown: false }}>
          {(props) => (
            <HomeScreen {...props} key={session.user.id} session={session} />
          )}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default UserStack;
