// src/store/fitnessSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Activity, FitnessState } from './interfaces';

// Helper function to get today's date in YYYY-MM-DD format
const getTodayDate = () => new Date().toISOString().split('T')[0];

// Initial state
const initialState: FitnessState = {
  totalSteps: 0,
  totalCalories: 0,
  totalDistance: 0,
  totalTime: 0,
  activities: [],
  currentActivity: 'Walking',
};

// Create the slice
const fitnessSlice = createSlice({
  name: 'fitness',
  initialState,
  reducers: {
    // Add a new activity
    addActivity: (state, action: PayloadAction<Activity>) => {
      const { steps, calories, distance, time, activityType, date } = action.payload;

      // Add the new activity
      const newActivity: Activity = {
        steps,
        calories,
        distance,
        time,
        activityType,
        date,
      };
      state.activities.push(newActivity);

      // Update totals if the activity is from today
      if (date === getTodayDate()) {
        state.totalSteps += steps;
        state.totalCalories += calories;
        state.totalDistance += distance;
        state.totalTime += time;
      }
    },
    // Set the current activity type
    setActivity: (state, action: PayloadAction<string>) => {
      state.currentActivity = action.payload;
    },
    // Update today's totals based on activities
    updateTodayTotals: (state) => {
      const today = getTodayDate();
      const todayActivities = state.activities.filter((activity) => activity.date === today);

      // Calculate totals for today
      state.totalSteps = todayActivities.reduce((sum, activity) => sum + activity.steps, 0);
      state.totalCalories = todayActivities.reduce((sum, activity) => sum + activity.calories, 0);
      state.totalDistance = todayActivities.reduce((sum, activity) => sum + activity.distance, 0);
      state.totalTime = todayActivities.reduce((sum, activity) => sum + activity.time, 0);
    },
  },
});

// Export actions
export const { addActivity, setActivity, updateTodayTotals } = fitnessSlice.actions;

// Export the reducer
export default fitnessSlice.reducer;