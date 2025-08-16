import React from "react";
import { Slot, Redirect } from "expo-router";

import useSpaceXStorage from "@/store/spaceXStore";

export default function FirstTimeLayout() {
  const { isFirstTime } = useSpaceXStorage();

  switch (isFirstTime) {
    case "first_time":
      return <Redirect href="/(first_time)" />;
    case "individual":
      return <Slot />;
    case "not_first":
      return <Redirect href="/(tabs)" />;
  }
}
