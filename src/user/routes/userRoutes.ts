import { Router } from 'express';
import { getUsers, getUserById, getUserByName, createUser, updateUser, deleteUser, loginUser, getNutricionistsAndCoaches, getClients } from '../controllers/userController';

import { authMiddleware } from '../../shared/middlewares/auth';
import { authorizeRole } from '../../shared/middlewares/auth';

const userRoutes: Router = Router();

userRoutes.post('/login', loginUser);

userRoutes.get('/', authMiddleware,authorizeRole(['Administrador']), getUsers);
userRoutes.get('/nutricionists-coaches', authMiddleware, authorizeRole(['Administrador']), getNutricionistsAndCoaches);
userRoutes.get('/clients', authMiddleware, authorizeRole(['Administrador']), getClients);
userRoutes.get('/:user_id', authMiddleware,authorizeRole(['Administrador']), getUserById);
userRoutes.get('/name/:name', authMiddleware, getUserByName);
userRoutes.post('/', createUser );
userRoutes.put('/:user_id', authMiddleware, updateUser );
userRoutes.delete('/:user_id', authMiddleware, deleteUser);

export default userRoutes;
