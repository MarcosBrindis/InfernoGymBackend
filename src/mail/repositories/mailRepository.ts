import { ResultSetHeader } from 'mysql2';
import connection from '../../shared/config/database';
import { Mail } from '../models/mailModel';

export class MailRepository {
  public static async findAll(userId: number): Promise<Mail[]> {
    return new Promise((resolve, reject) => {
      const query = `
        SELECT * FROM mail 
        WHERE deleted = false 
        AND (created_by = ? OR recipient_id = ?)
      `;
      connection.query(query, [userId, userId], (error: any, results) => {
        if (error) {
          reject(error);
        } else {
          const mails: Mail[] = results as Mail[];
          resolve(mails);
        }
      });
    });
  }
  
  public static async findById(id: number, userId: number): Promise<Mail | null> {
    return new Promise((resolve, reject) => {
      const query = `
        SELECT * FROM mail 
        WHERE mail_id = ? 
        AND deleted = false 
        AND (created_by = ? OR recipient_id = ?)
      `;
      connection.query(query, [id, userId, userId], (error: any, results) => {
        if (error) {
          reject(error);
        } else {
          const mails: Mail[] = results as Mail[];
          if (mails.length > 0) {
            resolve(mails[0]);
          } else {
            resolve(null);
          }
        }
      });
    });
  }
  
  public static async findByRecipientId(recipient_id: number): Promise<Mail[]> {
    return new Promise((resolve, reject) => {
      connection.query(
        'SELECT * FROM mail WHERE recipient_id = ? AND deleted = false',
        [recipient_id],
        (error: any, results) => {
          if (error) {
            reject(error);
          } else {
            const mails: Mail[] = results as Mail[];
            resolve(mails);
          }
        }
      );
    });
  }


  public static async createMail(mail: Mail): Promise<Mail> {
    const query = 'INSERT INTO mail (messages, created_by, updated_by, recipient_id) VALUES (?, ?, ?, ?)';
    return new Promise((resolve, reject) => {
      connection.execute(query, [
        mail.messages,
        mail.created_by,
        mail.updated_by,
        mail.recipient_id
      ], (error, result: ResultSetHeader) => {
        if (error) {
          reject(error);
        } else {
          const createdMailId = result.insertId;
          const createdMail: Mail = { ...mail, mail_id: createdMailId };
          resolve(createdMail);
        }
      });
    });
  }

  public static async updateMail(id: number, mailData: Mail): Promise<Mail | null> {
    const query = 'UPDATE mail SET messages = ?, updated_by = ?, recipient_id = ? WHERE mail_id = ?';
    return new Promise((resolve, reject) => {
      connection.execute(query, [
        mailData.messages,
        mailData.updated_by,
        mailData.recipient_id,
        id
      ], (error, result: ResultSetHeader) => {
        if (error) {
          reject(error);
        } else {
          if (result.affectedRows > 0) {
            const updatedMail: Mail = { ...mailData, mail_id: id };
            resolve(updatedMail);
          } else {
            resolve(null);
          }
        }
      });
    });
  }

  public static async deleteMail(id: number): Promise<boolean> {
    const query = 'UPDATE mail SET deleted = true WHERE mail_id = ?';
    return new Promise((resolve, reject) => {
      connection.execute(query, [id], (error, result: ResultSetHeader) => {
        if (error) {
          reject(error);
        } else {
          if (result.affectedRows > 0) {
            resolve(true);
          } else {
            resolve(false);
          }
        }
      });
    });
  }
}
