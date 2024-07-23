import { ResultSetHeader } from 'mysql2';
import connection from '../../shared/config/database';
import { Diete } from '../models/dieteModel';

export class DieteRepository {

  public static async findAll(): Promise<Diete[]> {
    return new Promise((resolve, reject) => {
      connection.query('SELECT * FROM diete', (error: any, results) => {
        if (error) {
          reject(error);
        } else {
          const diets: Diete[] = results as Diete[];
          resolve(diets);
        }
      });
    });
  }

  public static async findById(id: number): Promise<Diete | null> {
    return new Promise((resolve, reject) => {
      connection.query('SELECT * FROM diete WHERE diete_id = ?', [id], (error: any, results) => {
        if (error) {
          reject(error);
        } else {
          const diets: Diete[] = results as Diete[];
          if (diets.length > 0) {
            resolve(diets[0]);
          } else {
            resolve(null);
          }
        }
      });
    });
  }

  public static async findDieteByUserId(userId: number): Promise<Diete | null> {
    const query = 'SELECT * FROM diete WHERE user_id = ? AND deleted = FALSE';
    return new Promise((resolve, reject) => {
      connection.query(query, [userId], (error: any, results) => {
        if (error) {
          reject(error);
        } else {
          const diets: Diete[] = results as Diete[];
          if (diets.length > 0) {
            resolve(diets[0]);
          } else {
            resolve(null);
          }
        }
      });
    });
  }

  public static async assignDieteToClient(dieteId: number, clientId: number, userId: number): Promise<boolean> {
    const query = 'UPDATE diete SET user_id = ?, updated_by = ? WHERE diete_id = ?';
    return new Promise((resolve, reject) => {
      connection.execute(query, [clientId, userId, dieteId], (error, result: ResultSetHeader) => {
        if (error) {
          reject(error);
        } else {
          resolve(result.affectedRows > 0);
        }
      });
    });
  }

  public static async createDiete(diete: Diete, userId: number): Promise<Diete> {
    const query = 'INSERT INTO diete (foods, progress, created_by, updated_by, user_id) VALUES (?, ?, ?, ?, ?)';
    return new Promise((resolve, reject) => {
      connection.execute(query, [
        diete.foods,
        diete.progress,
        userId, 
        userId, 
        userId
      ], (error, result: ResultSetHeader) => {
        if (error) {
          reject(error);
        } else {
          const createdDieteId = result.insertId;
          const createdDiete: Diete = { ...diete, diete_id: createdDieteId, created_by: userId, updated_by: userId, user_id: userId };
          resolve(createdDiete);
        }
      });
    });
  }
 
  public static async updateDiete(id: number, dieteData: Diete, userId: number): Promise<Diete | null> {
    const query = 'UPDATE diete SET foods = ?, progress = ?, updated_by = ? WHERE diete_id = ?';
    return new Promise((resolve, reject) => {
      connection.execute(query, [
        dieteData.foods,
        dieteData.progress,
        userId,
        id
      ], (error, result: ResultSetHeader) => {
        if (error) {
          reject(error);
        } else {
          if (result.affectedRows > 0) {
            const updatedDiete: Diete = { ...dieteData, diete_id: id, updated_by: userId };
            resolve(updatedDiete);
          } else {
            resolve(null);
          }
        }
      });
    });
  }

  public static async deleteDiete(id: number): Promise<boolean> {
    const query = 'DELETE FROM diete WHERE diete_id = ?';
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
