'use client'

import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card } from '@/components/ui/card'
import { FileText, Eye, EyeOff, CheckCircle2 } from 'lucide-react'
import Link from 'next/link'
import Form from 'next/form'
import { Checkbox } from '@/components/ui/checkbox'
import { useFormState } from 'react-dom'
import { register } from './action'
import { redirect } from 'next/navigation'
import { SubmitButton } from '@/components/SubmitButton'

export default function Register() {
	const [showPassword, setShowPassword] = useState(false)
	const [showConfirmPassword, setShowConfirmPassword] = useState(false)
	const [formData, setFormData] = useState({
		password: '',
		confirmPassword: '',
		agreeTerms: false,
	})
	const [formState, formAction] = useFormState(register, { data: null, error: null })
	const [error, setError] = useState('')

	const getPasswordStrength = (password: string) => {
		let strength = 0
		if (password.length >= 8) strength++
		if (/[a-z]/.test(password) && /[A-Z]/.test(password)) strength++
		if (/[0-9]/.test(password)) strength++
		if (/[^A-Za-z0-9]/.test(password)) strength++
		return strength
	}

	const passwordStrength = getPasswordStrength(formData.password)

	useEffect(() => {
		if (formState.data) {
			if (formState.error) setError(formState.error)
			else redirect('/login?redirect_from=/register')
		}
	}, [formState])

	return (
		<div className='min-h-[calc(100vh-4rem)] flex items-center justify-center px-4 py-12'>
			<div className='w-full max-w-2xl'>
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
						<h1 className='text-3xl mb-2'>Buat Akun Baru</h1>
						<p className='text-muted-foreground'>
							Mulai kelola surat Anda dengan lebih efisien
						</p>
					</div>

					<Form action={formAction} className='space-y-6'>
						<div className='grid md:grid-cols-2 gap-6'>
							<div className='space-y-2'>
								<Label htmlFor='fullName'>Nama Lengkap</Label>
								<Input
									id='fullName'
									name='fullName'
									type='text'
									placeholder='John Doe'
									required
									className='bg-input-background'
								/>
							</div>

							<div className='space-y-2'>
								<Label htmlFor='organization'>Nama Organisasi</Label>
								<Input
									id='organization'
									name='organization'
									type='text'
									placeholder='PT. Contoh Indonesia'
									required
									className='bg-input-background'
								/>
							</div>
						</div>

						<div className='space-y-2'>
							<Label htmlFor='email'>Email</Label>
							<Input
								id='email'
								name='email'
								type='email'
								placeholder='nama@contoh.com'
								required
								className='bg-input-background'
							/>
						</div>

						<div className='space-y-2'>
							<Label htmlFor='password'>Password</Label>
							<div className='relative'>
								<Input
									id='password'
									name='password'
									type={showPassword ? 'text' : 'password'}
									placeholder='Minimal 8 karakter'
									value={formData.password}
									onChange={(e) =>
										setFormData({ ...formData, password: e.target.value })
									}
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

							{formData.password && (
								<div className='space-y-2'>
									<div className='flex gap-1'>
										{[...Array(4)].map((_, i) => (
											<div
												key={i}
												className={`h-1 flex-1 rounded-full transition-colors ${
													i < passwordStrength
														? passwordStrength === 1
															? 'bg-red-500'
															: passwordStrength === 2
															? 'bg-orange-500'
															: passwordStrength === 3
															? 'bg-yellow-500'
															: 'bg-green-500'
														: 'bg-muted'
												}`}
											/>
										))}
									</div>
									<div className='space-y-1'>
										<div className='flex items-center gap-2 text-xs'>
											<CheckCircle2
												className={`h-3 w-3 ${
													formData.password.length >= 8
														? 'text-green-500'
														: 'text-muted-foreground'
												}`}
											/>
											<span
												className={
													formData.password.length >= 8
														? 'text-foreground'
														: 'text-muted-foreground'
												}
											>
												Minimal 8 karakter
											</span>
										</div>
										<div className='flex items-center gap-2 text-xs'>
											<CheckCircle2
												className={`h-3 w-3 ${
													/[A-Z]/.test(formData.password) &&
													/[a-z]/.test(formData.password)
														? 'text-green-500'
														: 'text-muted-foreground'
												}`}
											/>
											<span
												className={
													/[A-Z]/.test(formData.password) &&
													/[a-z]/.test(formData.password)
														? 'text-foreground'
														: 'text-muted-foreground'
												}
											>
												Huruf besar dan kecil
											</span>
										</div>
										<div className='flex items-center gap-2 text-xs'>
											<CheckCircle2
												className={`h-3 w-3 ${
													/[0-9]/.test(formData.password)
														? 'text-green-500'
														: 'text-muted-foreground'
												}`}
											/>
											<span
												className={
													/[0-9]/.test(formData.password)
														? 'text-foreground'
														: 'text-muted-foreground'
												}
											>
												Mengandung angka
											</span>
										</div>
									</div>
								</div>
							)}
						</div>

						<div className='space-y-2'>
							<Label htmlFor='confirmPassword'>Konfirmasi Password</Label>
							<div className='relative'>
								<Input
									id='confirmPassword'
									name='confirmPassword'
									type={showConfirmPassword ? 'text' : 'password'}
									placeholder='Ulangi password'
									value={formData.confirmPassword}
									onChange={(e) =>
										setFormData({
											...formData,
											confirmPassword: e.target.value,
										})
									}
									required
									className='bg-input-background pr-10'
								/>
								<button
									type='button'
									onClick={() => setShowConfirmPassword(!showConfirmPassword)}
									className='absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground hover:cursor-pointer'
								>
									{showConfirmPassword ? (
										<EyeOff className='h-4 w-4' />
									) : (
										<Eye className='h-4 w-4' />
									)}
								</button>
							</div>
							{formData.confirmPassword &&
								formData.password !== formData.confirmPassword && (
									<p className='text-xs text-destructive'>
										Password tidak cocok
									</p>
								)}
						</div>

						<div className='flex items-start'>
							<Checkbox
								id='agreeTerms'
								checked={formData.agreeTerms}
								onCheckedChange={(checked: boolean) =>
									setFormData({ ...formData, agreeTerms: checked })
								}
								required
								className='h-4 w-4 rounded border-border text-primary focus:ring-primary mt-1 hover:cursor-pointer'
							/>
							<Label
								htmlFor='agreeTerms'
								className='ml-2 text-sm text-foreground hover:cursor-pointer'
							>
								Saya setuju dengan{' '}
								<Link href='#' className='text-primary hover:underline'>
									Syarat & Ketentuan
								</Link>{' '}
								dan{' '}
								<Link href='#' className='text-primary hover:underline'>
									Kebijakan Privasi
								</Link>
							</Label>
						</div>
						{error && <p className='text-red-600'>{error}</p>}
						<SubmitButton
							disabled={
								!formData.agreeTerms ||
								formData.password !== formData.confirmPassword ||
								passwordStrength < 2
							}
						>
							Daftar Sekarang
						</SubmitButton>
					</Form>

					<div className='relative my-6'>
						<div className='absolute inset-0 flex items-center'>
							<div className='w-full border-t border-border' />
						</div>
						<div className='relative flex justify-center text-sm'>
							<span className='bg-card px-2 text-muted-foreground'>atau</span>
						</div>
					</div>

					<div className='space-y-3'>
						<Button variant='outline' className='w-full' type='button'>
							<svg className='h-5 w-5 mr-2' viewBox='0 0 24 24'>
								<path
									fill='currentColor'
									d='M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z'
								/>
								<path
									fill='currentColor'
									d='M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z'
								/>
								<path
									fill='currentColor'
									d='M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z'
								/>
								<path
									fill='currentColor'
									d='M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z'
								/>
							</svg>
							Daftar dengan Google
						</Button>
					</div>

					<div className='mt-6 text-center'>
						<p className='text-sm text-muted-foreground'>
							Sudah punya akun?{' '}
							<Link href='/login' className='text-primary hover:underline'>
								Masuk di sini
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
		</div>
	)
}
