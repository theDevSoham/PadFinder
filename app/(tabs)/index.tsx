import React, { useEffect, useState, useCallback } from "react";
import {
  StyleSheet,
  FlatList,
  ActivityIndicator,
  Dimensions,
  RefreshControl,
  useColorScheme,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { Card, Input, Text, View } from "@/components/Themed";
import Container from "@/components/Container";
import LaunchService from "@/services/LaunchesService";
import { Launch, LaunchQueryResponse } from "@/types/LaunchServiceTypes";
import dayjs from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat";
import EmptyState from "@/components/EmptyList";

dayjs.extend(advancedFormat);

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
  const [refreshing, setRefreshing] = useState(false);

  const [searchText, setSearchText] = useState("");
  const [sortOrder, setSortOrder] = useState<1 | -1>(1); // 1 = oldest first, -1 = newest first

  const fetchLaunches = useCallback(
    async (reset = false) => {
      if (loading) return;

      setLoading(true);
      try {
        const query: Record<string, any> = {};
        if (searchText.trim()) {
          query.name = { $regex: searchText.trim(), $options: "i" };
        }

        const data: LaunchQueryResponse<LaunchList> =
          await LaunchService.queryLaunches<LaunchList>({
            query,
            options: {
              sort: { date_utc: sortOrder },
              limit: PAGE_LIMIT,
              page: reset ? 1 : page,
              select: {
                id: 1,
                name: 1,
                date_utc: 1,
                links: 1,
                details: 1,
              },
            },
          });

        if (reset) {
          setLaunches(data.docs);
        } else {
          setLaunches((prev) => {
            const updatedMap = new Map(prev.map((item) => [item.id, item]));
            data.docs.forEach((doc) => {
              updatedMap.set(doc.id, doc); // replace or add
            });
            return Array.from(updatedMap.values());
          });
        }

        setHasNextPage(data.hasNextPage);
      } catch (err) {
        console.error("Failed to fetch launches:", err);
      } finally {
        setLoading(false);
        if (reset) setRefreshing(false);
      }
    },
    [page, loading, searchText, sortOrder]
  );

  useEffect(() => {
    if (searchText.length === 0) {
      setPage(1); // Always start fresh when search or sort changes
      setHasNextPage(true); // Reset pagination
      fetchLaunches(true);
    } else {
      fetchLaunches(true);
    }
  }, [searchText, sortOrder]);

  useEffect(() => {
    fetchLaunches();
  }, [page]);

  const loadMore = () => {
    if (hasNextPage && !loading) {
      setPage((prev) => prev + 1);
    }
  };

  const onRefresh = () => {
    setRefreshing(true);
    setPage(1);
    fetchLaunches(true);
  };

  const renderItem = ({ item }: { item: LaunchList }) => (
    <Card
      componentType="touchable"
      title={<></>}
      type="primary"
      variant="standard"
      image={
        item.links.patch.small
          ? { uri: item.links.patch.small || "" }
          : require("@/assets/images/no-image.png")
      }
      imageResize="contain"
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
        style={{ marginBottom: 10, marginTop: 5 }}
      >
        SpaceX Launches history
      </Text>

      {/* Search Bar */}
      <Input
        placeholder="Search by name..."
        value={searchText}
        onChangeText={setSearchText}
        style={styles.searchInput}
      />

      {/* Sort Dropdown */}
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={sortOrder}
          onValueChange={(value) => setSortOrder(value)}
          style={styles.picker}
        >
          <Picker.Item label="Oldest First" value={1} />
          <Picker.Item label="Newest First" value={-1} />
        </Picker>
      </View>

      {!loading && launches.length === 0 ? (
        searchText.trim().length > 0 ? (
          <EmptyState
            title="No search results"
            description={`No launches found for "${searchText}"`}
            image={require("@/assets/images/no-results.png")}
            onRetry={() => {
              setSearchText("");
              setPage(1);
              fetchLaunches(true);
            }}
          />
        ) : (
          <EmptyState
            title="No launches available"
            description="Looks like there are no SpaceX launches in our records."
            image={require("@/assets/images/no-results.png")}
            onRetry={() => {
              setPage(1);
              fetchLaunches(true);
            }}
          />
        )
      ) : (
        <>
          <FlatList
            data={launches}
            keyExtractor={(item) => item.id}
            renderItem={renderItem}
            contentContainerStyle={styles.listContent}
            onEndReached={loadMore}
            onEndReachedThreshold={0.5}
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={onRefresh}
                colors={["#00416d"]}
                tintColor="#00416d"
              />
            }
            ListFooterComponent={
              loading && !refreshing ? (
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
        </>
      )}
    </Container>
  );
};

export default LaunchesScreen;

const styles = StyleSheet.create({
  listContent: {
    padding: 16,
  },
  searchInput: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginBottom: 25,
    backgroundColor: "transparent",
    height: 60,
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    overflow: "hidden",
    marginBottom: 10,
  },
  picker: {
    height: 60,
    width: "100%",
  },
});
