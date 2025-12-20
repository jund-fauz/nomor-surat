import { Suspense } from 'react'
import { DashboardContent } from '@/components/DashboardContent'

function DashboardSkeleton() {
	return <div>Loading...</div>
}

export default function Dashboard() {
	return (
		<Suspense fallback={<DashboardSkeleton />}>
			<DashboardContent />
		</Suspense>
	)
}
