import { Request, Response } from 'express';
import { ExerciseService } from '../services/exerciseService';
import { Exercise } from '../models/exerciseModel';

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

export const createExercise = async (req: Request, res: Response): Promise<void> => {
  try {
    const newExercise: Exercise = req.body;
    await ExerciseService.createExercise(newExercise);
    res.status(201).send('Exercise created');
  } catch (err) {
    res.status(500).send('Error al crear el ejercicio');
  }
};

export const updateExercise = async (req: Request, res: Response): Promise<void> => {
  try {
    const updatedExercise: Exercise = req.body;
    await ExerciseService.updateExercise(parseInt(req.params.id, 10), updatedExercise);
    res.send('Exercise updated');
  } catch (err) {
    res.status(500).send('Error al actualizar el ejercicio');
  }
};

export const deleteExercise = async (req: Request, res: Response): Promise<void> => {
  try {
    await ExerciseService.deleteExercise(parseInt(req.params.id, 10));
    res.send('Exercise deleted');
  } catch (err) {
    res.status(500).send('Error al eliminar el ejercicio');
  }
};
