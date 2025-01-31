import { useEffect, useRef } from "react"
import { motion } from "framer-motion"

export default function Hero() {
  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center z-10"
      >
        <h1 className="text-[12rem] font-bold leading-none tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-500 to-blue-600 animate-gradient-x">
          wes
        </h1>
        <p className="text-xl mt-6 text-gray-400 max-w-lg mx-auto">
          Empowering the next generation of AI innovators through education, research, and community.
        </p>
      </motion.div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-purple-900/20 via-transparent to-transparent" />
    </section>
  )
}

