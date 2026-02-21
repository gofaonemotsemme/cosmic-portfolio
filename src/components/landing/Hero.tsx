'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'

export default function Hero() {
  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Animated stars background */}
      <div className="absolute inset-0">
        {[...Array(50)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full"
            initial={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
            }}
            animate={{
              y: [null, -30, null],
              opacity: [0.2, 1, 0.2],
            }}
            transition={{
              duration: Math.random() * 3 + 2,
              repeat: Infinity,
              ease: "linear"
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-4 z-10">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
              Lesedi <span className="text-purple-400">Motsemme</span>
            </h1>
            <p className="text-xl text-white/80 mb-8">
              Lead Frontend Developer crafting cosmic Web3 experiences.
              <span className="block mt-2 text-purple-300">
                2.5+ years of turning code into magic ✨
              </span>
            </p>
            
            <div className="flex gap-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-purple-600 rounded-full text-white font-semibold hover:bg-purple-700 transition-colors"
              >
                View My Work
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 border-2 border-purple-400 rounded-full text-white font-semibold hover:bg-purple-400/10 transition-colors"
              >
                Cosmic Oracle Demo
              </motion.button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 mt-12">
              {[
                { value: '2.5+', label: 'Years Leading' },
                { value: '10+', label: 'Projects' },
                { value: '15+', label: 'Mentored' },
              ].map((stat, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + i * 0.1 }}
                >
                  <div className="text-3xl font-bold text-white">{stat.value}</div>
                  <div className="text-white/60">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            {/* Cosmic orb animation */}
            <div className="relative w-96 h-96 mx-auto">
              <div className="absolute inset-0 rounded-full bg-purple-600/20 animate-pulse" />
              <div className="absolute inset-4 rounded-full bg-purple-500/30 animate-ping" />
              <div className="absolute inset-8 rounded-full bg-purple-400/40 backdrop-blur-3xl" />
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-8xl">👩‍💻</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white/60 rounded-full mt-2" />
        </div>
      </motion.div>
    </section>
  )
}