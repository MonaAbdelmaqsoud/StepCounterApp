import { StyleSheet, View, Text } from "react-native";
import { GlobalStyles } from "../constants/styles";
import ImagePicker from "../components/ImagePicker";

function Profile() {
  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <ImagePicker />
        <Text style={styles.name}>JohnDoe</Text>
        <Text style={styles.email}>john.doe@example.com</Text>
      </View>
    </View>
  );
}

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  card: {
    backgroundColor: GlobalStyles.colors.primary100,
    borderRadius: 12,
    paddingVertical: 24,
    paddingHorizontal: 16,
    alignItems: "center",
    elevation: 5,
    shadowColor: "#000",
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
  },
  name: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 8,
    color: GlobalStyles.colors.primary700,
  },
  email: {
    fontSize: 14,
    marginTop: 4,
    color: GlobalStyles.colors.primary500,
  },
});
