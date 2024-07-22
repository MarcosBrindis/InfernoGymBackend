import { Request, Response } from 'express';
import { UserService } from '../services/userService';

export const loginUser = async (req: Request, res: Response) => {
  const { nickname, password } = req.body;
  try {
    const token = await UserService.login(nickname, password);

    if (!token) {
      res.status(401).json({ message: 'Invalid nickname or password' });
    } else {
      res.status(200).json({ token });
    }

  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

export const getUsers = async (_req: Request, res: Response) => {
  try {
    const users = await UserService.getAllUsers();
    if(users){
      res.status(200).json(users);
    } else {
      res.status(404).json({ message: 'Sin registros' });
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const getUserById = async (req: Request, res: Response) => {
  try {
    const user = await UserService.getUserById(parseInt(req.params.user_id, 10));
    if(user){
      res.status(200).json(user);
    } else {
      res.status(404).json({ message: 'No se encontró el usuario' });
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const getUserByName = async (req: Request, res: Response) => {
  try {
    const name = req.params.name;
    const user = await UserService.getUserByName(name);
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

// Endpoint para obtener solo nutricionistas y coaches
export const getNutricionistsAndCoaches = async (_req: Request, res: Response) => {
  try {
    const users = await UserService.getUsersByRoles([3, 4]); // Roles de Nutricionista y Coach
    if (users) {
      res.status(200).json(users);
    } else {
      res.status(404).json({ message: 'Sin registros' });
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

// Endpoint para obtener solo clientes
export const getClients = async (_req: Request, res: Response) => {
  try {
    const users = await UserService.getUsersByRoles([2]); // Rol de Cliente
    if (users) {
      res.status(200).json(users);
    } else {
      res.status(404).json({ message: 'Sin registros' });
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

// Métodos para gestión de relación cliente-empleados con validaciones
export const addUserClientRelation = async (req: Request, res: Response) => {
  const { userId, clientId } = req.body;
  
  try {
    // Validar si userId es Nutricionista o Coach
    const isValidUser = await UserService.isRole(userId, [3, 4]);
    if (!isValidUser) {
      return res.status(400).json({ message: 'El usuario debe ser Nutricionista o Coach.' });
    }

    // Validar si clientId es Cliente
    const isValidClient = await UserService.isRole(clientId, [2]);
    if (!isValidClient) {
      return res.status(400).json({ message: 'El cliente debe tener el rol Cliente.' });
    }

    await UserService.addUserClientRelation(userId, clientId);
    res.status(201).json({ message: 'Relación usuario-cliente añadida exitosamente.' });
  } catch (error: any) {
    console.error('Error al añadir relación usuario-cliente:', error);
    res.status(500).json({ error: error.message });
  }
};

export const getClientsByUserId = async (req: Request, res: Response) => {
  const userId = parseInt(req.params.userId, 10);
  
  try {
    const isValidUser = await UserService.isRole(userId, [3, 4]);
    if (!isValidUser) {
      return res.status(400).json({ message: 'El usuario debe ser Nutricionista o Coach para ver sus clientes.' });
    }

    const clients = await UserService.getClientsByUserId(userId);
    if (clients.length > 0) {
      res.status(200).json(clients);
    } else {
      res.status(404).json({ message: 'No se encontraron clientes para este usuario.' });
    }
  } catch (error: any) {
    console.error('Error al obtener clientes por ID de usuario:', error);
    res.status(500).json({ error: error.message });
  }
};

export const createUser = async (req: Request, res: Response) => {
  try {
    const newUser = await UserService.addUser(req.body);
    if(newUser){
      res.status(201).json(newUser);
    } else {
      res.status(400).json({ message: 'Algo salio mal' });
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const updateUser = async (req: Request, res: Response) => {
  try {
    const updatedUser = await UserService.modifyUser(parseInt(req.params.user_id, 10), req.body);
    if(updatedUser){
      res.status(200).json(updatedUser);
    } else {
      res.status(404).json({ message: 'No se encontró el usuario' });
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  try {
    const deleteUser = await UserService.deleteUser(parseInt(req.params.user_id, 10));
    if(deleteUser){
      res.status(204).json(deleteUser);
    } else {
      res.status(404).json({ message: 'No se encontró el usuario' });
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
