import { Router } from 'express';
import { getUsers, getUserById, createUser, updateUser, deleteUser, loginUser } from '../controllers/userController';
import { authMiddleware } from '../../shared/middlewares/auth';
import { authorizeRole } from '../../shared/middlewares/auth';

const userRoutes: Router = Router();

userRoutes.post('/login', loginUser);

userRoutes.get('/', authMiddleware,authorizeRole(['Administrador']), getUsers);
userRoutes.get('/:user_id', authMiddleware,authorizeRole(['Administrador']), getUserById);
userRoutes.post('/',authMiddleware, createUser );
userRoutes.put('/:user_id', authMiddleware, updateUser );
userRoutes.delete('/:user_id', authMiddleware, deleteUser);

export default userRoutes;
