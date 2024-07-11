import { DieteRepository } from '../repositories/dieteRepository';
import { Diete } from '../models/dieteModel';

export class DieteService {
  public static async getDietes(): Promise<Diete[]> {
    return DieteRepository.findAll();
  }

  public static async getDieteById(id: number): Promise<Diete | null> {
    return DieteRepository.findById(id);
  }

  public static async createDiete(newItem: Diete): Promise<Diete> {
    return DieteRepository.createDiete(newItem);
  }

  public static async updateDiete(id: number, updatedItem: Diete): Promise<Diete | null> {
    return DieteRepository.updateDiete(id, updatedItem);
  }

  public static async deleteDiete(id: number): Promise<boolean> {
    return DieteRepository.deleteDiete(id);
  }
}
