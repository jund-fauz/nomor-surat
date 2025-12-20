'use client'

import { FloatingActionButton } from '@/components/FloatingActionButton'
import { Button } from '@/components/ui/button'
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from '@/components/ui/dialog'
import {
	Empty,
	EmptyHeader,
	EmptyMedia,
	EmptyTitle,
	EmptyDescription,
	EmptyContent,
} from '@/components/ui/empty'
import { supabase } from '@/lib/supabase'
import { Label } from '@/components/ui/label'
import {
	EllipsisVertical,
	FileText,
	FolderX,
	SquarePen,
	Trash,
} from 'lucide-react'
import Form from 'next/form'
import { redirect, useSearchParams } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { toRoman } from '@/lib/toRoman'
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table'
import { SubmitButton } from '@/components/SubmitButton'
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
} from '@/components/ui/alert-dialog'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import Link from 'next/link'
import {
	Pagination,
	PaginationContent,
	PaginationItem,
	PaginationPrevious,
	PaginationLink,
	PaginationEllipsis,
	PaginationNext,
} from '@/components/ui/pagination'
import { Skeleton } from '@/components/ui/skeleton'

export function DashboardContent() {
	const params = useSearchParams()
	const [organization, setOrganization] = useState<any>({})
	const [letterNumbers, setLetterNumbers] = useState<any>(null)
	const [open, setOpen] = useState(false)
	const [loading, setLoading] = useState(true)
	const [logoLoading, setLogoLoading] = useState(true)
	const [letterNumber, setLetterNumber] = useState<any>({})
	const [deleteOpen, setDeleteOpen] = useState(false)
	const [pagination, setPagination] = useState(false)
	const [page, setPage] = useState(1)
	const [totalPages, setTotalPages] = useState(1)
	const initialized = useRef(false)
	const navRef = useRef<HTMLElement>(null)

	const addLetter = async (formData: FormData) => {
		const { data } = await supabase
			.from('letter_number')
			.select('number')
			.eq('organization_id', organization.id)
			.order('number', { ascending: false })
			.limit(1)
			.single()
		const date = new Date()
		const { data: letterNumber } = await supabase
			.from('letter_number')
			.insert({
				organization_id: organization.id,
				letter_number: organization.format
					.replace('[NOMOR]', data ? data.number + 1 : 1)
					.replace('[KODE-TIPE]', formData.get('letter_type'))
					.replace('[KODE-JABATAN]', formData.get('position'))
					.replace('[BULAN]', toRoman(date.getMonth() + 1))
					.replace('[TAHUN]', date.getFullYear()),
				number: `${data ? data.number + 1 : 1}`,
				letter_type:
					organization.letter_types[
						organization.letter_types_short.indexOf(formData.get('letter_type'))
					],
				position:
					organization.positions[
						organization.positions_short.indexOf(formData.get('position'))
					],
				description: formData.get('description'),
				created_at: date,
			})
			.select()
			.single()
		if (letterNumbers.length < 10)
			setLetterNumbers((prev: any) => [...prev, letterNumber])
		else {
			setPagination(true)
			setTotalPages(page + 1)
		}
		setOpen(false)
	}

	const editLetter = async (formData: FormData) => {
		const date = new Date(letterNumber.created_at)
		const { data } = await supabase
			.from('letter_number')
			.update({
				letter_number: organization.format
					.replace('[NOMOR]', letterNumber.number)
					.replace('[KODE-TIPE]', formData.get('letter_type'))
					.replace('[KODE-JABATAN]', formData.get('position'))
					.replace('[BULAN]', toRoman(date.getMonth() + 1))
					.replace('[TAHUN]', date.getFullYear()),
				letter_type:
					organization.letter_types[
						organization.letter_types_short.indexOf(formData.get('letter_type'))
					],
				position:
					organization.positions[
						organization.positions_short.indexOf(formData.get('position'))
					],
				description: formData.get('description'),
			})
			.eq('id', letterNumber.id)
			.select()
			.single()
		setLetterNumbers((prev: any) =>
			prev.map((letter: any) => (letter.id === letterNumber.id ? data : letter))
		)
		setOpen(false)
	}

	const deleteLetter = async () => {
		const response = await supabase
			.from('letter_number')
			.delete()
			.eq('id', letterNumber.id)
		const needEditLetters = letterNumbers.filter(
			(letter: any) => letter.number > letterNumber.number
		)
		needEditLetters.forEach(async (letter: any) => {
			const { error } = await supabase
				.from('letter_number')
				.update({
					letter_number: organization.format
						.replace('[NOMOR]', letter.number - 1)
						.replace(
							'[KODE-TIPE]',
							organization.letter_types_short[
								organization.letter_types.indexOf(letter.letter_type)
							]
						)
						.replace(
							'[KODE-JABATAN]',
							organization.positions_short[
								organization.positions.indexOf(letter.position)
							]
						)
						.replace(
							'[BULAN]',
							toRoman(new Date(letter.created_at).getMonth() + 1)
						)
						.replace('[TAHUN]', new Date(letter.created_at).getFullYear()),
					number: letter.number - 1,
				})
				.eq('id', letter.id)
		})
		if (letterNumbers.length === 10) {
			const at = page * 10 - 1
			const { data } = await supabase
				.from('letter_number')
				.select()
				.eq('organization_id', organization.id)
				.order('number')
				.range(at, Number.MAX_SAFE_INTEGER)
			if ((data?.length as number) > 0) {
				data?.forEach(async (letter: any) => {
					const { error } = await supabase
						.from('letter_number')
						.update({
							letter_number: organization.format
								.replace('[NOMOR]', letter.number - 1)
								.replace(
									'[KODE-TIPE]',
									organization.letter_types_short[
										organization.letter_types.indexOf(letter.letter_type)
									]
								)
								.replace(
									'[KODE-JABATAN]',
									organization.positions_short[
										organization.positions.indexOf(letter.position)
									]
								)
								.replace(
									'[BULAN]',
									toRoman(new Date(letter.created_at).getMonth() + 1)
								)
								.replace('[TAHUN]', new Date(letter.created_at).getFullYear()),
							number: letter.number - 1,
						})
						.eq('id', letter.id)
				})
				setLetterNumbers((prev: any) => [...prev, data?.[0]])
				if ((data?.length as number) <= 1) setPagination(false)
			}
		}
		setLetterNumbers((prev: any) =>
			prev
				.filter((letter: any) => letter.id !== letterNumber.id)
				.map((letter: any) =>
					letter.number > letterNumber.number
						? {
								...letter,
								letter_number: organization.format
									.replace('[NOMOR]', letter.number - 1)
									.replace(
										'[KODE-TIPE]',
										organization.letter_types_short[
											organization.letter_types.indexOf(letter.letter_type)
										]
									)
									.replace(
										'[KODE-JABATAN]',
										organization.positions_short[
											organization.positions.indexOf(letter.position)
										]
									)
									.replace(
										'[BULAN]',
										toRoman(new Date(letter.created_at).getMonth() + 1)
									)
									.replace(
										'[TAHUN]',
										new Date(letter.created_at).getFullYear()
									),
								number: letter.number - 1,
						  }
						: letter
				)
		)
	}

	const logout = async () => {
		const { error } = await supabase.auth.signOut()
		if (!error) redirect('/login')
	}

	useEffect(() => {
		const fetchData = async () => {
			const { data: userData, error: userError } = await supabase.auth.getUser()
			if (userError || !userData?.user?.id) redirect('/login')
			const { data } = await supabase
				.from('organization')
				.select(
					'id, logo, letter_types, letter_types_short, positions, positions_short, format'
				)
				.contains('user_id', [userData.user.id])
				.single()
			if (!data && !params.get('redirect_from'))
				redirect('/organization/create')
			const logo = supabase.storage
				.from('letter')
				.getPublicUrl(`/public/${data?.logo}`).data.publicUrl
			setOrganization({ ...data, logo })
			const { data: lettersData, count } = await supabase
				.from('letter_number')
				.select(
					'id, letter_number, position, letter_type, description, number, created_at',
					{
						count: 'exact',
					}
				)
				.eq('organization_id', data?.id)
				.order('number')
				.limit(10)
			if (count && count > 10) {
				setPagination(true)
				setTotalPages(Math.ceil(count / 10))
			}
			setLetterNumbers(lettersData)
		}

		fetchData()
	}, [])

	useEffect(() => {
		const fetchData = async () => {
			setLoading(true)
			const start = (page - 1) * 10
			const { data } = await supabase
				.from('letter_number')
				.select(
					'id, letter_number, position, letter_type, description, number, created_at'
				)
				.eq('organization_id', organization.id)
				.order('number')
				.range(start, start + 9)
			setLetterNumbers(data)
		}

		if (initialized.current) fetchData()
		else initialized.current = true
	}, [page])

	useEffect(() => setLoading(!letterNumbers), [letterNumbers])

	useEffect(() => {
		setTimeout(() => setLogoLoading(!organization), 1000)
	}, [organization])

	return (
		<div>
			<nav
				className='bg-primary flex text-white p-3 justify-between items-center'
				ref={navRef}
			>
				<div className='flex gap-1'>
					<FileText className='h-6 w-6 text-primary-foreground' />
					<h1>NomorSurat</h1>
				</div>
				<div>
					<DropdownMenu>
						<DropdownMenuTrigger asChild disabled={logoLoading}>
							{logoLoading ? (
								<Skeleton className='h-6 w-6 rounded-full' />
							) : (
								<img
									src={organization.logo}
									width={25}
									className='bg-white p-0.5 rounded-full hover:cursor-pointer'
								/>
							)}
						</DropdownMenuTrigger>
						<DropdownMenuContent className='w-56' align='start'>
							<DropdownMenuLabel>Akunku</DropdownMenuLabel>
							<DropdownMenuItem className='hover:cursor-pointer' asChild>
								<Link href='/profile'>Profil</Link>
							</DropdownMenuItem>
							<DropdownMenuSeparator />
							<DropdownMenuItem
								className='hover:cursor-pointer'
								onClick={logout}
							>
								Keluar
							</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>
				</div>
			</nav>
			{letterNumbers && letterNumbers.length === 0 && !loading ? (
				<Empty>
					<EmptyHeader>
						<EmptyMedia variant='icon'>
							<FolderX />
						</EmptyMedia>
						<EmptyTitle>Tidak ada surat</EmptyTitle>
						<EmptyDescription>
							Kamu belum membuat surat satupun. Mulai dengan membuat surat baru.
						</EmptyDescription>
					</EmptyHeader>
					<EmptyContent>
						<div className='flex gap-2'>
							<Button onClick={() => setOpen(true)}>Buat Surat</Button>
						</div>
					</EmptyContent>
				</Empty>
			) : (
				<div className={`px-2 flex flex-col justify-between h-[541px]`}>
					<Table>
						<TableHeader>
							<TableRow>
								<TableHead>Nomor Surat</TableHead>
								<TableHead>Tipe Surat</TableHead>
								<TableHead>Jabatan</TableHead>
								<TableHead>Perihal</TableHead>
								<TableHead>Aksi</TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							{loading
								? [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((number: number) => (
										<TableRow key={number}>
											<TableCell>
												<Skeleton className='h-4 w-[150px]' />
											</TableCell>
											<TableCell>
												<Skeleton className='h-4 w-[150px]' />
											</TableCell>
											<TableCell>
												<Skeleton className='h-4 w-[150px]' />
											</TableCell>
											<TableCell>
												<Skeleton className='h-4 w-[150px]' />
											</TableCell>
											<TableCell>
												<EllipsisVertical />
											</TableCell>
										</TableRow>
								  ))
								: letterNumbers.map((letterNumber: any, index: number) => (
										<TableRow key={index}>
											<TableCell className='font-medium'>
												{letterNumber.letter_number}
											</TableCell>
											<TableCell>{letterNumber.letter_type}</TableCell>
											<TableCell>{letterNumber.position}</TableCell>
											<TableCell>
												{letterNumber.description.length < 15
													? letterNumber.description
													: `${letterNumber.description.slice(0, 15)}...`}
											</TableCell>
											<TableCell>
												<DropdownMenu>
													<DropdownMenuTrigger asChild>
														<EllipsisVertical cursor='pointer' />
													</DropdownMenuTrigger>
													<DropdownMenuContent className='w-56' align='start'>
														<DropdownMenuItem
															asChild
															className='hover:cursor-pointer'
														>
															<Link
																href={`/dashboard/editor/${letterNumber.id}`}
																target='_blank'
															>
																<FileText /> Ubah Surat
															</Link>
														</DropdownMenuItem>
														<DropdownMenuItem
															className='hover:cursor-pointer'
															onClick={() => {
																setLetterNumber(letterNumber)
																setOpen(true)
															}}
														>
															<SquarePen /> Edit
														</DropdownMenuItem>
														<DropdownMenuItem
															className='hover:cursor-pointer'
															variant='destructive'
															onClick={() => {
																setLetterNumber(letterNumber)
																setDeleteOpen(true)
															}}
														>
															<Trash /> Hapus
														</DropdownMenuItem>
													</DropdownMenuContent>
												</DropdownMenu>
											</TableCell>
										</TableRow>
								  ))}
						</TableBody>
					</Table>
					{pagination && (
						<Pagination>
							<PaginationContent className='select-none'>
								{page > 1 && (
									<>
										<PaginationItem>
											<PaginationPrevious
												onClick={() => setPage((prev) => prev - 1)}
											/>
										</PaginationItem>
										<PaginationItem>
											<PaginationLink
												onClick={() => setPage((prev) => prev - 1)}
											>
												{page - 1}
											</PaginationLink>
										</PaginationItem>
									</>
								)}
								<PaginationItem>
									<PaginationLink isActive>{page}</PaginationLink>
								</PaginationItem>
								{totalPages > page && (
									<>
										<PaginationItem>
											<PaginationLink
												onClick={() => setPage((prev) => prev + 1)}
											>
												{page + 1}
											</PaginationLink>
										</PaginationItem>
										<PaginationItem>
											<PaginationNext
												onClick={() => setPage((prev) => prev + 1)}
											/>
										</PaginationItem>
									</>
								)}
								{totalPages > page + 1 && (
									<PaginationItem>
										<PaginationEllipsis />
									</PaginationItem>
								)}
							</PaginationContent>
						</Pagination>
					)}
				</div>
			)}
			<FloatingActionButton disabled={loading} onClick={() => setOpen(true)} />
			<Dialog
				open={open}
				onOpenChange={(state) => {
					if (!state) setLetterNumber({})
					setOpen(state)
				}}
			>
				<DialogContent className='sm:max-w-[425px]'>
					<DialogHeader>
						<DialogTitle>
							{Object.keys(letterNumber).length !== 0 ? 'Edit' : 'Tambah'} Surat
						</DialogTitle>
						<DialogDescription>
							Klik 'simpan' ketika kamu sudah selesai.
						</DialogDescription>
					</DialogHeader>
					<Form
						action={
							Object.keys(letterNumber).length !== 0 ? editLetter : addLetter
						}
					>
						<div className='grid gap-4'>
							<div className='grid gap-3'>
								<Label htmlFor='letter_type'>Tipe Surat</Label>
								<Select
									name='letter_type'
									required
									defaultValue={
										organization &&
										organization.letter_types_short !== undefined &&
										organization.letter_types_short[
											organization.letter_types.indexOf(
												letterNumber.letter_type
											)
										]
									}
								>
									<SelectTrigger className='w-full'>
										<SelectValue placeholder='Pilih tipe surat' />
									</SelectTrigger>
									<SelectContent>
										<SelectGroup>
											<SelectLabel>Tipe Surat</SelectLabel>
											{organization &&
												organization.letter_types !== undefined &&
												organization.letter_types.map(
													(letterType: string, index: number) => (
														<SelectItem
															value={organization.letter_types_short[index]}
															key={index}
														>
															{letterType}
														</SelectItem>
													)
												)}
										</SelectGroup>
									</SelectContent>
								</Select>
							</div>
							<div className='grid gap-3'>
								<Label htmlFor='position'>Jabatan</Label>
								<Select
									name='position'
									required
									defaultValue={
										organization &&
										organization.positions_short !== undefined &&
										organization.positions_short[
											organization.positions.indexOf(letterNumber.position)
										]
									}
								>
									<SelectTrigger className='w-full'>
										<SelectValue placeholder='Pilih jabatan' />
									</SelectTrigger>
									<SelectContent>
										<SelectGroup>
											<SelectLabel>Jabatan</SelectLabel>
											{organization &&
												organization.positions !== undefined &&
												organization.positions.map(
													(letterType: string, index: number) => (
														<SelectItem
															value={organization.positions_short[index]}
															key={index}
														>
															{letterType}
														</SelectItem>
													)
												)}
										</SelectGroup>
									</SelectContent>
								</Select>
							</div>
							<div className='grid gap-3'>
								<Label htmlFor='description'>Perihal</Label>
								<Textarea
									id='description'
									name='description'
									defaultValue={letterNumber.description}
									className='resize-none max-h-50'
								/>
							</div>
						</div>
						<DialogFooter className='mt-3'>
							<DialogClose asChild>
								<Button variant='outline'>Batal</Button>
							</DialogClose>
							<SubmitButton notWFull>Simpan</SubmitButton>
						</DialogFooter>
					</Form>
				</DialogContent>
			</Dialog>
			<AlertDialog
				open={deleteOpen}
				onOpenChange={(state) => {
					setLetterNumber({})
					setDeleteOpen(state)
				}}
			>
				<AlertDialogContent>
					<AlertDialogHeader>
						<AlertDialogTitle>
							Apa kamu yakin ingin menghapus surat?
						</AlertDialogTitle>
						<AlertDialogDescription>
							Aksi ini tidak bisa di-undo. Ini akan menghapus suratmu secara
							permanen dari server kami.
						</AlertDialogDescription>
					</AlertDialogHeader>
					<AlertDialogFooter>
						<AlertDialogCancel>Cancel</AlertDialogCancel>
						<AlertDialogAction onClick={deleteLetter}>
							Continue
						</AlertDialogAction>
					</AlertDialogFooter>
				</AlertDialogContent>
			</AlertDialog>
		</div>
	)
}
