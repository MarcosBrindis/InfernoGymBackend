import { DieteRepository } from '../repositories/dieteRepository';
import { Diete } from '../models/dieteModel';

export class DieteService {

  public static async getDietes(): Promise<Diete[]> {
    return DieteRepository.findAll();
  }

  public static async getDieteById(id: number): Promise<Diete | null> {
    return DieteRepository.findById(id);
  }

  public static async getDieteByUserId(userId: number): Promise<Diete | null> {
    return DieteRepository.findDieteByUserId(userId);
  }

  public static async assignDieteToClient(dieteId: number, clientId: number, userId: number): Promise<boolean> {
    // Assign the new diet
    return DieteRepository.assignDieteToClient(dieteId, clientId, userId);
  }

  public static async createDiete(newItem: Diete, userId: number, clientId: number): Promise<Diete> {
    // Crear la dieta
    const createdDiete = await DieteRepository.createDiete(newItem, userId);
    
    // Asignar la dieta al cliente
    await DieteService.assignDieteToClient(createdDiete.diete_id!, clientId, userId);
  
    return createdDiete;
  }

  public static async updateDiete(id: number, updatedItem: Diete, userId: number): Promise<Diete | null> {
    return DieteRepository.updateDiete(id, updatedItem, userId);
  }

  public static async deleteDiete(id: number): Promise<boolean> {
    return DieteRepository.deleteDiete(id);
  }
}
