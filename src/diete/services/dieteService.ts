import { DieteRepository } from '../repositories/dieteRepository';
import { Diete } from '../models/dieteModel';

export class DieteService {

  public static async getDietes(): Promise<Diete[]> {
    return DieteRepository.findAll();
  }

  public static async getDieteById(id: number): Promise<Diete | null> {
    return DieteRepository.findById(id);
  }

  public static async createDiete(newItem: Diete, userId: number): Promise<Diete> {
    return DieteRepository.createDiete(newItem, userId);
  }

  public static async updateDiete(id: number, updatedItem: Diete, userId: number): Promise<Diete | null> {
    return DieteRepository.updateDiete(id, updatedItem, userId);
  }

  public static async deleteDiete(id: number): Promise<boolean> {
    return DieteRepository.deleteDiete(id);
  }
}
