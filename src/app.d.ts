import { SupabaseClient, Session } from '@supabase/supabase-js'
import { Database } from './types'

declare global {
	namespace App {
		interface Locals {
			supabase: SupabaseClient<Database>
			getSession(): Promise<Session | null>
			getProfile(): Promise<Database["public"]["Tables"]["profiles"]["Row"] | null>
		}
		interface PageData {
			session: Session | null
		}
		// interface Error {}
		// interface Platform {}
	}
}
