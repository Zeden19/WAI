import { motion } from "framer-motion"

const teamMembers = [
  {
    department: "internal",
    members: [
      { name: "tazrin", role: "Lead" },
      { name: "jasmine gu", role: "Member" },
    ],
  },
  {
    department: "finance",
    members: [{ name: "ethan rong", role: "Lead" }],
  },
  {
    department: "education",
    members: [
      { name: "shawn chen", role: "Lead" },
      { name: "arjun dahiya", role: "Member" },
    ],
  },
]

export default function Team() {
  return (
    <section className="relative py-20 px-4 overflow-hidden">
      {/* Background stripes */}
      <div className="absolute inset-0 -skew-y-12 flex flex-col gap-8 opacity-10 dark:opacity-5">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="h-16 bg-black dark:bg-white transform -rotate-12">
            <div className="h-full flex items-center">
              <div className="animate-scroll whitespace-nowrap text-2xl tracking-wider">
                PORTFOLIOS PORTFOLIOS PORTFOLIOS PORTFOLIOS PORTFOLIOS
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="max-w-7xl mx-auto relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-blue-500 to-purple-600">
            meet the executive team
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400">the people in charge of western ai</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {teamMembers.map((team, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              className="relative group"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-purple-400/20 to-blue-500/20 rounded-3xl blur-xl transition-opacity group-hover:opacity-100 opacity-0" />
              <div className="relative bg-white/80 dark:bg-black/80 backdrop-blur-sm rounded-3xl p-6 border border-purple-500/20">
                <div className="space-y-4 mb-6">
                  {team.members.map((member, idx) => (
                    <div key={idx} className="flex flex-col items-center p-4 rounded-xl bg-white/50 dark:bg-black/50">
                      <div className="w-16 h-16 rounded-full bg-gradient-to-r from-purple-400 to-blue-500 mb-3" />
                      <h3 className="text-lg font-medium text-gray-900 dark:text-white">{member.name}</h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">{member.role}</p>
                    </div>
                  ))}
                </div>
                <div className="text-center text-xl font-medium bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-500">
                  {team.department}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

