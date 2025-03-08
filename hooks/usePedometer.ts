import { useState, useEffect, useRef, useCallback } from "react";
import { Pedometer } from "expo-sensors";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../store/store";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { selectActivities, selectCurrentActivity } from "../store/selectors";
import { addActivity, updateTodayTotals } from "../store/slice";
import { calculateMetrics } from "../helpers/metricsHelpers";
import {
  checkPedometerAvailability,
  requestPedometerPermission,
} from "../helpers/pedometerHelpers";
import { saveActivityToStorage } from "../helpers/storage";

const usePedometer = () => {
  const dispatch = useDispatch();
  const currentActivity = useSelector(selectCurrentActivity);
  const activities = useSelector(selectActivities);

  const [currentStepCount, setCurrentStepCount] = useState(0);
  const [isTracking, setIsTracking] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [caloriesBurned, setCaloriesBurned] = useState(0);
  const [distanceCovered, setDistanceCovered] = useState(0);
  const [isPedometerAvailable, setIsPedometerAvailable] = useState<
    boolean | null
  >(null);
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);

  const subscription = useRef<{ remove: () => void } | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const checkAvailabilityAndPermission = async () => {
      const available = await checkPedometerAvailability();
      setIsPedometerAvailable(available);

      const permissionGranted = await requestPedometerPermission();
      setHasPermission(permissionGranted);
    };
    checkAvailabilityAndPermission();
  }, []);

  const fetchActivities = useCallback(async () => {
    try {
      const storedActivities = await AsyncStorage.getItem("activities");
      const parsedActivities = storedActivities
        ? JSON.parse(storedActivities)
        : [];
      parsedActivities.forEach((activity: any) =>
        dispatch(addActivity(activity))
      );
      dispatch(updateTodayTotals());
    } catch (error) {
      console.error("Failed to fetch activities:", error);
    }
  }, [dispatch]);

  useEffect(() => {
    const { calories, distance } = calculateMetrics(
      currentStepCount,
      currentActivity
    );
    setCaloriesBurned(calories);
    setDistanceCovered(distance);
  }, [currentStepCount, currentActivity]);

  const startTracking = async () => {
    if (isTracking) return;
    if (isPedometerAvailable === false) {
      console.warn("Pedometer is not available on this device.");
      return;
    }
    if (!hasPermission) {
      console.warn("Pedometer permission not granted.");
      return;
    }

    setIsTracking(true);
    setCurrentStepCount(0);
    setElapsedTime(0);

    intervalRef.current = setInterval(
      () => setElapsedTime((prev) => prev + 1),
      1000
    );

    subscription.current = Pedometer.watchStepCount((result) => {
      setCurrentStepCount(result.steps);
    });
  };

  const stopTracking = async () => {
    if (!isTracking) return;
    setIsTracking(false);

    if (intervalRef.current) clearInterval(intervalRef.current);
    if (subscription.current) subscription.current.remove();

    const date = new Date().toISOString().split("T")[0];
    const activity = {
      steps: currentStepCount,
      calories: caloriesBurned,
      distance: distanceCovered,
      time: elapsedTime,
      activityType: currentActivity,
      date,
    };

    await saveActivityToStorage(activity);
    dispatch(addActivity(activity));
    dispatch(updateTodayTotals());

    setCurrentStepCount(0);
    setElapsedTime(0);
    setCaloriesBurned(0);
    setDistanceCovered(0);
  };

  return {
    currentStepCount,
    isTracking,
    elapsedTime,
    caloriesBurned,
    distanceCovered,
    activities,
    isPedometerAvailable,
    hasPermission,
    fetchActivities,
    startTracking,
    stopTracking,
  };
};

export default usePedometer;
