import { Router } from 'express';
import { getExercises, getExerciseById, createExercise, updateExercise, deleteExercise, getUserExercises } from '../controllers/exerciseController';
import { authMiddleware } from '../../shared/middlewares/auth';
import { authorizeRole } from '../../shared/middlewares/auth';

const exerciseRoutes: Router = Router();

exerciseRoutes.get('/exercises', authMiddleware, getExercises);
exerciseRoutes.get('/exercises/:id', authMiddleware, getExerciseById);
exerciseRoutes.post('/exercises', authMiddleware, authorizeRole(['Administrador', 'Coach']), createExercise);
exerciseRoutes.put('/exercises/:id', authMiddleware, authorizeRole(['Administrador', 'Coach']), updateExercise);
exerciseRoutes.delete('/exercises/:id', authMiddleware, authorizeRole(['Administrador', 'Coach']), deleteExercise);
exerciseRoutes.get('/user-exercises', authMiddleware, getUserExercises);

export default exerciseRoutes;
