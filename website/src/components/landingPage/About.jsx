import { motion } from "framer-motion"

export default function About() {
  return (
    <section className="py-20 px-4 relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="grid md:grid-cols-2 gap-12 items-center"
        >
          <div>
            <h2 className="text-4xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-600">
              About Us
            </h2>
            <p className="text-gray-400 leading-relaxed">
              We are a community of AI enthusiasts, researchers, and innovators dedicated to advancing the field of
              artificial intelligence. Our mission is to make AI education accessible and foster collaboration between
              students, academics, and industry professionals.
            </p>
          </div>
          <div className="relative h-[400px] rounded-2xl overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-400/20 to-blue-600/20 backdrop-blur-3xl" />
          </div>
        </motion.div>
      </div>
    </section>
  )
}

