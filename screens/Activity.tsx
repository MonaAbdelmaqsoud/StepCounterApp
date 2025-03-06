import { Text, View, StyleSheet, ScrollView } from "react-native";
import TimeCard from "../components/TimeCard";
import ActivityButton from "../components/ActivityButton";
import { useDispatch } from "react-redux";
import { setActivity } from "../store/slice";

function Activity() {
  const activities = [
    { iconName: "walk", activityName: "Running" },
    { iconName: "walk-outline", activityName: "Walking" },
    { iconName: "bicycle", activityName: "Cycling" },
    { iconName: "barbell", activityName: "Gym" },
  ];
  const dispatch = useDispatch();

  const handleSetActivity = (activity: string) => {
    dispatch(setActivity(activity));
  };

  return (
    <View style={styles.container}>
      <TimeCard />
      <Text style={styles.chooseActivityHeader}>Choose Activity</Text>
      <ScrollView style={styles.scroll}>
        <View style={styles.buttonsContainer}>
          {activities.map((activity, index) => (
            <ActivityButton
              key={index}
              {...activity}
              onPress={handleSetActivity}
            />
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  chooseActivityHeader: {
    fontSize: 20,
    fontWeight: "bold",
    padding: 20,
    paddingBottom: 10,
  },
  buttonsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  scroll: {
    paddingHorizontal: 12,
  },
});

export default Activity;
