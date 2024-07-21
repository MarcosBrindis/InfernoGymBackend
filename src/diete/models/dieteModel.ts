export interface Diete {
  diete_id?: number;
  foods: string;
  progress: string;
  created_at?: string;
  created_by?: number;
  updated_at?: string;
  updated_by?: number;
  deleted?: boolean;
  user_id?: number; 
}
