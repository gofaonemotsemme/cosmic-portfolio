import Navbar from '@/components/shared/Navbar'
import Hero from '@/components/landing/Hero'

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <Hero />
      
      {/* More sections will go here */}
      <section id="work" className="min-h-screen py-20">
        {/* Work experience section */}
      </section>
      
      <section id="cosmic" className="min-h-screen py-20">
        {/* Astrology section */}
      </section>
      
      <section id="crypto" className="min-h-screen py-20">
        {/* Crypto section */}
      </section>
    </main>
  )
}