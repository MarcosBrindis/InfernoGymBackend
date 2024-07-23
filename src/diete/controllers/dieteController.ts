import { Response } from 'express';
import { Request } from 'express';
import { DieteService } from '../services/dieteService';
import { Diete } from '../models/dieteModel';
import { AuthRequest } from '../../shared/config/types/authRequest';

export const getDietes = async (_req: AuthRequest, res: Response): Promise<void> => {
  try {
    const dietes = await DieteService.getDietes();
    res.json(dietes);
  } catch (err) {
    res.status(500).send('Error al obtener los datos');
  }
};

export const getDieteById = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const diete = await DieteService.getDieteById(parseInt(req.params.id, 10));
    if (diete) {
      res.status(200).json(diete);
    } else {
      res.status(404).json({ message: 'Diete not found' });
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const getDieteByUserId = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = parseInt(req.params.userId, 10);
    const diete = await DieteService.getDieteByUserId(userId);
    if (diete) {
      res.status(200).json(diete);
    } else {
      res.status(404).json({ message: 'No se encontró una dieta para este usuario' });
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};



export const createDiete = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const newDiete: Diete = req.body;
    const userId = req.user?.user_id;
    const clientId = req.body.clientId;

    if (userId === undefined) {
      res.status(400).json({ message: 'User ID is missing' });
      return;
    }

    if (!clientId) {
      res.status(400).json({ message: 'Client ID is missing' });
      return;
    }

    // Llamar al servicio para crear la dieta y asignarla
    const createdDiete = await DieteService.createDiete(newDiete, userId, clientId);
    res.status(201).json({ message: 'Diete created and assigned successfully', diete: createdDiete });
  } catch (err) {
    res.status(500).send('Error al crear la dieta');
  }
};


export const updateDiete = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const updatedDiete: Diete = req.body;
    const userId = req.user?.user_id;

    if (userId === undefined) {
      res.status(400).json({ message: 'User ID is missing' });
      return;
    }

    await DieteService.updateDiete(parseInt(req.params.id, 10), updatedDiete, userId);
    res.send('Diete updated');
  } catch (err) {
    res.status(500).send('Error al actualizar la dieta');
  }
};

export const deleteDiete = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    await DieteService.deleteDiete(parseInt(req.params.id, 10));
    res.send('Diete deleted');
  } catch (err) {
    res.status(500).send('Error al eliminar la dieta');
  }
};
