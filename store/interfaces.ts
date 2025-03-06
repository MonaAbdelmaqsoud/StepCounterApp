export interface Activity {
    steps: number;
    calories: number;
    distance: number;
    time: number;
    activityType: string;
    date: string;
  }
  
export interface FitnessState {
    totalSteps: number;
    totalCalories: number;
    totalDistance: number;
    totalTime: number;
    activities: Activity[];
    currentActivity: string,
  }