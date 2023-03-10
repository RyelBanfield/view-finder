import "./src/styles";
import "react-native-url-polyfill/auto";

import { Session } from "@supabase/supabase-js";
import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";

import { supabase } from "./src/lib/supabase";
import AuthStack from "./src/navigation/AuthStack";
import UserStack from "./src/navigation/UserStack";

const App = () => {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    void supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setLoading(false);
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setLoading(false);
    });
  }, []);

  if (loading) return null;

  return (
    <>
      <StatusBar style="auto" />
      {session && session.user ? (
        <UserStack session={session} />
      ) : (
        <AuthStack />
      )}
    </>
  );
};

export default App;
