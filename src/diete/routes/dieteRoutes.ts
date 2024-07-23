import { Router } from 'express';
import { getDietes, getDieteById,getDieteByUserId ,createDiete, updateDiete, deleteDiete } from '../controllers/dieteController';
import { authMiddleware } from '../../shared/middlewares/auth';
import { authorizeRole } from '../../shared/middlewares/auth';
import { authorizeSubscription } from '../../shared/middlewares/auth';

const dieteRoutes: Router = Router();

dieteRoutes.get('/', authMiddleware,authorizeRole(['Administrador', 'Nutricionista']), getDietes);
dieteRoutes.get('/:id', authMiddleware,authorizeRole(['Administrador', 'Nutricionista']), getDieteById);
dieteRoutes.get('/user/:userId', authMiddleware, authorizeRole(['Administrador', 'Nutricionista']), getDieteByUserId); 
dieteRoutes.post('/', authMiddleware, authorizeRole(['Administrador', 'Nutricionista']),authorizeSubscription(['Premium']) ,createDiete);
dieteRoutes.put('/:id', authMiddleware, authorizeRole(['Administrador', 'Nutricionista']),authorizeSubscription(['Premium']), updateDiete);
dieteRoutes.delete('/:id', authMiddleware, authorizeRole(['Administrador', 'Nutricionista']),authorizeSubscription(['Premium']) , deleteDiete);

export default dieteRoutes;
