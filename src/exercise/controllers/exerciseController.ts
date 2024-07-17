import { Request, Response } from 'express';
import { ExerciseService } from '../services/exerciseService';
import { Exercise } from '../models/exerciseModel';
import { AuthRequest } from '../../shared/config/types/authRequest';

export const getExercises = async (_req: Request, res: Response): Promise<void> => {
  try {
    const exercises = await ExerciseService.getExercises();
    res.json(exercises);
  } catch (err) {
    res.status(500).send('Error al obtener los datos');
  }
};

export const getExerciseById = async (req: Request, res: Response): Promise<void> => {
  try {
    const exercise = await ExerciseService.getExerciseById(parseInt(req.params.id, 10));
    if (exercise) {
      res.status(200).json(exercise);
    } else {
      res.status(404).json({ message: 'Exercise not found' });
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const createExercise = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { exercise_name, exercise_description, weightexercise, series, repetitions } = req.body;
    const userId = req.user?.user_id;

    if (!userId) {
      res.status(400).json({ message: 'User ID is missing' });
      return;
    }

    const newExercise: Omit<Exercise, 'created_at' | 'updated_at'> = {
      exercise_name,
      exercise_description,
      weightexercise,
      series,
      repetitions,
      created_by: userId.toString(),
      updated_by: userId.toString(),
    };

    const createdExercise = await ExerciseService.createExercise(newExercise as Exercise);
    await ExerciseService.addUserExercise(userId, createdExercise.id!, userId);
    res.status(201).send('Exercise created');
  } catch (err) {
    res.status(500).send('Error al crear el ejercicio');
  }
};

export const updateExercise = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { exercise_name, exercise_description, weightexercise, series, repetitions } = req.body;
    const userId = req.user?.user_id;

    if (!userId) {
      res.status(400).json({ message: 'User ID is missing' });
      return;
    }

    const updatedExercise: Omit<Exercise, 'created_at' | 'updated_at'> = {
      exercise_name,
      exercise_description,
      weightexercise,
      series,
      repetitions,
      updated_by: userId.toString(),
    };

    await ExerciseService.updateExercise(parseInt(req.params.id, 10), updatedExercise as Exercise);
    res.send('Exercise updated');
  } catch (err) {
    res.status(500).send('Error al actualizar el ejercicio');
  }
};

export const deleteExercise = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const userId = req.user?.user_id;

    if (!userId) {
      res.status(400).json({ message: 'User ID is missing' });
      return;
    }

    await ExerciseService.deleteExercise(parseInt(req.params.id, 10));
    await ExerciseService.removeUserExercise(userId, parseInt(req.params.id, 10));
    res.send('Exercise deleted');
  } catch (err) {
    res.status(500).send('Error al eliminar el ejercicio');
  }
};

export const getUserExercises = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const userId = req.user?.user_id;

    if (!userId) {
      res.status(400).json({ message: 'User ID is missing' });
      return;
    }

    const exercises = await ExerciseService.getUserExercises(userId);
    res.json(exercises);
  } catch (err) {
    res.status(500).send('Error al obtener los ejercicios del usuario');
  }
};