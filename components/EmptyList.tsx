import React from "react";
import { StyleSheet, Image } from "react-native";
import { Text, View, Button } from "@/components/Themed";

type EmptyStateProps = {
  title: string;
  description?: string;
  image?: any;
  onRetry?: () => void;
};

const EmptyState = ({
  title,
  description,
  image,
  onRetry,
}: EmptyStateProps) => {
  return (
    <View style={styles.container}>
      {image && (
        <Image source={image} style={styles.image} resizeMode="contain" />
      )}
      <Text textSize="h3" variant="secondary" style={styles.title}>
        {title}
      </Text>
      {description ? (
        <Text textSize="h5" variant="default" style={styles.description}>
          {description}
        </Text>
      ) : null}
      {onRetry && (
        <Button
          title="Try Again"
          variant="primary"
          onPress={onRetry}
          style={{ marginTop: 16 }}
        />
      )}
    </View>
  );
};

export default EmptyState;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
    paddingVertical: 40,
  },
  image: {
    width: 180,
    height: 180,
    marginBottom: 20,
  },
  title: {
    textAlign: "center",
    marginBottom: 8,
  },
  description: {
    textAlign: "center",
    opacity: 0.7,
  },
});
