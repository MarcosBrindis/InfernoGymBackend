import { Router } from 'express';
import { getMails, getMailById,getMailsByRecipientId ,createMail, updateMail, deleteMail } from '../controllers/mailController';
import { authMiddleware } from '../../shared/middlewares/auth';
import { authorizeSubscription } from '../../shared/middlewares/auth';


const mailRoutes: Router = Router();

mailRoutes.get('/', authMiddleware, authorizeSubscription(['Premium', 'Basic']), getMails);
mailRoutes.get('/:id', authMiddleware, authorizeSubscription(['Premium', 'Basic']), getMailById);
mailRoutes.get('/recipient/:recipient_id', authMiddleware, authorizeSubscription(['Premium', 'Basic']), getMailsByRecipientId);
mailRoutes.post('/', authMiddleware, authorizeSubscription(['Premium', 'Basic']), createMail);
mailRoutes.put('/:id', authMiddleware, authorizeSubscription(['Premium', 'Basic']), updateMail);
mailRoutes.delete('/:id', authMiddleware, authorizeSubscription(['Premium', 'Basic']), deleteMail);


export default mailRoutes;
