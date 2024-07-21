import { Response } from 'express';
import { MailService } from '../services/mailService';
import { Mail } from '../models/mailModel';
import { AuthRequest } from '../../shared/config/types/authRequest';

export const getMailsByRecipientId = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const recipientId = parseInt(req.params.recipient_id, 10);
    const mails = await MailService.getMailsByRecipientId(recipientId);
    res.json(mails);
  } catch (err) {
    res.status(500).send('Error al obtener los datos');
  }
};


export const getMails = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const userId = req.user?.user_id;
    if (!userId) {
      res.status(401).send('Unauthorized');
      return;
    }

    const mails = await MailService.getMails(userId);
    res.json(mails);
  } catch (err) {
    res.status(500).send('Error al obtener los datos');
  }
};


export const getMailById = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const userId = req.user?.user_id;
    if (!userId) {
      res.status(401).send('Unauthorized');
      return;
    }

    const mail = await MailService.getMailById(parseInt(req.params.id, 10), userId);
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
    const userId = req.user?.user_id;
    if (!userId) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    const { messages, recipient_id } = req.body;

    if (!recipient_id) {
      return res.status(400).json({ message: 'Recipient ID is required' });
    }

    // Optionally: Validate recipient_id exists in the database

    const newMail: Mail = {
      messages,
      created_by: userId,
      updated_by: userId,
      recipient_id,
      
    };

    const createdMail = await MailService.createMail(newMail);
    return res.status(201).json(createdMail);
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

    const { messages, recipient_id } = req.body;
    const mailId = parseInt(req.params.id, 10);

    if (!recipient_id) {
      return res.status(400).json({ message: 'Recipient ID is required' });
    }

    const updatedMail: Mail = {
      messages,
      updated_by: userId,
      recipient_id
    };

    const mail = await MailService.updateMail(mailId, updatedMail);
    if (mail) {
      return res.status(200).json(mail);
    } else {
      return res.status(404).json({ message: 'Mail not found' });
    }
  } catch (err) {
    return res.status(500).send('Error al actualizar el mail');
  }
};

export const deleteMail = async (req: AuthRequest, res: Response): Promise<Response> => {
  try {
    const mailId = parseInt(req.params.id, 10);
    const success = await MailService.deleteMail(mailId);
    if (success) {
      return res.status(200).send('Mail deleted');
    } else {
      return res.status(404).json({ message: 'Mail not found' });
    }
  } catch (err) {
    return res.status(500).send('Error al eliminar el mail');
  }
};
