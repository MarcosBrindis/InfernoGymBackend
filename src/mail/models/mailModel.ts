export interface Mail {
  mail_id?: number;
  messages: string;
  created_at?: string;
  created_by?: number; 
  updated_at?: string;
  updated_by?: number; 
  deleted?: boolean;
}