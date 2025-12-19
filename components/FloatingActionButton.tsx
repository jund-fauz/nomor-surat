import { Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { MouseEventHandler } from 'react'

export function FloatingActionButton({
	onClick,
	disabled
}: {
	onClick: MouseEventHandler<HTMLButtonElement>
	disabled: boolean
}) {
	return (
		<Button
			size='icon'
			className='fixed bottom-7 right-7 h-14 w-14 rounded-full shadow-lg'
			disabled={disabled}
			aria-label='Add new item'
			onClick={onClick}
		>
			<Plus />
		</Button>
	)
}
