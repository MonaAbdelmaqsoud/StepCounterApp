import React from "react";
import { Text, StyleSheet, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { GlobalStyles } from "../constants/styles";

interface ActivityButtonProps {
  activityName: string;
  onPress: (name: string) => void;
}

const ActivityButton: React.FC<ActivityButtonProps> = ({
  activityName,
  onPress,
}) => {
  return (
    <Pressable
      style={({ pressed }) =>
        pressed ? [styles.button, styles.pressed] : styles.button
      }
      onPress={() => onPress(activityName)}
    >
      <Ionicons name="pulse" size={24} color={GlobalStyles.colors.primary100} />
      <Text style={styles.buttonText}>{activityName}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: GlobalStyles.colors.background200,
    borderRadius: 10,
    padding: 15,
    alignItems: "center",
    width: "45%",
    margin: "2.5%",
    elevation: 3,
    shadowColor: "#000",
    shadowRadius: 3,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
  },
  buttonText: {
    marginTop: 5,
    fontSize: 16,
    color: GlobalStyles.colors.primary200,
    fontWeight: "bold",
  },
  pressed: {
    opacity: 0.6,
  },
});

export default ActivityButton;
