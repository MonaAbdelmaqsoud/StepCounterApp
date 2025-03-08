import { useEffect, useState } from "react";
import * as Notifications from "expo-notifications";
import { Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const STEP_GOAL = 200;
const DAILY_REMINDER_TIME = { hour: 9, minute: 0 };

const useNotification = (currentSteps: number) => {
  const [hasSentGoalNotification, setHasSentGoalNotification] = useState(false);

  useEffect(() => {
    requestPermissions();
    initializeNotificationState();
    scheduleDailyReminder();
    setupHourlyResetCheck();
  }, []);

  useEffect(() => {
    if (currentSteps >= STEP_GOAL && !hasSentGoalNotification) {
      sendGoalReachedNotification();
      setHasSentGoalNotification(true);
      AsyncStorage.setItem("hasSentGoalNotification", "true");
    }
  }, [currentSteps, STEP_GOAL]);

  // Request permissions for notifications
  const requestPermissions = async () => {
    const { status } = await Notifications.requestPermissionsAsync();
    if (status !== "granted") {
      Alert.alert(
        "Permission Required",
        "Please enable notifications in settings."
      );
    }
  };

  // Initialize notification state from AsyncStorage
  const initializeNotificationState = async () => {
    const hasSent = await AsyncStorage.getItem("hasSentGoalNotification");
    setHasSentGoalNotification(hasSent === "true");
  };

  // Schedule a daily reminder notification
  const scheduleDailyReminder = async () => {
    try {
      // Cancel any existing notification
      const existingNotificationId = await AsyncStorage.getItem(
        "dailyReminderId"
      );
      if (existingNotificationId) {
        await Notifications.cancelScheduledNotificationAsync(
          existingNotificationId
        );
      }

      const now = new Date();
      const scheduledTime = new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate(),
        DAILY_REMINDER_TIME.hour,
        DAILY_REMINDER_TIME.minute,
        0
      );

      // If the scheduled time passed, schedule for tomorrow
      if (now > scheduledTime) {
        scheduledTime.setDate(scheduledTime.getDate() + 1);
      }

      const trigger = {
        hour: scheduledTime.getHours(),
        minute: scheduledTime.getMinutes(),
        repeats: true,
      } as unknown as Notifications.DailyTriggerInput;

      const notificationId = await Notifications.scheduleNotificationAsync({
        content: {
          title: "Daily Reminder",
          body: "Don't forget to stay active today!",
        },
        trigger,
      });

      await AsyncStorage.setItem("dailyReminderId", notificationId);
    } catch (error) {
      console.error("Failed to schedule daily reminder:", error);
    }
  };

  // Send a notification when step goal is reached
  const sendGoalReachedNotification = async () => {
    try {
      await Notifications.scheduleNotificationAsync({
        content: {
          title: "Goal Reached! 🎉",
          body: `You reached your daily step goal of ${STEP_GOAL} steps! Keep going!`,
        },
        trigger: null,
      });
    } catch (error) {
      console.error("Failed to send goal reached notification:", error);
    }
  };

  // Reset hasSentGoalNotification
  const checkGoalNotificationReset = async () => {
    try {
      const lastResetDate = await AsyncStorage.getItem("lastResetDate");
      const today = new Date().toDateString();

      if (lastResetDate !== today) {
        setHasSentGoalNotification(false);
        await AsyncStorage.setItem("hasSentGoalNotification", "false");
        await AsyncStorage.setItem("lastResetDate", today);
      }
    } catch (error) {
      console.error("Failed to reset goal notification:", error);
    }
  };

  // check every hour reset the goal notification
  const setupHourlyResetCheck = () => {
    const interval = setInterval(() => {
      checkGoalNotificationReset();
    }, 60 * 60 * 1000);

    return () => clearInterval(interval);
  };

  return { hasSentGoalNotification };
};

export default useNotification;
