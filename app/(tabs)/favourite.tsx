import React from "react";
import { StyleSheet, FlatList } from "react-native";
import { useRouter } from "expo-router";
import { View, Text, Card } from "@/components/Themed";
import Container from "@/components/Container";
import useSpaceXStorage from "@/store/spaceXStore";
import dayjs from "dayjs";
import EmptyState from "@/components/EmptyList";

const FavouritesScreen = () => {
  const router = useRouter();
  const favourites = useSpaceXStorage((state) => state.favourites);
  const toggleFirstTime = useSpaceXStorage((state) => state.toggleFirstTime);

  const renderItem = ({ item }: any) => (
    <Card
      componentType="touchable"
      title={<></>}
      type="primary"
      variant="standard"
      image={{
        uri: item.links?.patch?.small || "",
      }}
      imageResize="contain"
      onPress={() => {
        toggleFirstTime("individual");
        router.push({
          pathname: "/(individual)/launchDetails",
          params: { launchId: item.id },
        });
      }}
    >
      <Text textSize="h2" variant="secondary">
        {item.name}
      </Text>
      <Text textSize="h4" variant="default">
        {dayjs(item.date_utc).format("Do MMMM YYYY [at] h:mm a")}
      </Text>
      <Text textSize="h6" variant="default" numberOfLines={3}>
        {item.details || "No details available"}
      </Text>
    </Card>
  );

  return (
    <Container variant="ghost">
      <Text
        variant="secondary"
        textSize="h1"
        style={{ marginBottom: 20, marginTop: 5 }}
      >
        Favourite Launches
      </Text>

      <FlatList
        data={favourites}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={() => (
          <EmptyState
            title="Oops! No favourites added yet"
            description="Please add any launch to favourites and view them here"
            image={require("@/assets/images/no-results.png")}
          />
        )}
      />
    </Container>
  );
};

export default FavouritesScreen;

const styles = StyleSheet.create({
  listContent: {
    padding: 16,
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 100,
  },
});
