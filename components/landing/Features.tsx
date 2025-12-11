import {
	FileText,
	Hash,
	Archive,
	Search,
	Users,
	Bell,
	Shield,
	BarChart3,
	Clock,
} from 'lucide-react'
import { Card } from '../ui/card'

const features = [
	{
		icon: Hash,
		title: 'Penomoran Otomatis',
		description:
			'Sistem penomoran surat otomatis dengan format yang dapat disesuaikan sesuai kebutuhan organisasi Anda.',
	},
	{
		icon: Archive,
		title: 'Arsip Digital Terpusat',
		description:
			'Simpan dan kelola semua dokumen dalam satu tempat yang aman dengan enkripsi tingkat enterprise.',
	},
	{
		icon: Search,
		title: 'Pencarian Canggih',
		description:
			'Temukan dokumen dalam hitungan detik dengan fitur pencarian berdasarkan nomor, tanggal, atau konten.',
	},
	{
		icon: Bell,
		title: 'Notifikasi Real-time',
		description:
			'Dapatkan pemberitahuan instan untuk setiap perubahan status atau disposisi surat yang masuk.',
	},
	{
		icon: Users,
		title: 'Kolaborasi Tim',
		description:
			'Workflow approval yang terintegrasi dengan tracking disposisi dan delegasi wewenang yang jelas.',
	},
	{
		icon: Shield,
		title: 'Keamanan Terjamin',
		description:
			'Kontrol akses berbasis role, audit trail lengkap, dan backup otomatis untuk melindungi data Anda.',
	},
	{
		icon: BarChart3,
		title: 'Laporan & Analitik',
		description:
			'Dashboard interaktif dengan laporan statistik surat masuk, keluar, dan kinerja administrasi.',
	},
	{
		icon: Clock,
		title: 'Riwayat Lengkap',
		description:
			'Lacak seluruh jejak surat dari pembuatan hingga disposisi akhir dengan timeline yang detail.',
	},
	{
		icon: FileText,
		title: 'Template Surat',
		description:
			'Buat surat lebih cepat dengan template yang dapat dikustomisasi dan digunakan berulang kali.',
	},
]

export function Features() {
	return (
		<section id='fitur' className='py-20 sm:py-32 bg-muted/30'>
			<div className='container mx-auto px-4 sm:px-6 lg:px-8'>
				<div className='text-center max-w-3xl mx-auto mb-16'>
					<div className='inline-block px-4 py-2 rounded-full bg-primary/10 text-primary mb-4'>
						Fitur Unggulan
					</div>
					<h2 className='text-3xl sm:text-4xl lg:text-5xl mb-4'>
						Semua yang Anda Butuhkan untuk Manajemen Surat
					</h2>
					<p className='text-lg text-muted-foreground'>
						Fitur lengkap yang dirancang untuk mempermudah administrasi dan
						meningkatkan efisiensi kerja
					</p>
				</div>

				<div className='grid sm:grid-cols-2 lg:grid-cols-3 gap-6'>
					{features.map((feature, index) => {
						const Icon = feature.icon
						return (
							<Card
								key={index}
								className='p-6 hover:shadow-lg transition-shadow border-border bg-card'
							>
								<div className='flex flex-col h-full'>
									<div className='mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10'>
										<Icon className='h-6 w-6 text-primary' />
									</div>
									<h3 className='mb-2'>{feature.title}</h3>
									<p className='text-muted-foreground flex-1'>
										{feature.description}
									</p>
								</div>
							</Card>
						)
					})}
				</div>

				<div className='mt-16 text-center'>
					<p className='text-lg text-muted-foreground mb-6'>
						Butuh fitur khusus untuk organisasi Anda?
					</p>
					<a
						href='#'
						className='inline-flex items-center text-primary hover:underline'
					>
						Hubungi tim kami untuk solusi enterprise →
					</a>
				</div>
			</div>
		</section>
	)
}
