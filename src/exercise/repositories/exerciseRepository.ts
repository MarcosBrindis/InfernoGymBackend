import { ResultSetHeader } from 'mysql2';
import connection from '../../shared/config/database';
import { Exercise } from '../models/exerciseModel';

export class ExerciseRepository {

  public static async findAll(): Promise<Exercise[]> {
    return new Promise((resolve, reject) => {
      connection.query('SELECT * FROM exercise', (error: any, results) => {
        if (error) {
          reject(error);
        } else {
          const exercises: Exercise[] = results as Exercise[];
          resolve(exercises);
        }
      });
    });
  }

  public static async findById(id: number): Promise<Exercise | null> {
    return new Promise((resolve, reject) => {
      connection.query('SELECT * FROM exercise WHERE exercise_id = ?', [id], (error: any, results) => {
        if (error) {
          reject(error);
        } else {
          const exercises: Exercise[] = results as Exercise[];
          if (exercises.length > 0) {
            resolve(exercises[0]);
          } else {
            resolve(null);
          }
        }
      });
    });
  }

  public static async createExercise(exercise: Exercise): Promise<Exercise> {
    const query = 'INSERT INTO exercise (exercise_name, exercise_description, weightexercise, series, repetitions, created_by, updated_by) VALUES (?, ?, ?, ?, ?, ?, ?)';
    return new Promise((resolve, reject) => {
      connection.execute(query, [
        exercise.exercise_name,
        exercise.exercise_description,
        exercise.weightexercise,
        exercise.series,
        exercise.repetitions,
        exercise.created_by,
        exercise.updated_by
      ], (error, result: ResultSetHeader) => {
        if (error) {
          reject(error);
        } else {
          const createdExerciseId = result.insertId;
          const createdExercise: Exercise = { ...exercise, id: createdExerciseId };
          resolve(createdExercise);
        }
      });
    });
  }

  public static async updateExercise(id: number, exerciseData: Exercise): Promise<Exercise | null> {
    const query = 'UPDATE exercise SET exercise_name = ?, exercise_description = ?, weightexercise = ?, series = ?, repetitions = ?, updated_by = ? WHERE exercise_id = ?';
    return new Promise((resolve, reject) => {
      connection.execute(query, [
        exerciseData.exercise_name,
        exerciseData.exercise_description,
        exerciseData.weightexercise,
        exerciseData.series,
        exerciseData.repetitions,
        exerciseData.updated_by,
        id
      ], (error, result: ResultSetHeader) => {
        if (error) {
          reject(error);
        } else {
          if (result.affectedRows > 0) {
            const updatedExercise: Exercise = { ...exerciseData, id: id };
            resolve(updatedExercise);
          } else {
            resolve(null);
          }
        }
      });
    });
  }

  public static async deleteExercise(id: number): Promise<boolean> {
    const query = 'DELETE FROM exercise WHERE exercise_id = ?';
    return new Promise((resolve, reject) => {
      connection.execute(query, [id], (error, result: ResultSetHeader) => {
        if (error) {
          reject(error);
        } else {
          if (result.affectedRows > 0) {
            resolve(true);
          } else {
            resolve(false);
          }
        }
      });
    });
  }

}
