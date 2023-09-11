export interface LoginInterface {
  name: string;
  password: string;
}

export interface UserInterface {
  id: string;
  name: string;
  password: string;
  role: "ADMIN" | "USER";
  booked_workouts: WorkoutInterface[];
}

export interface WorkoutInterface {
  id: string;
  title: string;
  trainer: string;
  time: string;
  date: string;
  duration: number;
}
