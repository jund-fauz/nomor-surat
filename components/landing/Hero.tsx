import { Button } from '../ui/button'
import { ArrowRight, CheckCircle2 } from 'lucide-react'

export function Hero() {
	return (
		<section className='relative overflow-hidden py-20 sm:py-32'>
			<div className='absolute inset-0 -z-10 bg-linear-to-b from-primary/5 to-background' />

			<div className='container mx-auto px-4 sm:px-6 lg:px-8'>
				<div className='grid lg:grid-cols-2 gap-12 items-center'>
					<div className='space-y-8'>
						<div className='inline-block px-4 py-2 rounded-full bg-primary/10 text-primary'>
							✨ Platform Manajemen Surat Terpercaya
						</div>

						<h1 className='text-4xl sm:text-5xl lg:text-6xl tracking-tight'>
							Kelola Surat & Penomoran dengan{' '}
							<span className='text-primary'>Mudah</span>
						</h1>

						<p className='text-lg text-muted-foreground max-w-xl'>
							Sistem penomoran otomatis, arsip digital yang terorganisir, dan
							workflow yang efisien. Tingkatkan produktivitas administrasi
							organisasi Anda.
						</p>

						<div className='space-y-3'>
							{[
								'Penomoran surat otomatis & terstruktur',
								'Arsip digital dengan pencarian cepat',
								'Tracking & notifikasi real-time',
							].map((feature, index) => (
								<div key={index} className='flex items-center gap-3'>
									<CheckCircle2 className='h-5 w-5 text-primary shrink-0' />
									<span className='text-foreground/90'>{feature}</span>
								</div>
							))}
						</div>

						<div className='flex flex-col sm:flex-row gap-4'>
							<Button size='lg' className='group'>
								Mulai Gratis
								<ArrowRight className='ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform' />
							</Button>
							<Button size='lg' variant='outline'>
								Jadwalkan Demo
							</Button>
						</div>

						<div className='flex items-center gap-8 pt-4'>
							<div>
								<div className='text-2xl'>10.000+</div>
								<div className='text-sm text-muted-foreground'>
									Pengguna Aktif
								</div>
							</div>
							<div className='h-12 w-px bg-border' />
							<div>
								<div className='text-2xl'>500+</div>
								<div className='text-sm text-muted-foreground'>Organisasi</div>
							</div>
							<div className='h-12 w-px bg-border' />
							<div>
								<div className='text-2xl'>99.9%</div>
								<div className='text-sm text-muted-foreground'>Uptime</div>
							</div>
						</div>
					</div>

					<div className='relative lg:h-[600px]'>
						<div className='absolute inset-0 bg-linear-to-tr from-primary/20 to-transparent rounded-2xl' />
						<img
							src='https://images.unsplash.com/photo-1674471361339-2e1e1dbd3e73?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvZmZpY2UlMjBkb2N1bWVudHMlMjB3b3Jrc3BhY2V8ZW58MXx8fHwxNzY1NDIyODc5fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
							alt='Dashboard Preview'
							className='relative rounded-2xl shadow-2xl w-full h-full object-cover'
						/>
					</div>
				</div>
			</div>
		</section>
	)
}
