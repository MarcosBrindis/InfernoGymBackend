import { Router } from 'express';
import { getDietes, getDieteById, createDiete, updateDiete, deleteDiete } from '../controllers/dieteController';
import { authMiddleware } from '../../shared/middlewares/auth';

const dieteRoutes: Router = Router();

dieteRoutes.get('/', authMiddleware, getDietes);
dieteRoutes.get('/:id', authMiddleware, getDieteById);
dieteRoutes.post('/', authMiddleware, createDiete);
dieteRoutes.put('/:id', authMiddleware, updateDiete);
dieteRoutes.delete('/:id', authMiddleware, deleteDiete);

export default dieteRoutes;
