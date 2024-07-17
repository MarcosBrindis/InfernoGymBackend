import { Response } from 'express';
import { MailService } from '../services/mailService';
import { Mail } from '../models/mailModel';
import { AuthRequest } from '../../shared/config/types/authRequest';

export const getMails = async (_req: AuthRequest, res: Response): Promise<void> => {
  try {
    const mails = await MailService.getMails();
    res.json(mails);
  } catch (err) {
    res.status(500).send('Error al obtener los datos');
  }
};

export const getMailById = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const mail = await MailService.getMailById(parseInt(req.params.id, 10));
    if (mail) {
      res.status(200).json(mail);
    } else {
      res.status(404).json({ message: 'Mail not found' });
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const createMail = async (req: AuthRequest, res: Response): Promise<Response> => {
  try {
    const userId = req.user?.user_id; // El ID del usuario está en req.user
    if (!userId) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    const newMail: Mail = {
      messages: req.body.messages,
      created_by: userId,
      updated_by: userId
    };

    await MailService.createMail(newMail);
    return res.status(201).send('Mail created');
  } catch (err) {
    return res.status(500).send('Error al crear el mail');
  }
};

export const updateMail = async (req: AuthRequest, res: Response): Promise<Response> => {
  try {
    const userId = req.user?.user_id;
    if (!userId) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    const updatedMail: Mail = {
      messages: req.body.messages,
      updated_by: userId
    };

    await MailService.updateMail(parseInt(req.params.id, 10), updatedMail);
    return res.send('Mail updated');
  } catch (err) {
    return res.status(500).send('Error al actualizar el mail');
  }
};

export const deleteMail = async (req: AuthRequest, res: Response): Promise<Response> => {
  try {
    await MailService.deleteMail(parseInt(req.params.id, 10));
    return res.send('Mail deleted');
  } catch (err) {
    return res.status(500).send('Error al eliminar el mail');
  }
};