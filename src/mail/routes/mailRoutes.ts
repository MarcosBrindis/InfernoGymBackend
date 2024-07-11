import { Router } from 'express';
import { getMails, getMailById, createMail, updateMail, deleteMail } from '../controllers/mailController';
import { authMiddleware } from '../../shared/middlewares/auth';

const mailRoutes: Router = Router();

mailRoutes.get('/', authMiddleware, getMails);
mailRoutes.get('/:id', authMiddleware, getMailById);
mailRoutes.post('/', authMiddleware, createMail);
mailRoutes.put('/:id', authMiddleware, updateMail);
mailRoutes.delete('/:id', authMiddleware, deleteMail);

export default mailRoutes;
