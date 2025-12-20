'use client'

import { useEffect, useState } from 'react'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card } from '@/components/ui/card'
import { FileText, Eye, EyeOff } from 'lucide-react'
import Form from 'next/form'
import Link from 'next/link'
import { useFormState } from 'react-dom'
import { login } from '@/app/login/action'
import { redirect, useSearchParams } from 'next/navigation'
import { toast } from 'sonner'
import { Toaster } from '@/components/ui/sonner'
import { SubmitButton } from '@/components/SubmitButton'
import { supabase } from '@/lib/supabase'

export function LoginContent() {
	const [showPassword, setShowPassword] = useState(false)
	const [formState, formAction] = useFormState(login, {
		data: null,
		error: null,
	})
	const [error, setError] = useState(false)
	const params = useSearchParams()

	useEffect(() => {
		const fetchData = async () => {
			const { data } = await supabase
				.from('organization')
				.select()
				.contains('user_id', [formState.data.user.id])
				.single()
			if (data) redirect('/dashboard')
			else redirect('/organization/create')
		}
		if (formState.data) {
			if (formState.error) setError(true)
			else fetchData()
		}
	}, [formState])

	useEffect(() => {
		if (params.get('redirect_from')) toast('Berhasil sign up!')
	}, [])

	return (
		<div className='min-h-[calc(100vh-4rem)] flex items-center justify-center px-4 py-12'>
			<div className='w-full max-w-md'>
				<div className='flex justify-center mb-8'>
					<div className='flex items-center gap-2'>
						<div className='flex h-12 w-12 items-center justify-center rounded-lg bg-primary'>
							<FileText className='h-7 w-7 text-primary-foreground' />
						</div>
						<span className='text-2xl font-semibold'>NomorSurat</span>
					</div>
				</div>

				<Card className='p-8 border-border bg-card'>
					<div className='text-center mb-8'>
						<h1 className='text-3xl mb-2'>Selamat Datang Kembali</h1>
						<p className='text-muted-foreground'>
							Masuk ke akun Anda untuk melanjutkan
						</p>
					</div>

					<Form action={formAction} className='space-y-6'>
						<div className='space-y-2'>
							<Label htmlFor='email'>Email</Label>
							<Input
								id='email'
								name='email'
								type='email'
								placeholder='nama@contoh.com'
								defaultValue={formState.data && formState.email}
								required
								className='bg-input-background'
							/>
						</div>

						<div className='space-y-2'>
							<div className='relative'>
								<Input
									id='password'
									name='password'
									type={showPassword ? 'text' : 'password'}
									placeholder='Masukkan password'
									defaultValue={formState.data && formState.password}
									required
									className='bg-input-background pr-10'
								/>
								<button
									type='button'
									onClick={() => setShowPassword(!showPassword)}
									className='absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground hover:cursor-pointer'
								>
									{showPassword ? (
										<EyeOff className='h-4 w-4' />
									) : (
										<Eye className='h-4 w-4' />
									)}
								</button>
							</div>
						</div>
						{error && <p className='text-red-600'>Email atau password salah</p>}
						<SubmitButton>Masuk</SubmitButton>
					</Form>

					<div className='mt-6 text-center'>
						<p className='text-sm text-muted-foreground'>
							Belum punya akun?{' '}
							<Link href='/register' className='text-primary hover:underline'>
								Daftar sekarang
							</Link>
						</p>
					</div>
				</Card>

				<div className='mt-6 text-center'>
					<Link
						href='/'
						className='text-sm text-muted-foreground hover:text-foreground'
					>
						← Kembali ke beranda
					</Link>
				</div>
			</div>
			<Toaster />
		</div>
	)
}
