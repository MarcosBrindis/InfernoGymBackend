import { Request } from 'express';
import { UserPayload } from './userPayLoad';

export interface AuthRequest extends Request {
    user?: UserPayload; // Actualiza la propiedad para incluir todo el payload del usuario
}
