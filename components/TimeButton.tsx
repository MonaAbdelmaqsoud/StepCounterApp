import React, { useState } from "react";
import { Pressable, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface TimeButtonProps {
  iconName: string;
  backgroundColor: string;
  iconColor: string;
  onPress: () => void;
  disabled?: boolean;
}

const TimeButton: React.FC<TimeButtonProps> = ({
  iconName,
  backgroundColor,
  iconColor,
  onPress,
  disabled = false,
}) => {
  const handlePress = () => {
    if (!disabled) {
      onPress();
    }
  };

  return (
    <Pressable
      style={({ pressed }) =>
        pressed && !disabled
          ? [styles.button, { backgroundColor }, styles.pressed]
          : [
              styles.button,
              { backgroundColor },
              disabled ? styles.disabled : null,
            ]
      }
      onPress={handlePress}
      disabled={disabled}
    >
      <Ionicons
        name={iconName}
        size={24}
        color={disabled ? "gray" : iconColor}
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
  disabled: {
    opacity: 0.3, // Make disabled button look inactive
  },
});

export default TimeButton;
