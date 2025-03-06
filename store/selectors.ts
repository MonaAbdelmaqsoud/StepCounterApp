import { createSelector } from "@reduxjs/toolkit";
import { Activity } from "./interfaces";
import { RootState } from "./store";

// Select all activities
export const selectActivities = (state: RootState) => state.fitness.activities;

// Select today's activities
export const selectTodaysActivities = createSelector(
  [(state: RootState) => state.fitness.activities],
  (activities) => {
    const today = new Date().toISOString().split("T")[0];
    return activities.filter((activity: Activity) => activity.date === today);
  }
);


// Select total steps
export const selectTotalSteps = (state: RootState) => state.fitness.totalSteps;

// Select total calories
export const selectTotalCalories = (state: RootState) => state.fitness.totalCalories;

// Select total distance
export const selectTotalDistance = (state: RootState) => state.fitness.totalDistance;

// Select total time
export const selectTotalTime = (state: RootState) => state.fitness.totalTime;

export const selectCurrentActivity = (state: RootState) => state.fitness.currentActivity; 