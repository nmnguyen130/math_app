import React from "react";
import { Stack } from "expo-router";

const StackLayout = () => {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="home" options={{ title: "Home" }} />
      <Stack.Screen
        name="solve/[type]"
        options={{
          title: `Solve`,
          headerBackTitle: "Back",
        }}
      />
      <Stack.Screen name="scan" options={{ title: "Scan & Solve" }} />
      <Stack.Screen name="draw" options={{ title: "Draw Equation" }} />
      <Stack.Screen name="video" options={{ title: "Tutorial Videos" }} />
      <Stack.Screen name="practice" options={{ title: "Practice Problems" }} />
      <Stack.Screen name="setting" options={{ title: "Settings" }} />
    </Stack>
  );
};

export default StackLayout;
