'use server'

import { supabase } from '@/lib/supabase'

export async function register(prevState: any, formData: FormData) {
	const { data, error } = await supabase.auth.signUp({
		email: formData.get('email')?.toString() as string,
        password: formData.get('password')?.toString() as string,
        options: {
            data: {
                name: formData.get('name'),
            }
        }
	})
	return {
		...prevState,
		email: formData.get('email'),
		password: formData.get('password'),
		data,
		error: error ? error.message : null,
	}
}
