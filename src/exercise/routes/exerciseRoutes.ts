import { Router } from 'express';
import { getExercises, getExerciseById, createExercise, updateExercise, deleteExercise } from '../controllers/exerciseController';
import { authMiddleware } from '../../shared/middlewares/auth';

const exerciseRoutes: Router = Router();

exerciseRoutes.get('/exercises', authMiddleware, getExercises);
exerciseRoutes.get('/exercises/:id', authMiddleware, getExerciseById);
exerciseRoutes.post('/exercises', authMiddleware, createExercise);
exerciseRoutes.put('/exercises/:id', authMiddleware, updateExercise);
exerciseRoutes.delete('/exercises/:id', authMiddleware, deleteExercise);

export default exerciseRoutes;

