export interface Diete {
  diete_id?: number;             // Correspondiente a "diet_id"
  foods: string;                // Correspondiente a "foods"
  progress?: string;            // Correspondiente a "progress"
  subscription?: boolean;       // Correspondiente a "subscription"
  created_at: string;           // Correspondiente a "created_at"
  created_by: number;           // Correspondiente a "created_by"
  updated_at: string;           // Correspondiente a "updated_at"
  updated_by?: number;          // Correspondiente a "updated_by"
  deleted?: boolean;            // Correspondiente a "deleted"
}
