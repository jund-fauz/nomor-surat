import { Button } from '../ui/button'
import { Card } from '../ui/card'
import { Check } from 'lucide-react'

const plans = [
	{
		name: 'Starter',
		price: 'Gratis',
		period: 'selamanya',
		description: 'Untuk organisasi kecil yang baru memulai',
		features: [
			'Hingga 100 surat per bulan',
			'5 pengguna aktif',
			'Penomoran otomatis',
			'Arsip digital dasar',
			'Support via email',
			'1 GB penyimpanan',
		],
		cta: 'Mulai Gratis',
		popular: false,
	},
	{
		name: 'Professional',
		price: 'Rp 499.000',
		period: 'per bulan',
		description: 'Untuk tim yang membutuhkan fitur lebih lengkap',
		features: [
			'Surat unlimited',
			'25 pengguna aktif',
			'Semua fitur Starter',
			'Workflow & approval',
			'Template kustom',
			'Laporan & analitik',
			'Support prioritas',
			'50 GB penyimpanan',
		],
		cta: 'Coba 14 Hari Gratis',
		popular: true,
	},
	{
		name: 'Enterprise',
		price: 'Custom',
		period: 'hubungi kami',
		description: 'Untuk organisasi besar dengan kebutuhan khusus',
		features: [
			'Semua fitur Professional',
			'Pengguna unlimited',
			'Integrasi API',
			'On-premise deployment',
			'Custom development',
			'Dedicated support',
			'SLA 99.9% uptime',
			'Penyimpanan unlimited',
		],
		cta: 'Hubungi Sales',
		popular: false,
	},
]

export function Pricing() {
	return (
		<section id='harga' className='py-20 sm:py-32 bg-muted/30'>
			<div className='container mx-auto px-4 sm:px-6 lg:px-8'>
				<div className='text-center max-w-3xl mx-auto mb-16'>
					<div className='inline-block px-4 py-2 rounded-full bg-primary/10 text-primary mb-4'>
						Harga
					</div>
					<h2 className='text-3xl sm:text-4xl lg:text-5xl mb-4'>
						Paket yang Sesuai untuk Setiap Kebutuhan
					</h2>
					<p className='text-lg text-muted-foreground'>
						Pilih paket yang tepat untuk organisasi Anda. Upgrade atau downgrade
						kapan saja.
					</p>
				</div>

				<div className='grid md:grid-cols-3 gap-8 max-w-6xl mx-auto'>
					{plans.map((plan, index) => (
						<Card
							key={index}
							className={`p-8 border-border bg-card relative ${
								plan.popular ? 'ring-2 ring-primary shadow-xl scale-105' : ''
							}`}
						>
							{plan.popular && (
								<div className='absolute -top-4 left-1/2 -translate-x-1/2'>
									<div className='px-4 py-1 rounded-full bg-primary text-primary-foreground text-sm'>
										Paling Populer
									</div>
								</div>
							)}

							<div className='text-center mb-8'>
								<h3 className='text-2xl mb-2'>{plan.name}</h3>
								<p className='text-sm text-muted-foreground mb-4'>
									{plan.description}
								</p>
								<div className='mb-1'>
									<span className='text-4xl'>{plan.price}</span>
								</div>
								<div className='text-sm text-muted-foreground'>
									{plan.period}
								</div>
							</div>

							<ul className='space-y-4 mb-8'>
								{plan.features.map((feature, featureIndex) => (
									<li key={featureIndex} className='flex items-start gap-3'>
										<Check className='h-5 w-5 text-primary shrink-0 mt-0.5' />
										<span className='text-sm'>{feature}</span>
									</li>
								))}
							</ul>

							<Button
								className='w-full'
								variant={plan.popular ? 'default' : 'outline'}
							>
								{plan.cta}
							</Button>
						</Card>
					))}
				</div>

				<div className='mt-16 text-center'>
					<p className='text-lg text-muted-foreground mb-2'>
						Punya pertanyaan tentang paket kami?
					</p>
					<a
						href='#'
						className='inline-flex items-center text-primary hover:underline'
					>
						Lihat FAQ atau hubungi tim sales →
					</a>
				</div>
			</div>
		</section>
	)
}
