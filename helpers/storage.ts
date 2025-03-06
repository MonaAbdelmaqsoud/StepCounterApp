import AsyncStorage from "@react-native-async-storage/async-storage";

export const saveActivityToStorage = async (activity: any) => {
    try {
      const storedActivities = await AsyncStorage.getItem("activities");
      const parsedActivities = storedActivities ? JSON.parse(storedActivities) : [];
      parsedActivities.push(activity);
      await AsyncStorage.setItem("activities", JSON.stringify(parsedActivities));
    } catch (error) {
      console.error("Failed to save activity:", error);
    }
  };