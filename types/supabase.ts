export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      Roles: {
        Row: {
          created_at: string;
          id: string;
          role_name: string;
          updated_at: string;
        };
        Insert: {
          created_at?: string;
          id?: string;
          role_name: string;
          updated_at?: string;
        };
        Update: {
          created_at?: string;
          id?: string;
          role_name?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      UserData: {
        Row: {
          created_at: string;
          EDEN_AI_API_KEY: string | null;
          GitHub: string | null;
          id: string;
          OPENAI_API_KEY: string | null;
        };
        Insert: {
          created_at?: string;
          EDEN_AI_API_KEY?: string | null;
          GitHub?: string | null;
          id: string;
          OPENAI_API_KEY?: string | null;
        };
        Update: {
          created_at?: string;
          EDEN_AI_API_KEY?: string | null;
          GitHub?: string | null;
          id?: string;
          OPENAI_API_KEY?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "UserData_id_fkey";
            columns: ["id"];
            referencedRelation: "users";
            referencedColumns: ["id"];
          },
        ];
      };
      UserRoleRelation: {
        Row: {
          created_at: string;
          id: string;
          role_id: string | null;
        };
        Insert: {
          created_at?: string;
          id: string;
          role_id?: string | null;
        };
        Update: {
          created_at?: string;
          id?: string;
          role_id?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "UserRoleRelation_id_fkey";
            columns: ["id"];
            referencedRelation: "users";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "UserRoleRelation_role_id_fkey";
            columns: ["role_id"];
            referencedRelation: "Roles";
            referencedColumns: ["id"];
          },
        ];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
}
