export function formatTime(seconds: number): string {
    if (seconds === 0) {
      return "0";
    }
    if (seconds < 60) {
      return `${seconds} sec`;
    }
    
    const minutes = Math.floor(seconds / 60);
    return minutes === 1 ? "1 min" : `${minutes} mins`;
}

export function formatDistance(distance: number): string {
  if (distance === 0) {
    return "0";
  }
  return distance >= 1000 
    ? `${(distance / 1000).toFixed(2)} km` 
    : `${distance.toFixed(2)} m`;
}

export const calculateMetrics = (steps: number, activityType: string) => {
  const caloriesPerStep: Record<string, number> = {
    Walking: 0.04,
    Running: 0.05,
    Cycling: 0.03,
    Gym: 0.02,
  };

  const distancePerStep: Record<string, number> = {
    Walking: 0.8,   
    Running: 0.7,
    Cycling: 1.5,
    Gym: 0.2,
  };

  return {
    calories: steps * (caloriesPerStep[activityType] || 0),
    distance: steps * (distancePerStep[activityType] || 0),
  };
};