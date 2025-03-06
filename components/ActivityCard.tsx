import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { GlobalStyles } from "../constants/styles";
import { Activity } from "../store/interfaces";
import { formatDistance, formatTime } from "../helpers/metricsHelpers";

const ActivityItem: React.FC<Activity> = ({
  activityType,
  date,
  time,
  distance,
}) => {

  return (
    <View>
      <View style={styles.container}>
        <Ionicons
          name="pulse"
          size={24}
          color={GlobalStyles.colors.primary100}
          style={styles.icon}
        />
        <View style={styles.textContainer}>
          <Text style={styles.activityType}>{activityType}</Text>
          <View style={styles.durationDistance}>
            <Text style={styles.stats}>{formatTime(time)}</Text>
            <Text style={styles.stats}> - </Text>
            <Text style={styles.stats}>{formatDistance(distance)}</Text>
          </View>
        </View>
        <Text style={styles.stats}>{date}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
  },
  icon: {
    backgroundColor: GlobalStyles.colors.background200,
    borderRadius: 5,
    padding: 8,
  },
  textContainer: {
    flex: 1,
    marginLeft: 15,
  },
  activityType: {
    fontSize: 16,
    fontWeight: "bold",
    color: GlobalStyles.colors.primary500,
  },
  durationDistance: {
    flexDirection: "row",
    alignItems: "center",
  },
  stats: {
    fontSize: 14,
    color: GlobalStyles.colors.primary200,
  },
});

export default ActivityItem;
