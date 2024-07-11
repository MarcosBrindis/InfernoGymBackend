import { Request, Response } from 'express';
import { MailService } from '../services/mailService';
import { Mail } from '../models/mailModel';

export const getMails = async (_req: Request, res: Response): Promise<void> => {
  try {
    const mails = await MailService.getMails();
    res.json(mails);
  } catch (err) {
    res.status(500).send('Error al obtener los datos');
  }
};

export const getMailById = async (req: Request, res: Response): Promise<void> => {
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

export const createMail = async (req: Request, res: Response): Promise<void> => {
  try {
    const newMail: Mail = req.body;
    await MailService.createMail(newMail);
    res.status(201).send('Mail created');
  } catch (err) {
    res.status(500).send('Error al crear el mail');
  }
};

export const updateMail = async (req: Request, res: Response): Promise<void> => {
  try {
    const updatedMail: Mail = req.body;
    await MailService.updateMail(parseInt(req.params.id, 10), updatedMail);
    res.send('Mail updated');
  } catch (err) {
    res.status(500).send('Error al actualizar el mail');
  }
};

export const deleteMail = async (req: Request, res: Response): Promise<void> => {
  try {
    await MailService.deleteMail(parseInt(req.params.id, 10));
    res.send('Mail deleted');
  } catch (err) {
    res.status(500).send('Error al eliminar el mail');
  }
};
