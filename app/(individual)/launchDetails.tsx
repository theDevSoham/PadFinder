import React, { useEffect, useRef, useState } from "react";
import {
  StyleSheet,
  Image,
  ScrollView,
  ActivityIndicator,
  Alert,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { View, Text, Button } from "@/components/Themed";
import Container from "@/components/Container";
import LaunchService from "@/services/LaunchesService";
import { Launch } from "@/types/LaunchServiceTypes";
import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";
import useSpaceXStorage from "@/store/spaceXStore";
import { Ionicons } from "@expo/vector-icons";
import { formatLaunchDate } from "@/utils/formatDate";

const { width: screenWidth } = Dimensions.get("window");

dayjs.extend(duration);

const LaunchDetailsScreen = () => {
  const { launchId } = useLocalSearchParams<{ launchId?: string }>();
  const router = useRouter();

  const isLaunched = useRef(false);

  const [launch, setLaunch] = useState<Launch | null>(null);
  const [loading, setLoading] = useState(true);
  const [dateTimeDifference, setDateTimeDifference] = useState<string | null>(
    null
  );

  const toggleFirstTime = useSpaceXStorage((state) => state.toggleFirstTime);

  const favourites = useSpaceXStorage((state) => state.favourites);
  const addFavourite = useSpaceXStorage((state) => state.addFavourite);
  const removeFavourite = useSpaceXStorage((state) => state.removeFavourite);

  // derived boolean from subscribed state
  const isFav = launch ? favourites.some((f) => f.id === launch.id) : false;

  const toggleFavourite = () => {
    if (!launch) return;
    if (isFav) {
      removeFavourite(launch.id);
    } else {
      addFavourite(launch);
    }
  };

  const fetchLaunchDetails = async () => {
    if (!launchId) {
      Alert.alert("Invalid Request", "No launch ID provided", [
        {
          text: "OK",
          onPress: () => {
            toggleFirstTime("not_first");
            router.replace("/(tabs)");
          },
        },
      ]);
      return;
    }

    try {
      const data = await LaunchService.getLaunchById(launchId);

      if (!data) {
        Alert.alert("Not Found", "No launch found for the given ID", [
          {
            text: "OK",
            onPress: () => {
              toggleFirstTime("not_first");
              router.replace("/(tabs)");
            },
          },
        ]);
        return;
      }

      setLaunch(data);
    } catch (err) {
      console.error(err);
      Alert.alert("Error", "Failed to fetch launch details", [
        {
          text: "OK",
          onPress: () => {
            toggleFirstTime("not_first");
            router.replace("/(tabs)");
          },
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLaunchDetails();
  }, [launchId]);

  useEffect(() => {
    if (!launch || !launch.date_utc || isLaunched.current) return;

    if (!launch.upcoming) {
      isLaunched.current = true;
      setDateTimeDifference("Rocket already launched");
      return;
    }

    const interval = setInterval(() => {
      if (launch?.date_utc) {
        const diff = dayjs(launch.date_utc).diff(dayjs(), "second");
        const dur = dayjs.duration(diff, "seconds");

        const parts = [];

        if (dur.years() > 0) parts.push(`${dur.years()}y`);
        if (dur.months() > 0) parts.push(`${dur.months()}mo`);
        if (dur.days() > 0) parts.push(`${dur.days()}d`);
        if (dur.hours() > 0) parts.push(`${dur.hours()}h`);
        if (dur.minutes() > 0) parts.push(`${dur.minutes()}m`);
        if (dur.seconds() > 0) parts.push(`${dur.seconds()}s`);

        const joined = parts.join(" ");

        if (joined.length === 0) {
          isLaunched.current = true;
          setDateTimeDifference("Rocket already launched");
          clearInterval(interval);
          return;
        } else {
          isLaunched.current = false;
          setDateTimeDifference(joined + "until launch");
        }
      }
    }, 1000);

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [launch]);

  // useEffect(() => {
  //   console.log("Date Time Difference:", dateTimeDifference);
  // }, [dateTimeDifference])

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (!launch) return null;

  return (
    <Container variant="ghost" style={{ paddingHorizontal: 0 }}>
      {/* Top Fixed Image */}
      <View style={styles.imageContainer}>
        <Image
          source={
            launch.links?.patch?.large
              ? { uri: launch.links.patch.large }
              : require("@/assets/images/no-image.png")
          }
          style={styles.image}
          resizeMode="contain"
        />

        <TouchableOpacity
          activeOpacity={0.7}
          style={styles.favButton}
          onPress={toggleFavourite}
        >
          <Ionicons
            name={isFav ? "heart" : "heart-outline"}
            size={28}
            color={isFav ? "red" : "gray"}
          />
        </TouchableOpacity>
      </View>

      {/* Scrollable Details */}
      <ScrollView style={styles.detailsContainer}>
        {launch.upcoming && (
          <View>
            <Text textSize="h4" variant="default" style={styles.date}>
              {dateTimeDifference}
            </Text>
          </View>
        )}
        <Text textSize="h1" variant="secondary" style={styles.title}>
          {launch.name}
        </Text>
        <Text textSize="h4" variant="default" style={styles.date}>
          {formatLaunchDate(launch.date_utc, launch.date_precision)}
        </Text>

        {launch.details ? (
          <Text textSize="h5" variant="default" style={styles.details}>
            {launch.details}
          </Text>
        ) : (
          <Text textSize="h5" variant="default" style={styles.noDetails}>
            No additional details available.
          </Text>
        )}

        <Text textSize="h5" variant="secondary" style={styles.sectionHeader}>
          Launch Info
        </Text>
        <Text variant="default">Flight Number: {launch.flight_number}</Text>
        <Text variant="default">Success: {launch.success ? "Yes" : "No"}</Text>
        {launch.failures?.length > 0 && (
          <>
            <Text
              textSize="h5"
              variant="secondary"
              style={styles.sectionHeader}
            >
              Failures
            </Text>
            {launch.failures.map((f, idx) => (
              <Text key={idx} variant="default">
                - {f.reason} at {f.time}s
              </Text>
            ))}
          </>
        )}

        {/* Buttons */}
        <View style={styles.buttonsWrapper}>
          <Button
            title="View Launchpad Details"
            variant="secondary"
            onPress={() =>
              router.push({
                pathname: "/(individual)/launchpad",
                params: { id: launch.launchpad },
              })
            }
          />
          <Button
            title="Go Back"
            variant="primary"
            onPress={() => {
              toggleFirstTime("not_first");
              router.replace("/(tabs)");
            }}
            style={{ marginTop: 20 }}
          />
        </View>
      </ScrollView>
    </Container>
  );
};

export default LaunchDetailsScreen;

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  imageContainer: {
    width: "100%",
    height: 250,
    backgroundColor: "#f2f2f2",
    justifyContent: "center",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  image: {
    width: screenWidth * 0.8,
    height: 200,
  },
  detailsContainer: {
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  title: {
    marginBottom: 5,
  },
  date: {
    marginBottom: 15,
    opacity: 0.8,
  },
  details: {
    marginBottom: 20,
  },
  noDetails: {
    fontStyle: "italic",
    marginBottom: 20,
  },
  sectionHeader: {
    marginTop: 15,
    marginBottom: 5,
  },
  buttonsWrapper: {
    marginTop: 30,
    marginBottom: 50,
  },
  favButton: {
    position: "absolute",
    top: 10,
    right: 20,
    backgroundColor: "transparent",
    borderRadius: 50,
    padding: 6,
  },
});
