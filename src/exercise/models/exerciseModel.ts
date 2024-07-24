export interface Exercise {
  id?: number;
  exercise_name: string;
  exercise_description: string;
  weightexercise: number;
  series: number;
  repetitions: number;
  day_of_week: number;
  created_at?: string;
  created_by?: string;
  updated_at?: string;
  updated_by?: string;
  deleted?: boolean;
}