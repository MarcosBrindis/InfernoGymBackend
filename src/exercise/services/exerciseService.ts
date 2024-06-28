import { ExerciseRepository } from '../repositories/exerciseRepository';
import { Exercise } from '../models/exerciseModel';

export class ExerciseService {
  public static async getExercises(): Promise<Exercise[]> {
    return ExerciseRepository.findAll();
  }

  public static async getExerciseById(id: number): Promise<Exercise | null> {
    return ExerciseRepository.findById(id);
  }

  public static async createExercise(newItem: Exercise): Promise<Exercise> {
    return ExerciseRepository.createExercise(newItem);
  }

  public static async updateExercise(id: number, updatedItem: Exercise): Promise<Exercise | null> {
    return ExerciseRepository.updateExercise(id, updatedItem);
  }

  public static async deleteExercise(id: number): Promise<boolean> {
    return ExerciseRepository.deleteExercise(id);
  }
}
