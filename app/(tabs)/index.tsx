import React, { useEffect, useState, useCallback } from "react";
import {
  StyleSheet,
  FlatList,
  ActivityIndicator,
  Dimensions,
} from "react-native";
import { Card, Text, View } from "@/components/Themed";
import Container from "@/components/Container";
import LaunchService from "@/services/LaunchesService";
import { Launch, LaunchQueryResponse } from "@/types/LaunchServiceTypes";

const { height: screenHeight } = Dimensions.get("screen");

const PAGE_LIMIT = 10;
type LaunchList = Pick<
  Launch,
  "id" | "name" | "date_utc" | "links" | "details"
>;

const LaunchesScreen = () => {
  const [launches, setLaunches] = useState<LaunchList[]>([]);
  const [page, setPage] = useState(1);
  const [hasNextPage, setHasNextPage] = useState(true);
  const [loading, setLoading] = useState(false);

  const fetchLaunches = useCallback(async () => {
    if (loading || !hasNextPage) return;

    setLoading(true);
    try {
      const data: LaunchQueryResponse<LaunchList> =
        await LaunchService.queryLaunches<LaunchList>({
          query: {}, // Empty query fetches all
          options: {
            sort: { date_utc: 1 }, // oldest first
            limit: PAGE_LIMIT,
            page,
            select: {
              id: 1,
              name: 1,
              date_utc: 1,
              links: 1,
              details: 1,
            },
          },
        });

      setLaunches((prev) => [...prev, ...data.docs]);
      setHasNextPage(data.hasNextPage);
    } catch (err) {
      console.error("Failed to fetch launches:", err);
    } finally {
      setLoading(false);
    }
  }, [page, hasNextPage, loading]);

  useEffect(() => {
    fetchLaunches();
  }, [page]);

  useEffect(() => {
    console.log(launches[0]);
  }, [launches]);

  const loadMore = () => {
    if (hasNextPage && !loading) {
      setPage((prev) => prev + 1);
    }
  };

  const renderItem = ({ item }: { item: LaunchList }) => (
    <Card
      componentType="touchable"
      title={<></>}
      type="primary"
      variant="standard"
      image={{ uri: item.links.patch.small || "" }}
      imageResize="contain"
    >
      <Text textSize="h3" variant="secondary">
        {item.name}
      </Text>
      <Text textSize="h6" variant="default">
        {new Date(item.date_utc).toLocaleDateString()}
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
        style={{ marginBottom: 10, marginTop: 5 }}
      >
        SpaceX Launches history
      </Text>
      <FlatList
        data={launches}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.listContent}
        onEndReached={loadMore}
        onEndReachedThreshold={0.5}
        ListFooterComponent={
          loading ? (
            <View
              style={{
                width: "100%",
                height: screenHeight - 40,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <ActivityIndicator size="large" style={{ margin: 16 }} />
            </View>
          ) : null
        }
      />
    </Container>
  );
};

export default LaunchesScreen;

const styles = StyleSheet.create({
  listContent: {
    padding: 16,
  },
});
