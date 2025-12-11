import { useFormStatus } from 'react-dom'
import { Button } from './ui/button'
import { Spinner } from './ui/spinner'
import { ReactNode } from 'react'

export function SubmitButton({ children, disabled }: { children: ReactNode, disabled: boolean }) {
	const { pending } = useFormStatus()

	return (
		<Button
			type='submit'
			disabled={pending || disabled}
			className='w-full py-3 rounded-lg text-white transition-all hover:opacity-90 hover:cursor-pointer'
			size='lg'
		>
			{pending ? (
				<>
					<Spinner /> Processing...
				</>
			) : (
				children
			)}
		</Button>
	)
}
