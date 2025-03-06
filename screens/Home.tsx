import React, { useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import StatItem from "../components/statItem";
import StepsCircle from "../components/stepCounter";
import { GlobalStyles } from "../constants/styles";
import ActivityList from "../components/ActivitiesList";
import usePedometer from "../hooks/usePedometer";
import { useSelector } from "react-redux";
import {
  selectTodaysActivities,
  selectTotalCalories,
  selectTotalDistance,
  selectTotalSteps,
  selectTotalTime,
} from "../store/selectors";
import { formatDistance, formatTime } from "../helpers/metricsHelpers";
import useNotification from "../hooks/useNotification";

const Home: React.FC = () => {

  const { fetchActivities } = usePedometer();
  const activities = useSelector(selectTodaysActivities);
  const steps = useSelector(selectTotalSteps);
  const distance = useSelector(selectTotalDistance);
  const calories = useSelector(selectTotalCalories);
  const time = useSelector(selectTotalTime);
  
  useNotification(steps);

  useEffect(() => {
    fetchActivities();
  }, [fetchActivities]);

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <StepsCircle steps={steps} />
        <View style={styles.statsRow}>
          <StatItem value={formatDistance(distance)} label="Distance" />
          <StatItem value={parseFloat(calories.toFixed(2))} label="Calories" />
          <StatItem value={formatTime(time)} label="Active Time" />
        </View>
      </View>
      <Text style={styles.recentActivitiesHeader}>Recent Activities</Text>
      <ActivityList activities={activities} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  card: {
    backgroundColor: GlobalStyles.colors.primary100,
    borderRadius: 12,
    elevation: 4,
    shadowColor: "#000",
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    margin: 20,
  },
  statsRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 24,
  },
  recentActivitiesHeader: {
    fontSize: 20,
    fontWeight: "bold",
    padding: 12,
    color: GlobalStyles.colors.primary700,
  },
});

export default Home;
