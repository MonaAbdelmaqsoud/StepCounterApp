import { StyleSheet, View } from "react-native";
import Calendar from "../components/Calender";
import { useEffect, useState } from "react";
import ActivityList from "../components/ActivitiesList";
import { useSelector } from "react-redux";
import { selectActivities } from "../store/selectors";

function History() {
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [filteredActivities, setFilteredActivities] = useState<any[]>([]);
  const activities = useSelector(selectActivities);

  useEffect(() => {
    const filteredActivities = activities.filter(
      (activity) => activity.date === selectedDate
    );

    setFilteredActivities(filteredActivities);
  }, [selectedDate, activities]);

  const handleDayPress = (day: string) => {
    setSelectedDate(day);
  };

  return (
    <View style={styles.container}>
      <Calendar onSelectDay={handleDayPress} selectedDate={selectedDate} />
      <ActivityList activities={filteredActivities} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});

export default History;
