export interface User {
    user_id?: number;
    name: string;
    password: string;
    weight?: number;
    height?: number;
    age?: number;
    progress?: string;
    subscription?: string;
    created_at?: string;
    created_by?: number;
    updated_at?: string;
    updated_by?: number;
    deleted?: boolean;
    role_id_fk?: number;
  }
  