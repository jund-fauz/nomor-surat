import { FileText, Menu, X } from 'lucide-react'
import { Button } from '../ui/button'
import { useState } from 'react'
import Link from 'next/link'

export function Header() {
	const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

	return (
		<header className='sticky top-0 z-50 bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60 border-b border-border'>
			<nav className='container mx-auto px-4 sm:px-6 lg:px-8'>
				<div className='flex h-16 items-center justify-between'>
					<div className='flex items-center gap-2'>
						<div className='flex h-10 w-10 items-center justify-center rounded-lg bg-primary'>
							<FileText className='h-6 w-6 text-primary-foreground' />
						</div>
						<Link href='#' className='text-xl font-semibold'>
							NomorSurat
						</Link>
					</div>

					<div className='hidden md:flex items-center gap-8'>
						<Link
							href='#fitur'
							className='text-foreground/80 hover:text-foreground transition-colors'
						>
							Fitur
						</Link>
						<Link
							href='#testimoni'
							className='text-foreground/80 hover:text-foreground transition-colors'
						>
							Testimoni
						</Link>
						<Link
							href='#harga'
							className='text-foreground/80 hover:text-foreground transition-colors'
						>
							Harga
						</Link>
					</div>

					<div className='hidden md:flex items-center gap-4'>
						<Button variant='ghost' asChild>
							<Link href='/login'>Masuk</Link>
						</Button>
						<Button>Coba Gratis</Button>
					</div>

					<button
						className='md:hidden p-2'
						onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
					>
						{mobileMenuOpen ? (
							<X className='h-6 w-6' />
						) : (
							<Menu className='h-6 w-6' />
						)}
					</button>
				</div>

				{mobileMenuOpen && (
					<div className='md:hidden py-4 space-y-4 border-t border-border'>
						<Link
							href='#fitur'
							className='block py-2 text-foreground/80 hover:text-foreground transition-colors'
							onClick={() => setMobileMenuOpen(false)}
						>
							Fitur
						</Link>
						<Link
							href='#testimoni'
							className='block py-2 text-foreground/80 hover:text-foreground transition-colors'
							onClick={() => setMobileMenuOpen(false)}
						>
							Testimoni
						</Link>
						<Link
							href='#harga'
							className='block py-2 text-foreground/80 hover:text-foreground transition-colors'
							onClick={() => setMobileMenuOpen(false)}
						>
							Harga
						</Link>
						<div className='pt-4 space-y-2'>
							<Button variant='ghost' className='w-full' asChild>
								<Link href='/login'>Masuk</Link>
							</Button>
							<Button className='w-full'>Coba Gratis</Button>
						</div>
					</div>
				)}
			</nav>
		</header>
	)
}
