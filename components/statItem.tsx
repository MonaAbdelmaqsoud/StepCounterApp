import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { GlobalStyles } from "../constants/styles";

interface StatItemProps {
  value: string | number;
  label: string;
  valueFontSize?: number;
  labelFontSize?: number;
}

const StatItem: React.FC<StatItemProps> = ({
  value,
  label,
  valueFontSize = 18,
  labelFontSize = 14,
}) => {
  return (
    <View style={styles.container}>
      <Text style={[styles.statValue, { fontSize: valueFontSize }]}>
        {value}
      </Text>
      <Text style={[styles.statLabel, { fontSize: labelFontSize }]}>
        {label}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
  },
  statValue: {
    fontWeight: "bold",
    color: GlobalStyles.colors.primary700,
  },
  statLabel: {
    color: GlobalStyles.colors.primary200,
  },
});

export default StatItem;
