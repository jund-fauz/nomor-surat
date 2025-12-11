'use client'

import { Features } from "@/components/landing/Features"
import { Footer } from "@/components/landing/Footer"
import { Header } from "@/components/landing/Header"
import { Hero } from "@/components/landing/Hero"
import { Pricing } from "@/components/landing/Pricing"
import { Testimonials } from "@/components/landing/Testimonials"

export default function Home() {
  return (
		<div className="min-h-screen bg-background">
      <Header />
      <Hero />
      <Features />
      <Testimonials />
      <Pricing />
      <Footer />
    </div>
	)
}
