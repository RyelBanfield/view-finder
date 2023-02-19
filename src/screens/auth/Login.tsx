import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useState } from "react";
import { Alert, Pressable, Text, TextInput, View } from "react-native";

import { supabase } from "../../lib/supabase";
import { AuthStackParamList } from "../../navigation/AuthStack";

type Props = NativeStackScreenProps<AuthStackParamList, "Login">;

const Login = ({ navigation }: Props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const signInWithEmail = async () => {
    const { error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });

    if (error) Alert.alert(error.message);
  };

  return (
    <View className="flex-1 flex-col items-center justify-center">
      <Text className="mb-2 text-3xl font-bold">ViewFinder</Text>
      <Text className="mb-6 text-sm">Welcome back.</Text>
      <View className="w-64 flex-col">
        <TextInput
          placeholder="Email"
          onChangeText={setEmail}
          value={email}
          className="mb-2 rounded-md border-2 border-neutral-200 p-2 focus:border-neutral-500 focus:outline-none"
        />
        <TextInput
          placeholder="Password"
          secureTextEntry
          onChangeText={setPassword}
          value={password}
          className="mb-2 rounded-md border-2 border-neutral-200 p-2 focus:border-neutral-500 focus:outline-none"
        />
        <Pressable
          onPress={() => void signInWithEmail()}
          className="mb-2 rounded-md border-2 border-neutral-200 bg-black p-2"
        >
          <Text className="text-center text-white">Log In</Text>
        </Pressable>
      </View>
      <View className="mt-3 w-64 flex-row items-center justify-between border-t-2 pt-3">
        <Text className="text-sm text-neutral-700">
          Don&apos;t have an account?
        </Text>
        <Pressable
          onPress={() => {
            navigation.navigate("Join");
          }}
        >
          <Text className="text-sm">Join VF</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default Login;
