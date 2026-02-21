'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed w-full z-50 transition-all duration-300 ${
        scrolled ? 'bg-slate-900/95 backdrop-blur-md py-4' : 'bg-transparent py-6'
      }`}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold text-white">
          <span className="text-purple-400">{'<'}</span>
          Lesedi<span className="text-purple-400">{'/>'}</span>
        </Link>
        
        <div className="flex gap-8">
          {['Work', 'Cosmic', 'Crypto', 'Contact'].map((item) => (
            <Link
              key={item}
              href={`#${item.toLowerCase()}`}
              className="text-white/80 hover:text-purple-400 transition-colors"
            >
              {item}
            </Link>
          ))}
        </div>

        <button className="px-6 py-2 bg-purple-600 rounded-full text-white font-semibold hover:bg-purple-700 transition-colors">
          Connect Wallet
        </button>
      </div>
    </motion.nav>
  )
}