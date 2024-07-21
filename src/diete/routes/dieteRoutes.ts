import { Router } from 'express';
import { getDietes, getDieteById, createDiete, updateDiete, deleteDiete } from '../controllers/dieteController';
import { authMiddleware } from '../../shared/middlewares/auth';
import { authorizeRole } from '../../shared/middlewares/auth';

const dieteRoutes: Router = Router();

dieteRoutes.get('/', authMiddleware, getDietes);
dieteRoutes.get('/:id', authMiddleware, getDieteById);
dieteRoutes.post('/', authMiddleware, authorizeRole(['Administrador', 'Nutricionista']) ,createDiete);
dieteRoutes.put('/:id', authMiddleware, authorizeRole(['Administrador', 'Nutricionista']) , updateDiete);
dieteRoutes.delete('/:id', authMiddleware, authorizeRole(['Administrador', 'Nutricionista']) , deleteDiete);

export default dieteRoutes;
