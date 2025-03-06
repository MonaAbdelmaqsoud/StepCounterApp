import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";

import { GlobalStyles } from "../constants/styles";
import ActivityItem from "./ActivityCard";
import { useRoute } from "@react-navigation/native";
import { Activity } from "../store/interfaces";

interface ActivityListProps {
  activities: Activity[];
}

const ActivityList: React.FC<ActivityListProps> = ({ activities }) => {
  const route = useRoute();
  let noActivitiesText = "No activities found for this date";
  if (route.name === "Dashboard") {
    noActivitiesText = "No Recent Activities found";
  }
  return (
    <ScrollView style={styles.activitiesContainer}>
      {activities.length > 0 ? (
        <View>
          {activities.map((activity, index) => (
            <View style={styles.activityCard} key={index}>
              <ActivityItem {...activity} />
            </View>
          ))}
        </View>
      ) : (
        <Text style={styles.noActivitiesText}>{noActivitiesText}</Text>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  activitiesContainer: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 12,
  },
  activityCard: {
    backgroundColor: GlobalStyles.colors.primary100,
    borderRadius: 12,
    padding: 15,
    marginBottom: 16,
    elevation: 4,
    shadowColor: "#000",
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
  },
  noActivitiesText: {
    fontSize: 16,
    color: "gray",
    textAlign: "center",
    marginTop: 20,
  },
});

export default ActivityList;
