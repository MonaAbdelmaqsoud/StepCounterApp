import React from "react";
import { View, Text, StyleSheet } from "react-native";
import StatItem from "./statItem";
import { GlobalStyles } from "../constants/styles";
import TimeButton from "./TimeButton";
import usePedometer from "../hooks/usePedometer";
import { useSelector } from "react-redux";
import { selectCurrentActivity } from "../store/selectors";

const TimeCard: React.FC = () => {
  const {
    currentStepCount,
    elapsedTime,
    caloriesBurned,
    isTracking,
    startTracking,
    stopTracking,
  } = usePedometer();

  const currentActivity = useSelector(selectCurrentActivity);

  const handleStartPress = () => {
    startTracking();
  };

  const handleStopPress = () => {
    stopTracking();
  };

  return (
    <View style={styles.card}>
      <Text style={styles.activityName}>{currentActivity}</Text>
      <Text style={styles.timeText}>{elapsedTime}</Text>
      <Text style={styles.labelText}>Time Elapsed</Text>
      <View style={styles.buttonContainer}>
        <TimeButton
          iconName="play"
          backgroundColor={
            isTracking
              ? GlobalStyles.colors.primary500
              : GlobalStyles.colors.background200
          }
          iconColor={GlobalStyles.colors.primary100}
          onPress={handleStartPress}
        />
        <TimeButton
          iconName="stop"
          backgroundColor={
            !isTracking
              ? GlobalStyles.colors.primary500
              : GlobalStyles.colors.background200
          }
          iconColor={GlobalStyles.colors.primary100}
          onPress={handleStopPress}
        />
      </View>
      <View style={styles.statsRow}>
        <StatItem
          value={currentStepCount}
          label="Steps"
          valueFontSize={24}
          labelFontSize={18}
        />
        <StatItem
          value={parseFloat(caloriesBurned.toFixed(2))}
          label="Calories"
          valueFontSize={24}
          labelFontSize={18}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: GlobalStyles.colors.primary100,
    borderRadius: 12,
    margin: 20,
    padding: 24,
    alignItems: "center",
    elevation: 4,
    shadowColor: "#000",
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    marginBottom: 20,
  },
  activityName: {
    fontSize: 24,
    color: GlobalStyles.colors.primary500,
  },
  timeText: {
    fontSize: 48,
    fontWeight: "bold",
    marginBottom: 8,
    color: GlobalStyles.colors.primary700,
  },
  labelText: {
    fontSize: 16,
    color: GlobalStyles.colors.primary200,
    marginBottom: 16,
  },
  buttonContainer: {
    flexDirection: "row",
    marginVertical: 16,
  },
  statsRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginVertical: 16,
    width: "100%",
  },
});

export default TimeCard;
