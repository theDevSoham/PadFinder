import React from "react";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Tabs, Redirect } from "expo-router";

import Colors from "@/constants/Colors";
import { useColorScheme } from "@/components/useColorScheme";
import { useClientOnlyValue } from "@/components/useClientOnlyValue";
import useSpaceXStorage from "@/store/spaceXStore";
import { Platform } from "react-native";

// You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>["name"];
  color: string;
}) {
  return <FontAwesome size={28} style={{ marginBottom: -3 }} {...props} />;
}

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const { isFirstTime } = useSpaceXStorage();

  if (isFirstTime) {
    return <Redirect href="/(first_time)" />;
  } else {
    return (
      <Tabs
        screenOptions={{
          tabBarActiveTintColor:
            Colors[colorScheme ?? "light"].scheme_colors.secondary,
          tabBarInactiveTintColor:
            Colors[colorScheme ?? "light"].tabIconDefault,
          // Disable the static render of the header on web
          // to prevent a hydration error in React Navigation v6.
          headerShown: false,
          tabBarStyle: Platform.select({
            ios: {
              // Use a transparent background on iOS to show the blur effect
              position: "absolute",
            },
            default: {
              backgroundColor:
                Colors[colorScheme ?? "light"].scheme_colors.primary,
            },
          }),
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: "Launches",
            tabBarIcon: ({ color }) => (
              <TabBarIcon name="rocket" color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="two"
          options={{
            title: "Favourites",
            tabBarIcon: ({ color }) => <TabBarIcon name="star" color={color} />,
          }}
        />
      </Tabs>
    );
  }
}
