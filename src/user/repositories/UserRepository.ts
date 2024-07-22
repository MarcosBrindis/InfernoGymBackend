import { ResultSetHeader } from 'mysql2';
import connection from '../../shared/config/database';
import { User } from '../models/User';

export class UserRepository {
  public static async findAll(): Promise<User[]> {
    return new Promise((resolve, reject) => {
      connection.query('SELECT user_id, role_id_fk,subscription_id ,name FROM user', (error: any, results) => {
        if (error) {
          reject(error);
        } else {
          const users: User[] = results as User[];
          resolve(users);
        }
      });
    });
  }

  public static async findById(id: number): Promise<User | null> {
    return new Promise((resolve, reject) => {
      connection.query('SELECT u.*, r.title as role_title, s.name as subscription_name FROM user u JOIN role_user r ON u.role_id_fk = r.role_id LEFT JOIN subscription s ON u.subscription_id = s.subscription_id WHERE u.user_id = ?', [id], (error: any, results) => {
        if (error) {
          reject(error);
        } else {
          const users: User[] = results as User[];
          if (users.length > 0) {
            resolve(users[0]);
          } else {
            resolve(null);
          }
        }
      });
    });
  }

  public static async findByName(name: string): Promise<User | null> {
    return new Promise((resolve, reject) => {
      connection.query('SELECT * FROM user WHERE name = ?', [name], (error: any, results) => {
        if (error) {
          reject(error);
        } else {
          const users: User[] = results as User[];
          if (users.length > 0) {
            resolve(users[0]);
          } else {
            resolve(null);
          }
        }
      });
    });
  }

// Método para obtener usuarios por roles
  public static async findByRoles(roleIds: number[]): Promise<User[]> {
    return new Promise((resolve, reject) => {
      const placeholders = roleIds.map(() => '?').join(',');
      const query = `SELECT user_id, role_id_fk, subscription_id, name FROM user WHERE role_id_fk IN (${placeholders})`;
      connection.query(query, roleIds, (error: any, results) => {
        if (error) {
          reject(error);
        } else {
          const users: User[] = results as User[];
          resolve(users);
        }
      });
    });
  }
//metodos para  gestion de relacion cliente empleados
public static async addUserClientRelation(userId: number, clientId: number): Promise<void> {
  const query = 'INSERT INTO user_client (user_id, client_id) VALUES (?, ?)';
  return new Promise((resolve, reject) => {
      connection.execute(query, [userId, clientId], (error) => {
          if (error) {
              reject(error);
          } else {
              resolve();
          }
      });
  });
}

public static async getClientsByUserId(userId: number): Promise<User[]> {
  const query = `
      SELECT u.*
      FROM user u
      INNER JOIN user_client uc ON u.user_id = uc.client_id
      WHERE uc.user_id = ?
  `;
  return new Promise((resolve, reject) => {
      connection.query(query, [userId], (error, results) => {
          if (error) {
              reject(error);
          } else {
              resolve(results as User[]);
          }
      });
  });
}

////////
  public static async createUser(user: User): Promise<User> {
    const query = 'INSERT INTO user (name, password, weight, height, age, progress, subscription_id, created_at, created_by, updated_at, updated_by, deleted, role_id_fk) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
    return new Promise((resolve, reject) => {
      connection.execute(query, [
        user.name, 
        user.password, 
        user.weight || null, 
        user.height || null, 
        user.age || null, 
        user.progress || null, 
        user.subscription_id || null, 
        user.created_at || null, 
        user.created_by || null, 
        user.updated_at || null, 
        user.updated_by || null, 
        user.deleted || false, 
        user.role_id_fk || null
      ], (error, result: ResultSetHeader) => {
        if (error) {
          reject(error);
        } else {
          const createdUserId = result.insertId;
          const createdUser: User = { ...user, user_id: createdUserId };
          resolve(createdUser);
        }
      });
    });
  }

  public static async updateUser(user_id: number, userData: User): Promise<User | null> {
    const query = 'UPDATE user SET name = ?, role_id_fk = ?, password = ?, updated_at = ?, updated_by = ?, deleted = ?, subscription_id = ? WHERE user_id = ?';
    return new Promise((resolve, reject) => {
      connection.execute(query, [
        userData.name, 
        userData.role_id_fk || null, 
        userData.password, 
        userData.updated_at, 
        userData.updated_by || null, 
        userData.deleted || false, 
        userData.subscription_id || null,
        user_id
      ], (error, result: ResultSetHeader) => {
        if (error) {
          reject(error);
        } else {
          if (result.affectedRows > 0) {
            const updatedUser: User = { ...userData, user_id: user_id };
            resolve(updatedUser);
          } else {
            resolve(null);
          }
        }
      });
    });
  }

  public static async deleteUser(user_id: number): Promise<boolean> {
    const query = 'DELETE FROM user WHERE user_id = ?';
    return new Promise((resolve, reject) => {
      connection.execute(query, [user_id], (error, result: ResultSetHeader) => {
        if (error) {
          reject(error);
        } else {
          if (result.affectedRows > 0) {
            resolve(true); // Eliminación exitosa
          } else {
            resolve(false); // Si no se encontró el usuario a eliminar
          }
        }
      });
    });
  }
}
