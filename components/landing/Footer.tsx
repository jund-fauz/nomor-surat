import { FileText, Mail, Phone, MapPin } from 'lucide-react'

export function Footer() {
	return (
		<footer className='bg-primary text-primary-foreground'>
			<div className='container mx-auto px-4 sm:px-6 lg:px-8 py-12'>
				<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8'>
					<div className='space-y-4'>
						<div className='flex items-center gap-2'>
							<div className='flex h-10 w-10 items-center justify-center rounded-lg bg-primary-foreground'>
								<FileText className='h-6 w-6 text-primary' />
							</div>
							<span className='text-xl font-semibold'>NomorSurat</span>
						</div>
						<p className='text-sm text-primary-foreground/80'>
							Platform manajemen surat dan penomoran terpercaya untuk organisasi
							modern di Indonesia.
						</p>
					</div>

					<div>
						<h4 className='mb-4'>Produk</h4>
						<ul className='space-y-3'>
							<li>
								<a
									href='#fitur'
									className='text-sm text-primary-foreground/80 hover:text-primary-foreground transition-colors'
								>
									Fitur
								</a>
							</li>
							<li>
								<a
									href='#harga'
									className='text-sm text-primary-foreground/80 hover:text-primary-foreground transition-colors'
								>
									Harga
								</a>
							</li>
							<li>
								<a
									href='#'
									className='text-sm text-primary-foreground/80 hover:text-primary-foreground transition-colors'
								>
									Integrasi
								</a>
							</li>
							<li>
								<a
									href='#'
									className='text-sm text-primary-foreground/80 hover:text-primary-foreground transition-colors'
								>
									API Documentation
								</a>
							</li>
						</ul>
					</div>

					<div>
						<h4 className='mb-4'>Perusahaan</h4>
						<ul className='space-y-3'>
							<li>
								<a
									href='#'
									className='text-sm text-primary-foreground/80 hover:text-primary-foreground transition-colors'
								>
									Tentang Kami
								</a>
							</li>
							<li>
								<a
									href='#'
									className='text-sm text-primary-foreground/80 hover:text-primary-foreground transition-colors'
								>
									Blog
								</a>
							</li>
							<li>
								<a
									href='#'
									className='text-sm text-primary-foreground/80 hover:text-primary-foreground transition-colors'
								>
									Karir
								</a>
							</li>
							<li>
								<a
									href='#'
									className='text-sm text-primary-foreground/80 hover:text-primary-foreground transition-colors'
								>
									Kontak
								</a>
							</li>
						</ul>
					</div>

					<div>
						<h4 className='mb-4'>Hubungi Kami</h4>
						<ul className='space-y-3'>
							<li className='flex items-start gap-3'>
								<Mail className='h-5 w-5 shrink-0 mt-0.5' />
								<a
									href='mailto:info@nomorsurat.web.id'
									className='text-sm text-primary-foreground/80 hover:text-primary-foreground transition-colors'
								>
									info@nomorsurat.web.id
								</a>
							</li>
							<li className='flex items-start gap-3'>
								<Phone className='h-5 w-5 shrink-0 mt-0.5' />
								<a
									href='tel:+622112345678'
									className='text-sm text-primary-foreground/80 hover:text-primary-foreground transition-colors'
								>
									+62 21 1234 5678
								</a>
							</li>
							<li className='flex items-start gap-3'>
								<MapPin className='h-5 w-5 shrink-0 mt-0.5' />
								<span className='text-sm text-primary-foreground/80'>
									Jakarta, Indonesia
								</span>
							</li>
						</ul>
					</div>
				</div>

				<div className='border-t border-primary-foreground/20 pt-8'>
					<div className='flex flex-col md:flex-row justify-between items-center gap-4'>
						<p className='text-sm text-primary-foreground/80'>
							© 2024 NomorSurat. All rights reserved.
						</p>
						<div className='flex gap-6'>
							<a
								href='#'
								className='text-sm text-primary-foreground/80 hover:text-primary-foreground transition-colors'
							>
								Kebijakan Privasi
							</a>
							<a
								href='#'
								className='text-sm text-primary-foreground/80 hover:text-primary-foreground transition-colors'
							>
								Syarat & Ketentuan
							</a>
						</div>
					</div>
				</div>
			</div>
		</footer>
	)
}
