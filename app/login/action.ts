'use client'

import { supabase } from '@/lib/supabase'

export async function login(prevState: any, formData: FormData) {
	const { data, error } = await supabase.auth.signInWithPassword({
		email: formData.get('email')?.toString() as string,
		password: formData.get('password')?.toString() as string,
	})
	return {
		...prevState,
		email: formData.get('email'),
		password: formData.get('password'),
		data,
		error,
	}
}
