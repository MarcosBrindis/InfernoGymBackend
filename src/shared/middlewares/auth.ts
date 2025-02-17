import { Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { UserRepository } from '../../user/repositories/UserRepository';
import { UserPayload } from '../config/types/userPayLoad'; 
import { AuthRequest } from '../config/types/authRequest';
dotenv.config();

const secretKey = process.env.SECRET || "";

// Middleware para autenticación
export const authMiddleware = async (req: AuthRequest, res: Response, next: NextFunction) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');

  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }

  try {
    const payload = jwt.verify(token, secretKey) as UserPayload;
    console.log('Token payload:', payload);

    const user = await UserRepository.findById(payload.user_id);

    if (!user) {
      return res.status(401).json({ message: 'Invalid token' });
    }

    req.user = payload; // Almacenar todo el payload del usuario en req.user
    console.log('Authenticated user:', req.user);
    next();
  } catch (error: any) {
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ message: 'Token expired' });
    }
    return res.status(401).json({ message: 'Unauthorized' });
  }
};

// Middleware para autorización basada en roles
export const authorizeRole = (allowedRoles: string[]) => {
  return async (req: AuthRequest, res: Response, next: NextFunction) => {
    const userRole = req.user?.role_id_fk;

    if (!userRole) {
      return res.status(403).json({ message: 'Access forbidden: No role assigned' });
    }

    try {
      const user = await UserRepository.findById(req.user?.user_id || 0);

      if (!user || user.role_id_fk === undefined) {
        return res.status(403).json({ message: 'Access forbidden: Role information not available' });
      }

      const userRoleName = getUserRoleName(user.role_id_fk);

      if (!userRoleName) {
        return res.status(403).json({ message: 'Access forbidden: Invalid role' });
      }

      if (!allowedRoles.includes(userRoleName)) {
        return res.status(403).json({ message: 'Access forbidden: You do not have the necessary permissions' });
      }

      next();
    } catch (error) {
      console.error('Error in authorizeRole middleware:', error);
      return res.status(500).json({ message: 'Error retrieving user data' });
    }
  };
};

// Función para obtener el nombre del rol basado en role_id_fk
function getUserRoleName(role_id_fk?: number): string | null {
  if (role_id_fk === undefined) {
    return null;
  }

  switch (role_id_fk) {
    case 1:
      return 'Administrador';
    case 2:
      return 'Cliente';
    case 3:
      return 'Nutricionista';
    case 4:
      return 'Coach';
    default:
      return null;
  }
}


// Middleware para autorización basada en subscription_id
export const authorizeSubscription = (allowedSubscriptionNames: string[]) => {
  return async (req: AuthRequest, res: Response, next: NextFunction) => {
    const userSubscriptionId = req.user?.subscription_id;

    if (!userSubscriptionId) {
      return res.status(403).json({ message: 'Access forbidden: No subscription assigned' });
    }

    try {
      const subscription = await getSubscriptionById(userSubscriptionId);

      if (!subscription) {
        return res.status(403).json({ message: 'Access forbidden: Invalid subscription' });
      }

      if (!allowedSubscriptionNames.includes(subscription.name)) {
        return res.status(403).json({ message: 'Access forbidden: Subscription does not match' });
      }

      next();
    } catch (error) {
      console.error('Error in authorizeSubscription middleware:', error);
      return res.status(500).json({ message: 'Error retrieving subscription data' });
    }
  };
};


async function getSubscriptionById(subscription_id: number) {
  const mockSubscriptions = [
    { id: 1, name: 'Basic' },
    { id: 2, name: 'Premium' },
    { id: 3, name: 'free' }
  ];
  return mockSubscriptions.find(sub => sub.id === subscription_id) || null;
}

/*
// Middleware para autorización basada en mail create 
export const authorizeMailAccess = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const userId = req.user?.user_id;
    if (!userId) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    const mailId = parseInt(req.params.id, 10);

    if (req.method === 'POST' || req.method === 'PUT') {
      const { recipient_id } = req.body;
      if (req.method === 'POST') {
        // For creating mail, only ensure recipient_id is provided
        if (!recipient_id) {
          return res.status(400).json({ message: 'Recipient ID is required' });
        }
      } else if (req.method === 'PUT') {
        // For updating mail, verify the ownership
        const mail = await MailService.getMailById(mailId);
        if (mail && mail.created_by !== userId && mail.recipient_id !== userId) {
          return res.status(403).json({ message: 'Access forbidden' });
        }
      }
    } else if (req.method === 'DELETE' || req.method === 'GET') {
      // For getting or deleting mail, verify the ownership
      const mail = await MailService.getMailById(mailId);
      if (mail && mail.created_by !== userId && mail.recipient_id !== userId) {
        return res.status(403).json({ message: 'Access forbidden' });
      }
    }

    next();
  } catch (error) {
    console.error('Error in authorizeMailAccess middleware:', error);
    return res.status(500).json({ message: 'Error retrieving mail data' });
  }
};*/