import { Router } from 'express';
import { getExercises, getExerciseById, createExercise, updateExercise, deleteExercise, getUserExercises, assignExerciseToClient,unassignExerciseFromClient,getExercisesByName } from '../controllers/exerciseController';
import { authMiddleware } from '../../shared/middlewares/auth';
import { authorizeRole } from '../../shared/middlewares/auth';

const exerciseRoutes: Router = Router();

exerciseRoutes.get('/exercises', authMiddleware, getExercises);
exerciseRoutes.get('/exercises/:id', authMiddleware, getExerciseById);
exerciseRoutes.post('/exercises', authMiddleware, authorizeRole(['Administrador', 'Coach','Cliente']), createExercise);
exerciseRoutes.put('/exercises/:id', authMiddleware, authorizeRole(['Administrador', 'Coach','Cliente']), updateExercise);
exerciseRoutes.delete('/exercises/:id', authMiddleware, authorizeRole(['Administrador', 'Coach','Cliente']), deleteExercise);
exerciseRoutes.get('/user-exercises/:clientId', authMiddleware, getUserExercises);
exerciseRoutes.post('/assign-exercise', authMiddleware, authorizeRole(['Administrador','Coach','Cliente']), assignExerciseToClient);
exerciseRoutes.post('/unassign-exercise', authMiddleware, authorizeRole(['Administrador','Coach','Cliente']), unassignExerciseFromClient);
exerciseRoutes.get('/exercises-by-name', authMiddleware, getExercisesByName);

export default exerciseRoutes;