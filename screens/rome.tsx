import React, { useState, useEffect, useRef } from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import { Pedometer } from "expo-sensors";

export default function App() {
  const [isPedometerAvailable, setIsPedometerAvailable] =
    useState<string>("checking");
  //   const [pastStepCount, setPastStepCount] = useState<number>(0);
  const [currentStepCount, setCurrentStepCount] = useState<number>(0);
  const [isTracking, setIsTracking] = useState<boolean>(false);

  // Use a ref to store the subscription
  const subscription = useRef<{ remove: () => void } | null>(null);

  // Check if pedometer is available
  useEffect(() => {
    const checkPedometerAvailability = async () => {
      const isAvailable = await Pedometer.isAvailableAsync();
      setIsPedometerAvailable(String(isAvailable));
    };

    checkPedometerAvailability();
  }, []);

  // Start tracking steps
  const startTracking = () => {
    setIsTracking(true);
    setCurrentStepCount(0);

    // Subscribe to step count updates
    subscription.current = Pedometer.watchStepCount((result) => {
      setCurrentStepCount(result.steps);
    });
  };

  // Stop tracking steps
  const stopTracking = () => {
    setIsTracking(false);

    // Remove the subscription
    if (subscription.current) {
      subscription.current.remove();
      subscription.current = null;
    }
  };

  return (
    <View style={styles.container}>
      <Text>Pedometer Availability: {isPedometerAvailable}</Text>
      <Text>Current Step Count: {currentStepCount}</Text>

      {!isTracking ? (
        <Button title="Start Tracking" onPress={startTracking} />
      ) : (
        <Button title="Stop Tracking" onPress={stopTracking} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
});
