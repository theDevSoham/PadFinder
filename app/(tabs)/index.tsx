import { StyleSheet } from "react-native";
import React from "react";
import { Card, Text, View } from "@/components/Themed";
import Container from "@/components/Container";

const LaunchesScreen = () => {
  return (
    <Container variant="ghost">
      <View>
        <Card type="primary" variant="strip">
          <Text textSize="h4" variant="secondary">Hello</Text>
          <Text textSize="h6" variant="alt">Hello World</Text>
        </Card>
      </View>
    </Container>
  );
};

export default LaunchesScreen;

const styles = StyleSheet.create({});
