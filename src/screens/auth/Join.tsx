import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useState } from "react";
import { Pressable, Text, TextInput, View } from "react-native";

import { supabase } from "../../lib/supabase";
import { AuthStackParamList } from "../../navigation/AuthStack";

type Props = NativeStackScreenProps<AuthStackParamList, "Join">;

const Join = ({ navigation }: Props) => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  const signUpWithEmail = async () => {
    const { data, error } = await supabase.auth.signUp({
      email: email,
      password: password,
    });

    if (error) {
      setError(error.message);
      return;
    }

    const userID = data.user?.id as string;

    await addAdditionalData(userID);
  };

  const addAdditionalData = async (userID: string) => {
    const { error } = await supabase.from("profiles").upsert({
      id: userID,
      full_name: fullName,
      username: username,
    });

    if (error) setError(error.message);
  };

  return (
    <View className="mx-auto w-80 flex-1 flex-col items-center justify-center">
      <Text className="mb-6 text-3xl font-bold">Join ViewFinder</Text>
      <View className="w-full flex-col">
        <TextInput
          placeholder="Full Name"
          onChangeText={setFullName}
          value={fullName}
          className="mb-3 rounded-md border-2 border-neutral-300 p-2 focus:border-neutral-500 focus:outline-none"
        />
        <TextInput
          placeholder="Email"
          onChangeText={setEmail}
          value={email}
          className="mb-3 rounded-md border-2 border-neutral-300 p-2 focus:border-neutral-500 focus:outline-none"
        />
        <TextInput
          placeholder="Username"
          onChangeText={setUsername}
          value={username}
          className="mb-3 rounded-md border-2 border-neutral-300 p-2 focus:border-neutral-500 focus:outline-none"
        />
        <TextInput
          secureTextEntry
          placeholder="Password"
          onChangeText={setPassword}
          value={password}
          className="mb-3 rounded-md border-2 border-neutral-300 p-2 focus:border-neutral-500 focus:outline-none"
        />
        {error && (
          <Text className="mb-2 text-center text-xs font-semibold text-red-500">
            {error}
          </Text>
        )}
        <Pressable
          onPress={() => void signUpWithEmail()}
          className="mb-3 rounded-md border-2 border-neutral-300 bg-black p-2"
        >
          <Text className="text-center text-white">Join</Text>
        </Pressable>
      </View>
      <View className="mt-3 w-full flex-row items-center justify-between border-t-2 pt-3">
        <Text className="text-sm text-neutral-700">
          Already have an account?
        </Text>
        <Pressable
          onPress={() => {
            navigation.navigate("Login");
          }}
        >
          <Text>Login</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default Join;
