import { Router } from 'express';
import { getUsers, getUserById, getUserByName,addUserClientRelation,getClientsByUserId, createUser, updateUser,updateUsernotpass ,deleteUser, loginUser, getNutricionistsAndCoaches, getClients } from '../controllers/userController';

import { authMiddleware } from '../../shared/middlewares/auth';
import { authorizeRole } from '../../shared/middlewares/auth';

const userRoutes: Router = Router();

userRoutes.post('/login', loginUser);

userRoutes.get('/', authMiddleware,authorizeRole(['Administrador']), getUsers);
userRoutes.get('/nutricionists-coaches', authMiddleware, authorizeRole(['Administrador']), getNutricionistsAndCoaches);
userRoutes.get('/clients', authMiddleware, authorizeRole(['Administrador','Nutricionista', 'Coach']), getClients);
userRoutes.get('/:user_id', authMiddleware, getUserById);
userRoutes.get('/name/:name', authMiddleware, getUserByName);
userRoutes.post('/user-client', authMiddleware, authorizeRole(['Nutricionista', 'Coach','Administrador']), addUserClientRelation);
userRoutes.get('/user/:userId/clients', authMiddleware, authorizeRole(['Nutricionista', 'Coach','Administrador']), getClientsByUserId);
userRoutes.post('/', createUser );
userRoutes.put('/:user_id', authMiddleware, updateUser );
userRoutes.put('/not/:user_id', authMiddleware, updateUsernotpass );
userRoutes.delete('/:user_id', authMiddleware, deleteUser);

export default userRoutes;
