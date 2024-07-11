import { MailRepository } from '../repositories/mailRepository';
import { Mail } from '../models/mailModel';

export class MailService {
  public static async getMails(): Promise<Mail[]> {
    return MailRepository.findAll();
  }

  public static async getMailById(id: number): Promise<Mail | null> {
    return MailRepository.findById(id);
  }

  public static async createMail(newItem: Mail): Promise<Mail> {
    return MailRepository.createMail(newItem);
  }

  public static async updateMail(id: number, updatedItem: Mail): Promise<Mail | null> {
    return MailRepository.updateMail(id, updatedItem);
  }

  public static async deleteMail(id: number): Promise<boolean> {
    return MailRepository.deleteMail(id);
  }
}
