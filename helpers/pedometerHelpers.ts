import { Pedometer } from "expo-sensors";
import { Platform } from "react-native";

// Check if pedometer is available
export const checkPedometerAvailability = async () => {
  return await Pedometer.isAvailableAsync();
};

// Request permission for Android
export const requestPedometerPermission = async () => {
  if (Platform.OS === "android") {
    const { granted } = await Pedometer.requestPermissionsAsync();
    return granted;
  }
  return true;
};