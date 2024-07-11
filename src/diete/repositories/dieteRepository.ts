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

  public static async createDiete(diete: Diete): Promise<Diete> {
    const query = 'INSERT INTO diete (foods, progress, subscription, created_by, updated_by, deleted) VALUES (?, ?, ?, ?, ?, ?)';
    return new Promise((resolve, reject) => {
      connection.execute(query, [
        diete.foods,
        diete.progress,
        diete.subscription,
        diete.created_by,
        diete.updated_by,
        diete.deleted
      ], (error, result: ResultSetHeader) => {
        if (error) {
          reject(error);
        } else {
          const createdDieteId = result.insertId;
          const createdDiete: Diete = { ...diete, diete_id: createdDieteId };
          resolve(createdDiete);
        }
      });
    });
  }

  public static async updateDiete(id: number, dieteData: Diete): Promise<Diete | null> {
    const query = 'UPDATE diete SET foods = ?, progress = ?, subscription = ?, updated_by = ? WHERE diete_id = ?';
    return new Promise((resolve, reject) => {
      connection.execute(query, [
        dieteData.foods,
        dieteData.progress,
        dieteData.subscription,
        dieteData.updated_by,
        id
      ], (error, result: ResultSetHeader) => {
        if (error) {
          reject(error);
        } else {
          if (result.affectedRows > 0) {
            const updatedDiete: Diete = { ...dieteData, diete_id: id };
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
