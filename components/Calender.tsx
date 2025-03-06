import React, { useEffect } from "react";
import { View, StyleSheet } from "react-native";
import { Calendar as RNCalendar } from "react-native-calendars";
import { GlobalStyles } from "../constants/styles";

interface CalendarProps {
  onSelectDay: (day: string) => void;
  selectedDate: string;
}

const Calendar: React.FC<CalendarProps> = ({ onSelectDay, selectedDate }) => {
  const handleDayPress = (day: { dateString: string }) => {
    onSelectDay(day.dateString);
  };

  useEffect(() => {
    onSelectDay(selectedDate);
  }, [selectedDate]);

  return (
    <View style={styles.calendarContainer}>
      <RNCalendar
        current={selectedDate}
        markedDates={{
          [selectedDate]: {
            selected: true,
            selectedColor: GlobalStyles.colors.background200,
          },
        }}
        onDayPress={handleDayPress}
        theme={{
          todayTextColor: GlobalStyles.colors.background200,
          arrowColor: GlobalStyles.colors.background200,
          textDayHeaderFontSize: 16,
          textDayFontSize: 16,
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  calendarContainer: {
    padding: 4,
    backgroundColor: "#fff",
    borderRadius: 10,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    margin: 20,
  },
});

export default Calendar;
