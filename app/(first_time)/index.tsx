import { Image, StyleSheet } from "react-native";
import { View, Text, Button } from "@/components/Themed";
import React from "react";
import Container from "@/components/Container";
import useSpaceXStorage from "@/store/spaceXStore";
import { useShallow } from "zustand/react/shallow";
import { useRouter } from "expo-router";

const WelcomeScreen = () => {
  const toggleFirstTime = useSpaceXStorage(
    useShallow((state) => state.toggleFirstTime)
  );
  const router = useRouter();

  const getStarted = () => {
    toggleFirstTime("not_first");
    router.replace("/(tabs)");
  };

  return (
    <Container variant="primary">
      <View style={styles.container}>
        <View style={styles.imageContainer}>
          <Image
            source={require("@/assets/images/welcome.png")}
            style={styles.image}
          />
        </View>

        <View style={styles.textContainer}>
          <Text
            variant="default"
            textSize="h1"
            multiple={1.5}
            style={{ textAlign: "center" }}
          >
            PadFinder
          </Text>
          <Text variant="default" textSize="h3" style={{ textAlign: "center" }}>
            Explore SpaceX launch sites with ease
          </Text>
        </View>

        <View style={styles.buttonContainer}>
          <Button
            variant="secondary"
            title="Get Started"
            style={{ width: "100%" }}
            onPress={getStarted}
          />
        </View>
      </View>
    </Container>
  );
};

export default WelcomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  imageContainer: {
    flex: 3.5,
    alignItems: "center",
    justifyContent: "flex-end",
  },

  textContainer: {
    flex: 2,
    gap: 10,
  },

  buttonContainer: {
    flex: 2,
    justifyContent: "center",
    alignItems: "center",
  },

  image: {
    width: 500,
    height: "100%",
    objectFit: "cover",
  },
});
