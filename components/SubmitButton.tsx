import { useFormStatus } from 'react-dom'
import { Button } from './ui/button'
import { Spinner } from './ui/spinner'
import { ReactNode } from 'react'

export function SubmitButton({
	children,
	disabled = false,
	notWFull = false,
}: {
	children: ReactNode
	disabled?: boolean
	notWFull?: boolean
}) {
	const { pending } = useFormStatus()

	return (
		<Button
			type='submit'
			disabled={pending || disabled}
			className={`${
				!notWFull && 'w-full '
			}py-3 rounded-lg text-white transition-all hover:opacity-90 hover:cursor-pointer`}
			{...(!notWFull && { size: 'lg' })}
		>
			{pending ? (
				<>
					<Spinner /> Memproses...
				</>
			) : (
				children
			)}
		</Button>
	)
}
