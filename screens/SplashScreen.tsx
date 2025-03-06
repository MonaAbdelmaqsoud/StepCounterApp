import React from "react";
import { View, Image, StyleSheet, Text } from "react-native";
import { GlobalStyles } from "../constants/styles";

const SplashScreen = () => {
  return (
    <View style={styles.container}>
      <Image source={require("../assets/splash.png")} style={styles.image} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ffffff",
  },
  image: {
    width: "30%",
    height: "30%",
    resizeMode: "contain",
  },
});

export default SplashScreen;
