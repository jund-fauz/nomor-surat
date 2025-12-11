'use client'

import { InputGroup, InputGroupInput, InputGroupAddon, InputGroupButton } from '@/components/ui/input-group'
import { supabase } from '@/lib/supabase'
import { FileText, SearchIcon } from 'lucide-react'
import { redirect, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function Dashboard() {
	const params = useSearchParams()
	const [organization, setOrganization] = useState({})
	
	useEffect(() => {
		const fetchData = async () => {
			const { data: userData, error: userError } = await supabase.auth.getUser()
			if (userError || !userData?.user?.id) redirect('/login')
			const { data } = await supabase
				.from('organization')
				.select()
				.contains('user_id', [userData.user.id])
			if (data?.length === 0 && !params.get('redirect_from')) redirect('/organization/create')
			setOrganization(data?.[0])
		}

		fetchData()
	}, [])

	return (
		<div>
			<nav className='bg-primary flex text-white py-3 px-2 justify-between items-center'>
				<div className='flex gap-1'>
					<FileText className='h-6 w-6 text-primary-foreground' />
					<h1>NomorSurat</h1>
				</div>
				<div>
					<InputGroup>
						<InputGroupInput placeholder='Search...' className='placeholder:text-white' />
						<InputGroupAddon>
							<SearchIcon color='white' />
						</InputGroupAddon>
						<InputGroupAddon align='inline-end'>
							<InputGroupButton className='text-white'>Search</InputGroupButton>
						</InputGroupAddon>
					</InputGroup>
				</div>
			</nav>
		</div>
	)
}
