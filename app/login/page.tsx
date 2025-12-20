import { Suspense } from 'react'
import { LoginContent } from '@/components/LoginContent'

function LoginSkeleton() {
	return <div>Loading...</div>
}

export default function Login() {
	return (
		<Suspense fallback={<LoginSkeleton />}>
			<LoginContent />
		</Suspense>
	)
}
