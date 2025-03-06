import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import { Circle } from "react-native-svg";
import Svg from "react-native-svg";
import { GlobalStyles } from "../constants/styles";

interface StepsCircleProps {
  steps: number;
}

const StepsCircle: React.FC<StepsCircleProps> = ({ steps }) => {
  return (
    <View style={styles.container}>
      <Svg height="150" width="150">
        <Circle
          cx="75"
          cy="75"
          r="70"
          stroke={GlobalStyles.colors.background200}
          strokeWidth="8"
          fill="transparent"
        />
        <Circle
          cx="75"
          cy="75"
          r="70"
          stroke={GlobalStyles.colors.primary200}
          strokeWidth="9"
          fill="transparent"
          strokeDasharray="440"
          strokeDashoffset={440 - (steps / 10000) * 440}
          strokeLinecap="round"
        />
      </Svg>
      <View style={styles.stepsTextContainer}>
        <Text style={styles.stepsText}>{steps}</Text>
        <Text style={styles.stepsLabel}>steps</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 24,
    marginBottom: 12,
  },
  stepsTextContainer: {
    position: "absolute",
    alignItems: "center",
  },
  stepsText: {
    fontSize: 28,
    fontWeight: "bold",
  },
  stepsLabel: {
    fontSize: 16,
    color: "gray",
  },
});

export default StepsCircle;
