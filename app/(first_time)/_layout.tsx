import React from "react";
import { Slot, Redirect } from "expo-router";

import useSpaceXStorage from "@/store/spaceXStore";

export default function FirstTimeLayout() {
  const { isFirstTime } = useSpaceXStorage();

  if (isFirstTime) {
    return <Slot />;
  } else {
    return <Redirect href="/(tabs)" />;
  }
}
