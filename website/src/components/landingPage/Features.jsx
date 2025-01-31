import { motion } from "framer-motion"

const features = [
  {
    title: "Education",
    description: "Learn from industry experts and gain hands-on experience with cutting-edge AI technologies.",
  },
  {
    title: "Research",
    description: "Participate in groundbreaking AI research projects and contribute to the future of technology.",
  },
  {
    title: "Community",
    description: "Join a vibrant community of AI enthusiasts, researchers, and industry professionals.",
  },
]

export default function Features() {
  return (
    <section className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              className="p-6 rounded-2xl bg-white/5 backdrop-blur-sm hover:bg-white/10 transition-colors duration-300"
            >
              <h3 className="text-2xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-600">
                {feature.title}
              </h3>
              <p className="text-gray-400">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

