export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      collections: {
        Row: {
          created_at: string
          description: string | null
          id: string
          parent_id: string | null
          short_title: string | null
          title: string | null
          website: string | null
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: string
          parent_id?: string | null
          short_title?: string | null
          title?: string | null
          website?: string | null
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: string
          parent_id?: string | null
          short_title?: string | null
          title?: string | null
          website?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "collections_parent_id_fkey"
            columns: ["parent_id"]
            isOneToOne: false
            referencedRelation: "collections"
            referencedColumns: ["id"]
          }
        ]
      }
      profiles: {
        Row: {
          affiliation: string | null
          first_name: string | null
          id: string
          last_name: string | null
          website: string | null
        }
        Insert: {
          affiliation?: string | null
          first_name?: string | null
          id: string
          last_name?: string | null
          website?: string | null
        }
        Update: {
          affiliation?: string | null
          first_name?: string | null
          id?: string
          last_name?: string | null
          website?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "profiles_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      profiles_status: {
        Row: {
          id: string
          verified: boolean
        }
        Insert: {
          id: string
          verified?: boolean
        }
        Update: {
          id?: string
          verified?: boolean
        }
        Relationships: [
          {
            foreignKeyName: "profiles_status_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "full_profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "profiles_status_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "profiles_status_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "verified_profiles"
            referencedColumns: ["id"]
          }
        ]
      }
      submissions: {
        Row: {
          abstract: string | null
          collection_id: string
          created_at: string
          id: string
          profile_id: string
          title: string | null
        }
        Insert: {
          abstract?: string | null
          collection_id: string
          created_at?: string
          id?: string
          profile_id: string
          title?: string | null
        }
        Update: {
          abstract?: string | null
          collection_id?: string
          created_at?: string
          id?: string
          profile_id?: string
          title?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "submissions_collection_id_fkey"
            columns: ["collection_id"]
            isOneToOne: false
            referencedRelation: "collections"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "submissions_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "full_profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "submissions_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "submissions_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "verified_profiles"
            referencedColumns: ["id"]
          }
        ]
      }
      submissions_status: {
        Row: {
          id: string
          status: Database["public"]["Enums"]["submission_status"]
        }
        Insert: {
          id: string
          status?: Database["public"]["Enums"]["submission_status"]
        }
        Update: {
          id?: string
          status?: Database["public"]["Enums"]["submission_status"]
        }
        Relationships: [
          {
            foreignKeyName: "submissions_status_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "accepted_submissions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "submissions_status_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "submissions"
            referencedColumns: ["id"]
          }
        ]
      }
    }
    Views: {
      accepted_submissions: {
        Row: {
          abstract: string | null
          affiliation: string | null
          collection_id: string | null
          collection_short_title: string | null
          collection_title: string | null
          first_name: string | null
          id: string | null
          last_name: string | null
          profile_id: string | null
          status: Database["public"]["Enums"]["submission_status"] | null
          title: string | null
          website: string | null
        }
        Relationships: [
          {
            foreignKeyName: "submissions_collection_id_fkey"
            columns: ["collection_id"]
            isOneToOne: false
            referencedRelation: "collections"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "submissions_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "submissions_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "full_profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "submissions_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "verified_profiles"
            referencedColumns: ["id"]
          }
        ]
      }
      full_profiles: {
        Row: {
          affiliation: string | null
          first_name: string | null
          id: string | null
          last_name: string | null
          verified: boolean | null
          website: string | null
          email: string | null
        }
        Relationships: [
          {
            foreignKeyName: "profiles_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      verified_profiles: {
        Row: {
          affiliation: string | null
          first_name: string | null
          id: string | null
          last_name: string | null
          verified: boolean | null
          website: string | null
        }
        Relationships: [
          {
            foreignKeyName: "profiles_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      submission_status: "submitted" | "accepted" | "declined"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
