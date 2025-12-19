'use client'

import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Skeleton } from '@/components/ui/skeleton'
import { Spinner } from '@/components/ui/spinner'
import { Textarea } from '@/components/ui/textarea'
import { supabase } from '@/lib/supabase'
import { Building2, MoveLeft, Upload, X } from 'lucide-react'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function Profile() {
	const [loading, setLoading] = useState(true)
	const [organization, setOrganization] = useState<any>({})
	const [logo, setLogo] = useState<any>({})
	const [modeEdit, setModeEdit] = useState(false)
	const [saveLoading, setSaveLoading] = useState(false)

	const edit = async () => {
		setSaveLoading(true)
		const { last, id, ...newOrganization } = organization
		if (logo.last.logo !== logo.logo) {
			const filename = `${new Date().toISOString()}-${organization.name}.${
				logo.file.type.split('/')[1]
			}`
			const { error: deleteError } = await supabase.storage
				.from('letter')
				.remove([`public/${organization.logo}`])
			const { data, error } = await supabase.storage
				.from('letter')
				.upload(`public/${filename}`, logo.file, {
					cacheControl: '3600',
					upsert: false,
				})
			newOrganization.logo = filename
		}
		const { error } = await supabase
			.from('organization')
			.update(newOrganization)
			.eq('id', organization.id)
		const { last: lastLogo, file, ...newLogo } = logo
		setLogo(newLogo)
		setModeEdit(false)
		setSaveLoading(false)
	}

	const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0]
		if (file) {
			const reader = new FileReader()
			reader.onloadend = () => {
				setLogo((prev: any) => ({
					...prev,
					logo: reader.result as string,
					file,
				}))
			}
			reader.readAsDataURL(file)
		}
	}

	useEffect(() => {
		const fetchData = async () => {
			const { data: userData, error: userError } = await supabase.auth.getUser()
			if (userError || !userData?.user?.id) redirect('/login')
			const { data } = await supabase
				.from('organization')
				.select('id, name, address, email, website, telephone, logo')
				.contains('user_id', [userData.user.id])
				.single()
			if (!data) redirect('/organization/create')
			const logo = supabase.storage
				.from('letter')
				.getPublicUrl(`/public/${data.logo}`).data.publicUrl
			setOrganization(data)
			setLogo({ logo })
			setLoading(false)
		}

		fetchData()
	}, [])

	return (
		<div className='relative min-h-[calc(100vh-4rem)] flex items-center justify-center px-4 py-4 md:py-12 bg-linear-to-b from-primary/5 to-background'>
			<Button
				className='absolute left-6 lg:top-4 md:top-2 top-6'
				variant='outline'
				asChild
			>
				<Link href='/dashboard'>
					<MoveLeft /> Back
				</Link>
			</Button>
			<div className='w-full max-w-3xl'>
				<Card className='p-8 border-border bg-card'>
					<div className='space-y-6'>
						<div className='text-center mb-8'>
							<div className='flex justify-center mb-4'>
								<div className='p-3 rounded-full bg-primary/10'>
									<Building2 className='h-8 w-8 text-primary' />
								</div>
							</div>
							<h2 className='text-2xl mb-2'>Profil Organisasi</h2>
						</div>

						<div className='space-y-2'>
							<Label htmlFor='logo'>Logo Organisasi</Label>
							<div
								className={`relative w-full h-32 border-2 border-border rounded-lg overflow-hidden bg-muted/30 flex justify-center items-center${
									!modeEdit && ' p-2'
								}`}
							>
								{loading ? (
									<Skeleton className='h-24 w-24 rounded-full' />
								) : modeEdit ? (
									<div className='flex items-center justify-center w-full'>
										<label
											htmlFor='logo'
											className='flex flex-col items-center justify-center w-full h-32 rounded-lg cursor-pointer hover:bg-muted/50 transition-colors'
										>
											<img
												src={logo.logo}
												alt='Logo preview'
												className='w-full h-full object-contain p-2.5'
											/>
											<Input
												id='logo'
												type='file'
												accept='image/*'
												className='hidden'
												onChange={handleLogoUpload}
											/>
										</label>
									</div>
								) : (
									<img
										src={logo.logo}
										alt='Logo'
										className='w-full h-full object-contain'
									/>
								)}
							</div>
						</div>

						<div className='space-y-2'>
							<Label htmlFor='organizationName'>Nama Organisasi</Label>
							{modeEdit ? (
								<Input
									id='organizationName'
									type='text'
									placeholder='Contoh: PT. Maju Bersama Indonesia'
									value={organization.name}
									onChange={(e) =>
										setOrganization((prev: any) => ({
											...prev,
											name: e.target.value,
										}))
									}
									className='bg-input-background'
								/>
							) : loading ? (
								<Skeleton className='h-4 w-[200px]' />
							) : (
								<p className='text-gray-600'>{organization.name}</p>
							)}
						</div>

						<div className='space-y-2'>
							<Label htmlFor='address'>Alamat Lengkap</Label>
							{modeEdit ? (
								<Textarea
									id='address'
									placeholder='Contoh: Jl. Sudirman No. 123, Jakarta Pusat 10220'
									value={organization.address}
									onChange={(e) =>
										setOrganization((prev: any) => ({
											...prev,
											address: e.target.value,
										}))
									}
									className='bg-input-background min-h-20 resize-none'
								/>
							) : loading ? (
								<Skeleton className='h-4 w-[250px]' />
							) : (
								<p className='text-gray-600'>{organization.address}</p>
							)}
						</div>

						<div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
							<div className='space-y-2'>
								<Label htmlFor='phone'>Nomor Telepon</Label>
								{modeEdit ? (
									<Input
										id='phone'
										type='tel'
										placeholder='Contoh: (021) 1234567'
										value={organization.telephone}
										onChange={(e) =>
											setOrganization((prev: any) => ({
												...prev,
												telephone: e.target.value,
											}))
										}
										className='bg-input-background'
									/>
								) : loading ? (
									<Skeleton className='h-4 w-[200px]' />
								) : (
									<p className='text-gray-600'>{organization.telephone}</p>
								)}
							</div>

							<div className='space-y-2'>
								<Label htmlFor='email'>Email</Label>
								{modeEdit ? (
									<Input
										id='email'
										type='email'
										placeholder='Contoh: info@perusahaan.com'
										value={organization.email}
										onChange={(e) =>
											setOrganization((prev: any) => ({
												...prev,
												email: e.target.value,
											}))
										}
										className='bg-input-background'
									/>
								) : loading ? (
									<Skeleton className='h-4 w-[200px]' />
								) : (
									<p className='text-gray-600'>{organization.email}</p>
								)}
							</div>
						</div>

						<div className='space-y-2'>
							<Label htmlFor='website'>Website</Label>
							{modeEdit ? (
								<Input
									id='website'
									type='url'
									placeholder='Contoh: www.perusahaan.com'
									value={organization.website}
									onChange={(e) =>
										setOrganization((prev: any) => ({
											...prev,
											website: e.target.value,
										}))
									}
									className='bg-input-background'
								/>
							) : loading ? (
								<Skeleton className='h-4 w-[200px]' />
							) : (
								<p className='text-gray-600'>{organization.website}</p>
							)}
						</div>
					</div>
					{modeEdit ? (
						<div className='flex gap-2'>
							<Button
								className='flex-1'
								onClick={() => {
									setOrganization((prev: any) => ({ ...prev.last }))
									setLogo((prev: any) => ({ ...prev.last }))
									setModeEdit(false)
								}}
							>
								Batal
							</Button>
							<Button
								className='flex-1'
								onClick={edit}
								disabled={
									!(
										organization.name.trim() !== '' &&
										organization.address.trim() !== '' &&
										organization.telephone.trim() !== '' &&
										organization.email.trim() !== '' &&
										organization.website.trim() !== '' &&
										logo.logo !== ''
									) || saveLoading
								}
							>
								{saveLoading ? (
									<>
										<Spinner /> Memproses...
									</>
								) : (
									'Simpan Profil'
								)}
							</Button>
						</div>
					) : (
						<Button
							onClick={() => {
								setOrganization((prev: any) => ({
									...prev,
									last: prev,
								}))
								setLogo((prev: any) => ({
									...prev,
									last: prev,
								}))
								setModeEdit(true)
							}}
							disabled={loading}
						>
							Edit Profil
						</Button>
					)}
				</Card>
			</div>
		</div>
	)
}
