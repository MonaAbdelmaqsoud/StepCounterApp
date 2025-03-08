import React from "react";
import { Pressable, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface TimeButtonProps {
  iconName: string;
  backgroundColor: string;
  iconColor: string;
  onPress: () => void;
}

const TimeButton: React.FC<TimeButtonProps> = ({
  iconName,
  backgroundColor,
  iconColor,
  onPress,
}) => {
  const handlePress = () => {
      onPress();
  };

  return (
    <Pressable
      style={({ pressed }) =>
        pressed
          ? [styles.button, { backgroundColor }, styles.pressed]
          : [styles.button, { backgroundColor }]
      }
      onPress={handlePress}
    >
      <Ionicons
        name={iconName}
        size={24}
        color={iconColor}
      />
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: 30,
    width: 60,
    height: 60,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 10,
  },
  pressed: {
    opacity: 0.6,
  },
});

export default TimeButton;
