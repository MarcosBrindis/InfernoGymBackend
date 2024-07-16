import { Response } from 'express';
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

export const createDiete = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const newDiete: Diete = req.body;
    const userId = req.user?.user_id;

    if (userId === undefined) {
      res.status(400).json({ message: 'User ID is missing' });
      return; // Detiene la ejecución aquí
    }

    await DieteService.createDiete(newDiete, userId);
    res.status(201).send('Diete created');
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
      return; // Detiene la ejecución aquí
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