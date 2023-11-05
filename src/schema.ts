export type Json = string | number | boolean | null | { [key: string]: Json } | Json[]

export interface Database {
	public: {
		Tables: {
			profiles: {
				Row: {
					id: string
					updated_at: string | null
					first_name: string | null
					last_name: string | null
					avatar_url: string | null
					website: string | null
					orcid_id: string | null
				}
				Insert: {
					id: string
					updated_at?: string | null
					first_name?: string | null
					last_name?: string | null
					avatar_url?: string | null
					website?: string | null
					orcid_id?: string | null
				}
				Update: {
					id?: string
					updated_at?: string | null
					first_name?: string | null
					last_name?: string | null
					avatar_url?: string | null
					website?: string | null
					orcid_id?: string | null
				}
			},
			collections: {
				Row: {
					id: string
					title: string | null
					short_title: string | null
					description: string | null
					website: string | null
					parent_id: string | null
				}
				Insert: {
					id: string
					title?: string | null
					short_title?: string | null
					description?: string | null
					website?: string | null
					parent_id?: string | null
				}
				Update: {
					id?: string
					title?: string | null
					short_title?: string | null
					description?: string | null
					website?: string | null
					parent_id?: string | null
				}
			}
		}
		Views: {
			[_ in never]: never
		}
		Functions: {
			[_ in never]: never
		}
		Enums: {
			[_ in never]: never
		}
	}
}
