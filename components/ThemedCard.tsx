import React, { ReactNode, useEffect } from "react";
import {
  Image,
  ImageSourcePropType,
  ImageURISource,
  StyleProp,
  StyleSheet,
  TextStyle,
  TouchableOpacity,
  TouchableOpacityProps,
  ViewStyle,
} from "react-native";

import { View, Text, useThemeColor } from "@/components/Themed";

type CardType =
  | "default"
  | keyof typeof import("@/constants/Colors").default.light.scheme_colors;
type CardVariant = "standard" | "strip";
type ImagePosition = "left" | "right";
type ComponentType = "view" | "touchable";

type ThemedCardProps = {
  title?: string | React.ReactNode;
  children?: ReactNode;
  type?: CardType; // now directly maps to variant
  variant?: CardVariant;
  image?: ImageSourcePropType;
  imageResize?: "contain" | "cover";
  imagePosition?: ImagePosition;
  containerStyle?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  componentType?: ComponentType;
  onPress?: () => void; // required if touchable
} & TouchableOpacityProps;

const ThemedCard = ({
  title,
  children,
  type = "default",
  variant = "standard",
  image,
  imageResize = "cover",
  imagePosition = "left",
  containerStyle,
  textStyle,
  componentType = "view",
  onPress,
  ...rest
}: ThemedCardProps) => {
  const backgroundColor = useThemeColor(
    { variant: type },
    "background"
  ) as string;
  const textColor = useThemeColor(
    { variant: type === "default" ? "default" : type },
    "text"
  ) as string;
  const borderColor = useThemeColor({ variant: "default" }, "text") as string;

  const cardBaseStyle: ViewStyle = {
    backgroundColor,
    borderColor: type === "ghost" ? "transparent" : borderColor,
  };

  const Wrapper = componentType === "touchable" ? TouchableOpacity : View;
  const wrapperProps =
    componentType === "touchable"
      ? { onPress, activeOpacity: 0.85, ...rest }
      : { ...rest };

  const renderTitle = () => {
    if (!title) return null;

    return typeof title === "string" ? (
      <Text style={[styles.title, { color: textColor }, textStyle]}>
        {title}
      </Text>
    ) : (
      <View style={{ marginBottom: 8 }}>{title}</View>
    );
  };

  useEffect(() => {
    if (image && (image as ImageURISource).uri) {
      const uri = (image as ImageURISource).uri!;
      Image.prefetch(uri).catch((e) => console.log("Image invalid: ", e));
    }
  }, [image]);

  switch (variant) {
    case "strip":
      return (
        <Wrapper
          style={[
            styles.stripCard,
            cardBaseStyle,
            imagePosition === "right" && styles.rowReverse,
            containerStyle,
          ]}
          {...wrapperProps}
        >
          {image && (
            <Image
              source={image}
              style={styles.stripImage}
              resizeMode={imageResize}
            />
          )}
          <View style={styles.stripTextContainer}>
            {renderTitle()}
            {children}
          </View>
        </Wrapper>
      );

    case "standard":
    default:
      return (
        <Wrapper
          style={[styles.card, cardBaseStyle, containerStyle]}
          {...wrapperProps}
        >
          {image && (
            <Image
              source={image}
              style={styles.image}
              resizeMode={imageResize}
            />
          )}
          {renderTitle()}
          <View style={styles.body}>{children}</View>
        </Wrapper>
      );
  }
};

export default ThemedCard;

const styles = StyleSheet.create({
  card: {
    width: "100%",
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    marginBottom: 16,
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: 150,
    borderRadius: 8,
    marginBottom: 12,
  },
  title: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 8,
  },
  body: {
    flexDirection: "column",
    gap: 8,
  },
  stripCard: {
    flexDirection: "row",
    borderRadius: 12,
    borderWidth: 1,
    overflow: "hidden",
    marginBottom: 16,
  },
  rowReverse: {
    flexDirection: "row-reverse",
  },
  stripImage: {
    width: 100,
    height: "100%",
  },
  stripTextContainer: {
    flex: 1,
    padding: 12,
    justifyContent: "center",
  },
});
