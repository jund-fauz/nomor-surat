'use client'

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { supabase } from "@/lib/supabase"
import { FileText, Check, Building2, FileType, Briefcase, Trash2, Plus, ChevronRight, Hash } from "lucide-react"
import { redirect } from "next/navigation"
import { useState } from "react"

interface Position {
	id: string
	name: string
	code: string
}

interface LetterType {
	id: string
	name: string
	code: string
}

export default function CreateOrganization() {
	const [currentStep, setCurrentStep] = useState(1)
	const totalSteps = 4

	const [organizationName, setOrganizationName] = useState('')
	const [letterFormat, setLetterFormat] = useState('')
	const [positions, setPositions] = useState<Position[]>([
		{ id: '1', name: '', code: '' },
	])
	const [letterTypes, setLetterTypes] = useState<LetterType[]>([
		{ id: '1', name: '', code: '' },
	])

	const addPosition = () => {
		setPositions([
			...positions,
			{ id: Date.now().toString(), name: '', code: '' },
		])
	}

	const removePosition = (id: string) => {
		if (positions.length > 1) {
			setPositions(positions.filter((pos) => pos.id !== id))
		}
	}

	const updatePosition = (
		id: string,
		field: 'name' | 'code',
		value: string
	) => {
		setPositions(
			positions.map((pos) => (pos.id === id ? { ...pos, [field]: value } : pos))
		)
	}

	const addLetterType = () => {
		setLetterTypes([
			...letterTypes,
			{ id: Date.now().toString(), name: '', code: '' },
		])
	}

	const removeLetterType = (id: string) => {
		if (letterTypes.length > 1) {
			setLetterTypes(letterTypes.filter((type) => type.id !== id))
		}
	}

	const updateLetterType = (
		id: string,
		field: 'name' | 'code',
		value: string
	) => {
		setLetterTypes(
			letterTypes.map((type) =>
				type.id === id ? { ...type, [field]: value } : type
			)
		)
	}

	const isStepValid = () => {
		switch (currentStep) {
			case 1:
				return organizationName.trim().length > 0
			case 2:
				return letterFormat.trim().length > 0
			case 3:
				return positions.every((pos) => pos.name.trim() && pos.code.trim())
			case 4:
				return letterTypes.every((type) => type.name.trim() && type.code.trim())
			default:
				return false
		}
	}

	const handleNext = async () => {
		if (currentStep < totalSteps) {
			setCurrentStep(currentStep + 1)
		} else {
			console.log('Setup completed:', {
				organizationName,
				letterFormat,
				positions,
				letterTypes,
			})
            const { error } = await supabase.from('organization').insert({
                name: organizationName,
                user_id: [(await supabase.auth.getUser()).data.user?.id],
                format: letterFormat,
                letter_types: letterTypes.map(letterType => letterType.name),
                letter_types_short: letterTypes.map(letterType => letterType.code),
                positions: positions.map(letterType => letterType.name),
                positions_short: positions.map(letterType => letterType.code),
            })
			if (!error) redirect('/dashboard?redirect_from=/organization/create')
		}
	}

	const handleBack = () => {
		if (currentStep > 1) {
			setCurrentStep(currentStep - 1)
		}
	}

	return (
		<div className='min-h-[calc(100vh-4rem)] flex items-center justify-center px-4 py-12 bg-linear-to-b from-primary/5 to-background'>
			<div className='w-full max-w-3xl'>
				<div className='flex justify-center mb-8'>
					<div className='flex items-center gap-2'>
						<div className='flex h-12 w-12 items-center justify-center rounded-lg bg-primary'>
							<FileText className='h-7 w-7 text-primary-foreground' />
						</div>
						<span className='text-2xl font-semibold'>SuratKu</span>
					</div>
				</div>

				<div className='mb-8'>
					<div className='flex items-center justify-between'>
						{[1, 2, 3, 4].map((step) => (
							<div key={step} className='flex items-center flex-1'>
								<div className='flex flex-col items-center flex-1'>
									<div
										className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${
											step < currentStep
												? 'bg-primary text-primary-foreground'
												: step === currentStep
												? 'bg-primary text-primary-foreground ring-4 ring-primary/20'
												: 'bg-muted text-muted-foreground'
										}`}
									>
										{step < currentStep ? (
											<Check className='h-5 w-5' />
										) : (
											<span>{step}</span>
										)}
									</div>
									<div
										className={`mt-2 text-xs text-center ${
											step === currentStep
												? 'text-foreground'
												: 'text-muted-foreground'
										}`}
									>
										{step === 1 && 'Organisasi'}
										{step === 2 && 'Format Surat'}
										{step === 3 && 'Jabatan'}
										{step === 4 && 'Tipe Surat'}
									</div>
								</div>
								{step < 4 && (
									<div
										className={`h-0.5 flex-1 mx-2 transition-colors ${
											step < currentStep ? 'bg-primary' : 'bg-muted'
										}`}
									/>
								)}
							</div>
						))}
					</div>
				</div>

				<Card className='p-8 border-border bg-card'>
					{currentStep === 1 && (
						<div className='space-y-6'>
							<div className='text-center mb-8'>
								<div className='flex justify-center mb-4'>
									<div className='p-3 rounded-full bg-primary/10'>
										<Building2 className='h-8 w-8 text-primary' />
									</div>
								</div>
								<h2 className='text-2xl mb-2'>Informasi Organisasi</h2>
								<p className='text-muted-foreground'>
									Masukkan nama organisasi atau perusahaan Anda
								</p>
							</div>

							<div className='space-y-2'>
								<Label htmlFor='organizationName'>Nama Organisasi</Label>
								<Input
									id='organizationName'
									type='text'
									placeholder='Contoh: PT. Maju Bersama Indonesia'
									value={organizationName}
									onChange={(e) => setOrganizationName(e.target.value)}
									className='bg-input-background'
								/>
								<p className='text-xs text-muted-foreground'>
									Nama ini akan muncul di header surat resmi Anda
								</p>
							</div>
						</div>
					)}

					{currentStep === 2 && (
						<div className='space-y-6'>
							<div className='text-center mb-8'>
								<div className='flex justify-center mb-4'>
									<div className='p-3 rounded-full bg-primary/10'>
										<FileType className='h-8 w-8 text-primary' />
									</div>
								</div>
								<h2 className='text-2xl mb-2'>Format Penomoran Surat</h2>
								<p className='text-muted-foreground'>
									Tentukan format penomoran yang akan digunakan
								</p>
							</div>

							<div className='space-y-4'>
								<div className='space-y-2'>
									<Label htmlFor='letterFormat'>Format Nomor Surat</Label>
									<Input
										id='letterFormat'
										type='text'
										placeholder='Contoh: [NOMOR]/[KODE-TIPE]/[KODE-JABATAN]/[BULAN]/[TAHUN]'
										value={letterFormat}
										onChange={(e) => setLetterFormat(e.target.value)}
										className='bg-input-background'
									/>
									<p className='text-xs text-muted-foreground'>
										Gunakan placeholder: [NOMOR], [KODE-TIPE], [KODE-JABATAN],
										[BULAN], [TAHUN]
									</p>
								</div>

								<div className='p-4 rounded-lg bg-muted/50 space-y-2'>
									<p className='text-sm'>Contoh format yang umum digunakan:</p>
									<div className='space-y-1'>
										<button
											type='button'
											onClick={() =>
												setLetterFormat(
													'[NOMOR]/[KODE-TIPE]/[KODE-JABATAN]/[BULAN]/[TAHUN]'
												)
											}
											className='hover:cursor-pointer block w-full text-left text-xs px-3 py-2 rounded bg-background hover:bg-accent transition-colors'
										>
											[NOMOR]/[KODE-TIPE]/[KODE-JABATAN]/[BULAN]/[TAHUN]
										</button>
										<button
											type='button'
											onClick={() =>
												setLetterFormat(
													'[NOMOR]/[KODE-JABATAN]-[KODE-TIPE]/[TAHUN]'
												)
											}
											className='hover:cursor-pointer block w-full text-left text-xs px-3 py-2 rounded bg-background hover:bg-accent transition-colors'
										>
											[NOMOR]/[KODE-JABATAN]-[KODE-TIPE]/[TAHUN]
										</button>
										<button
											type='button'
											onClick={() =>
												setLetterFormat(
													'[KODE-TIPE]/[NOMOR]/[KODE-JABATAN]/[BULAN]/[TAHUN]'
												)
											}
											className='hover:cursor-pointer block w-full text-left text-xs px-3 py-2 rounded bg-background hover:bg-accent transition-colors'
										>
											[KODE-TIPE]/[NOMOR]/[KODE-JABATAN]/[BULAN]/[TAHUN]
										</button>
									</div>
								</div>

								{letterFormat && (
									<div className='p-4 rounded-lg bg-primary/5 border border-primary/20'>
										<p className='text-xs text-muted-foreground mb-1'>
											Preview contoh:
										</p>
										<p className='font-mono text-sm'>
											{letterFormat
												.replace('[NOMOR]', '001')
												.replace('[KODE-TIPE]', 'SK')
												.replace('[KODE-JABATAN]', 'DIR')
												.replace('[BULAN]', 'XII')
												.replace('[TAHUN]', '2024')}
										</p>
									</div>
								)}
							</div>
						</div>
					)}

					{currentStep === 3 && (
						<div className='space-y-6'>
							<div className='text-center mb-8'>
								<div className='flex justify-center mb-4'>
									<div className='p-3 rounded-full bg-primary/10'>
										<Briefcase className='h-8 w-8 text-primary' />
									</div>
								</div>
								<h2 className='text-2xl mb-2'>Jabatan & Kode</h2>
								<p className='text-muted-foreground'>
									Tambahkan jabatan dan kode jabatan yang akan digunakan
								</p>
							</div>

							<div className='space-y-4 max-h-96 overflow-y-auto pr-2'>
								{positions.map((position, index) => (
									<div
										key={position.id}
										className='p-4 rounded-lg bg-muted/30 space-y-3'
									>
										<div className='flex items-center justify-between'>
											<span className='text-sm'>Jabatan {index + 1}</span>
											{positions.length > 1 && (
												<Button
													type='button'
													variant='ghost'
													size='sm'
													onClick={() => removePosition(position.id)}
													className='h-8 w-8 p-0 text-destructive hover:text-destructive'
												>
													<Trash2 className='h-4 w-4' />
												</Button>
											)}
										</div>
										<div className='grid grid-cols-2 gap-3'>
											<div className='space-y-1'>
												<Label
													htmlFor={`position-name-${position.id}`}
													className='text-xs'
												>
													Nama Jabatan
												</Label>
												<Input
													id={`position-name-${position.id}`}
													type='text'
													placeholder='Contoh: Direktur Utama'
													value={position.name}
													onChange={(e) =>
														updatePosition(position.id, 'name', e.target.value)
													}
													className='bg-input-background'
												/>
											</div>
											<div className='space-y-1'>
												<Label
													htmlFor={`position-code-${position.id}`}
													className='text-xs'
												>
													Kode Jabatan
												</Label>
												<Input
													id={`position-code-${position.id}`}
													type='text'
													placeholder='Contoh: DIR'
													value={position.code}
													onChange={(e) =>
														updatePosition(
															position.id,
															'code',
															e.target.value.toUpperCase()
														)
													}
													className='bg-input-background'
												/>
											</div>
										</div>
									</div>
								))}
							</div>

							<Button
								type='button'
								variant='outline'
								onClick={addPosition}
								className='w-full'
							>
								<Plus className='h-4 w-4 mr-2' />
								Tambah Jabatan
							</Button>

							<div className='p-4 rounded-lg bg-muted/50'>
								<p className='text-xs text-muted-foreground mb-2'>
									Contoh kode jabatan:
								</p>
								<div className='grid grid-cols-2 gap-2 text-xs'>
									<div>• DIR - Direktur</div>
									<div>• MGR - Manager</div>
									<div>• SPV - Supervisor</div>
									<div>• ADM - Admin</div>
								</div>
							</div>
						</div>
					)}

					{currentStep === 4 && (
						<div className='space-y-6'>
							<div className='text-center mb-8'>
								<div className='flex justify-center mb-4'>
									<div className='p-3 rounded-full bg-primary/10'>
										<Hash className='h-8 w-8 text-primary' />
									</div>
								</div>
								<h2 className='text-2xl mb-2'>Tipe Surat & Kode</h2>
								<p className='text-muted-foreground'>
									Tentukan jenis-jenis surat dan kodenya
								</p>
							</div>

							<div className='space-y-4 max-h-96 overflow-y-auto pr-2'>
								{letterTypes.map((type, index) => (
									<div
										key={type.id}
										className='p-4 rounded-lg bg-muted/30 space-y-3'
									>
										<div className='flex items-center justify-between'>
											<span className='text-sm'>Tipe Surat {index + 1}</span>
											{letterTypes.length > 1 && (
												<Button
													type='button'
													variant='ghost'
													size='sm'
													onClick={() => removeLetterType(type.id)}
													className='h-8 w-8 p-0 text-destructive hover:text-destructive'
												>
													<Trash2 className='h-4 w-4' />
												</Button>
											)}
										</div>
										<div className='grid grid-cols-2 gap-3'>
											<div className='space-y-1'>
												<Label
													htmlFor={`type-name-${type.id}`}
													className='text-xs'
												>
													Nama Tipe Surat
												</Label>
												<Input
													id={`type-name-${type.id}`}
													type='text'
													placeholder='Contoh: Surat Keputusan'
													value={type.name}
													onChange={(e) =>
														updateLetterType(type.id, 'name', e.target.value)
													}
													className='bg-input-background'
												/>
											</div>
											<div className='space-y-1'>
												<Label
													htmlFor={`type-code-${type.id}`}
													className='text-xs'
												>
													Kode Tipe
												</Label>
												<Input
													id={`type-code-${type.id}`}
													type='text'
													placeholder='Contoh: SK'
													value={type.code}
													onChange={(e) =>
														updateLetterType(
															type.id,
															'code',
															e.target.value.toUpperCase()
														)
													}
													className='bg-input-background'
												/>
											</div>
										</div>
									</div>
								))}
							</div>

							<Button
								type='button'
								variant='outline'
								onClick={addLetterType}
								className='w-full'
							>
								<Plus className='h-4 w-4 mr-2' />
								Tambah Tipe Surat
							</Button>

							<div className='p-4 rounded-lg bg-muted/50'>
								<p className='text-xs text-muted-foreground mb-2'>
									Contoh tipe surat:
								</p>
								<div className='grid grid-cols-2 gap-2 text-xs'>
									<div>• SK - Surat Keputusan</div>
									<div>• ST - Surat Tugas</div>
									<div>• SP - Surat Perintah</div>
									<div>• SE - Surat Edaran</div>
									<div>• UD - Undangan</div>
									<div>• SPK - Surat Perjanjian</div>
								</div>
							</div>
						</div>
					)}

					<div className='mt-8 flex items-center justify-between'>
						<Button
							type='button'
							variant='outline'
							onClick={handleBack}
							disabled={currentStep === 1}
						>
							Kembali
						</Button>

						<div className='text-sm text-muted-foreground'>
							Step {currentStep} dari {totalSteps}
						</div>

						<Button
							type='button'
							onClick={handleNext}
							disabled={!isStepValid()}
							className='group'
						>
							{currentStep === totalSteps ? (
								<>
									Selesai
									<Check className='ml-2 h-4 w-4' />
								</>
							) : (
								<>
									Next
									<ChevronRight className='ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform' />
								</>
							)}
						</Button>
					</div>
				</Card>

			</div>
		</div>
	)
}
