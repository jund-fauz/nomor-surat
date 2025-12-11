import { Card } from '../ui/card'
import { Star } from 'lucide-react'

const testimonials = [
	{
		name: 'Budi Santoso',
		role: 'Kepala Bagian Umum',
		company: 'Dinas Pendidikan Kota Bandung',
		content:
			'NomorSurat mengubah cara kami mengelola administrasi surat. Penomoran otomatis dan arsip digital sangat membantu efisiensi kerja tim kami. Highly recommended!',
		rating: 5,
	},
	{
		name: 'Siti Nurhaliza',
		role: 'Sekretaris Perusahaan',
		company: 'PT Maju Bersama Indonesia',
		content:
			'Dengan NomorSurat, kami bisa tracking semua surat masuk dan keluar dengan mudah. Fitur notifikasi real-time sangat membantu koordinasi antar departemen.',
		rating: 5,
	},
	{
		name: 'Ahmad Wijaya',
		role: 'IT Manager',
		company: 'Universitas Indonesia',
		content:
			'Implementasi mudah, interface intuitif, dan support team yang responsif. NomorSurat adalah solusi terbaik untuk manajemen surat di kampus kami.',
		rating: 5,
	},
	{
		name: 'Dewi Kartika',
		role: 'Staf Administrasi',
		company: 'RS Harapan Sehat',
		content:
			'Pencarian dokumen yang dulu memakan waktu berjam-jam, sekarang hanya butuh beberapa detik. Sistem yang sangat user-friendly dan efisien.',
		rating: 5,
	},
	{
		name: 'Rudi Hermawan',
		role: 'Kepala Kantor',
		company: 'Kementerian BUMN',
		content:
			'Keamanan data terjamin, audit trail lengkap, dan laporan yang comprehensive. Sangat sesuai dengan kebutuhan instansi pemerintah.',
		rating: 5,
	},
	{
		name: 'Linda Kusuma',
		role: 'Direktur Operasional',
		company: 'Yayasan Pendidikan Nusantara',
		content:
			'ROI yang sangat cepat! Produktivitas tim administrasi meningkat signifikan sejak menggunakan NomorSurat. Worth every penny!',
		rating: 5,
	},
]

export function Testimonials() {
	return (
		<section id='testimoni' className='py-20 sm:py-32'>
			<div className='container mx-auto px-4 sm:px-6 lg:px-8'>
				<div className='text-center max-w-3xl mx-auto mb-16'>
					<div className='inline-block px-4 py-2 rounded-full bg-primary/10 text-primary mb-4'>
						Testimoni
					</div>
					<h2 className='text-3xl sm:text-4xl lg:text-5xl mb-4'>
						Dipercaya oleh Berbagai Organisasi
					</h2>
					<p className='text-lg text-muted-foreground'>
						Lebih dari 500 organisasi telah meningkatkan efisiensi administrasi
						mereka dengan NomorSurat
					</p>
				</div>

				<div className='grid sm:grid-cols-2 lg:grid-cols-3 gap-6'>
					{testimonials.map((testimonial, index) => (
						<Card key={index} className='p-6 border-border bg-card'>
							<div className='flex flex-col h-full'>
								<div className='flex gap-1 mb-4'>
									{[...Array(testimonial.rating)].map((_, i) => (
										<Star
											key={i}
											className='h-4 w-4 fill-yellow-400 text-yellow-400'
										/>
									))}
								</div>

								<p className='text-muted-foreground mb-6 flex-1'>
									"{testimonial.content}"
								</p>

								<div className='border-t border-border pt-4'>
									<div className='font-medium'>{testimonial.name}</div>
									<div className='text-sm text-muted-foreground'>
										{testimonial.role}
									</div>
									<div className='text-sm text-muted-foreground'>
										{testimonial.company}
									</div>
								</div>
							</div>
						</Card>
					))}
				</div>
			</div>
		</section>
	)
}
