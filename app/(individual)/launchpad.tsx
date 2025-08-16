import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Alert,
  ActivityIndicator,
  Linking,
  ScrollView,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { View, Text, Button } from "@/components/Themed";
import Container from "@/components/Container";
import LaunchpadService from "@/services/LaunchpadService";
import { Launchpad } from "@/types/LaunchpadServiceTypes";
import { WebView } from "react-native-webview";
import * as Location from "expo-location";

const haversineDistance = (
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
) => {
  const toRad = (x: number) => (x * Math.PI) / 180;
  const R = 6371; // Earth radius in km
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
};

const LaunchpadDetailsScreen = () => {
  const { id } = useLocalSearchParams<{ id?: string }>();
  const router = useRouter();

  const [launchpad, setLaunchpad] = useState<Launchpad | null>(null);
  const [loading, setLoading] = useState(true);
  const [distance, setDistance] = useState<number | null>(null);
  const [navLink, setNavLink] = useState<string | null>(null);

  const fetchLaunchpadDetails = async () => {
    if (!id) {
      Alert.alert("Invalid Request", "No launchpad ID provided", [
        { text: "OK", onPress: () => router.back() },
      ]);
      return;
    }

    try {
      const data = await LaunchpadService.getOne(id);
      if (!data) {
        Alert.alert("Not Found", "No launchpad found for the given ID", [
          { text: "OK", onPress: () => router.back() },
        ]);
        return;
      }
      setLaunchpad(data);
    } catch (err) {
      console.error(err);
      Alert.alert("Error", "Failed to fetch launchpad details", [
        { text: "OK", onPress: () => router.back() },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleCalculateDistance = async () => {
    if (!launchpad?.latitude || !launchpad?.longitude) {
      Alert.alert("Error", "Launchpad coordinates not available");
      return;
    }

    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        Alert.alert(
          "Permission Denied",
          "Location permission is required to calculate distance."
        );
        return;
      }

      const location = await Location.getCurrentPositionAsync({});
      const dist = haversineDistance(
        location.coords.latitude,
        location.coords.longitude,
        launchpad.latitude,
        launchpad.longitude
      );

      setDistance(dist);
      setNavLink(
        `https://www.google.com/maps/dir/?api=1&origin=${location.coords.latitude},${location.coords.longitude}&destination=${launchpad.latitude},${launchpad.longitude}&travelmode=driving`
      );
    } catch (err) {
      console.error(err);
      Alert.alert("Error", "Unable to get location or calculate distance");
    }
  };

  useEffect(() => {
    fetchLaunchpadDetails();
  }, [id]);

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (!launchpad) return null;

  return (
    <Container variant="ghost" style={{ paddingHorizontal: 0 }}>
      <ScrollView contentContainerStyle={{ padding: 16 }}>
        <Text textSize="h1" variant="secondary" style={{ marginBottom: 10 }}>
          {launchpad.name}
        </Text>

        <View style={styles.mapContainer}>
          <WebView
            style={{ flex: 1 }}
            source={{
              html: `<iframe
                        width="100%"
                        height="100%"
                        frameborder="0"
                        style="border:0"
                        src="https://maps.google.com/maps?q=${launchpad.latitude},${launchpad.longitude}&z=10&output=embed"
                        allowfullscreen>
                     </iframe>`,
            }}
          />
        </View>

        <View style={{ marginTop: 16 }}>
          <Text textSize="h3" variant="default">
            {launchpad.locality}, {launchpad.region}
          </Text>
          <Text textSize="h4" variant="secondary">
            Status: {launchpad.status}
          </Text>
          <Text textSize="h4" variant="secondary">
            Launch Attempts: {launchpad.launch_attempts}
          </Text>
          <Text textSize="h4" variant="secondary">
            Successful Launches: {launchpad.launch_successes}
          </Text>
          {launchpad.details && (
            <Text style={{ marginTop: 10 }} textSize="h4" variant="default">
              {launchpad.details}
            </Text>
          )}
        </View>

        <View style={{ marginTop: 30, marginBottom: 50 }}>
          <Button
            title="Calculate Distance"
            variant="secondary"
            onPress={handleCalculateDistance}
          />
          <Button
            title="Go back"
            variant="primary"
            onPress={() => router.back()}
            style={{ marginTop: 20 }}
          />

          {distance !== null && (
            <View style={{ marginTop: 15 }}>
              <Text textSize="h4" variant="default">
                Distance: {distance.toFixed(2)} km
              </Text>
              {navLink && (
                <Button
                  title="Open in Google Maps"
                  variant="secondary"
                  onPress={() => Linking.openURL(navLink)}
                  style={{ marginTop: 10 }}
                />
              )}
            </View>
          )}
        </View>
      </ScrollView>
    </Container>
  );
};

export default LaunchpadDetailsScreen;

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  mapContainer: {
    height: 250,
    width: "100%",
    backgroundColor: "#ccc",
    borderRadius: 8,
    overflow: "hidden",
  },
});
