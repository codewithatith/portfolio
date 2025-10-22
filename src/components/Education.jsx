import { motion } from 'framer-motion'

const Education = ({ setActiveSection }) => {
  const education = [
    {
      degree: "Bachelor of Technology in Computer Science and Engineering",
      institution: "Amity University Uttar Pradesh",
      period: "2024 - 2028",
      status: "Current",
      gpa: "3.2/4.0",
      description: "Focus on systems programming, algorithms, and distributed systems"
    }
  ]

  const certifications = [
    {
      name: "Docker Fundamentals",
      issuer: "Docker",
      date: "2024",
      status: "Completed"
    },
    {
      name: "Kubernetes Basics",
      issuer: "CNCF",
      date: "2024",
      status: "In Progress"
    },
    {
      name: "Linux Command Line",
      issuer: "Online Course",
      date: "2024",
      status: "Completed"
    }
  ]

  const achievements = [
    "Built Redis from scratch in Go",
    "Implemented Zerodha clone with real-time trading features",
    "Created HLS video streaming platform with transcoding",
    "Developed Veren - full-stack deployment platform",
    "Open source contributions to infrastructure projects",
    "Self-taught systems programming and distributed systems"
  ]

  return (
    <section id="education" className="section bg-terminal-gray/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12 sm:mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6 px-4">
            <span className="gradient-text">Education & Learning</span>
          </h2>
          <div className="text-terminal-green text-xs sm:text-sm font-mono mb-3 sm:mb-4">
            <span className="cursor-blink">$</span> cat education.md
          </div>
          <p className="text-sm sm:text-base md:text-lg text-gray-400 max-w-3xl mx-auto px-4">
            Formal education combined with extensive self-directed learning in systems programming, 
            infrastructure, and building complex applications from first principles.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8 sm:gap-12">
          {/* Education */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-6 sm:space-y-8 px-4 sm:px-0"
          >
            <h3 className="text-xl sm:text-2xl font-bold text-terminal-green mb-4 sm:mb-6">
              Formal Education
            </h3>
            
            {education.map((edu, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-terminal-bg p-4 sm:p-6 rounded-lg border border-terminal-green/20 hover:border-terminal-green/40 transition-colors"
              >
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-3 sm:mb-4 gap-2 sm:gap-0">
                  <div className="flex-1 min-w-0">
                    <h4 className="text-lg sm:text-xl font-bold text-white mb-2 break-words">{edu.degree}</h4>
                    <p className="text-sm sm:text-base text-terminal-green font-semibold break-words">{edu.institution}</p>
                  </div>
                  <span className="px-3 py-1 bg-terminal-green/20 text-terminal-green text-xs sm:text-sm font-semibold rounded whitespace-nowrap self-start">
                    {edu.status}
                  </span>
                </div>
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-3 sm:mb-4 gap-1 sm:gap-0">
                  <span className="text-sm sm:text-base text-gray-400">{edu.period}</span>
                  <span className="text-sm sm:text-base text-terminal-green font-semibold">GPA: {edu.gpa}</span>
                </div>
                <p className="text-sm sm:text-base text-gray-300 break-words">{edu.description}</p>
              </motion.div>
            ))}

            {/* Certifications */}
            <div className="mt-8">
              <h4 className="text-xl font-bold text-terminal-green mb-4">
                Certifications & Learning
              </h4>
              <div className="space-y-4">
                {certifications.map((cert, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="flex items-center justify-between p-4 bg-terminal-bg border border-terminal-green/20 rounded-lg"
                  >
                    <div>
                      <h5 className="font-semibold text-white">{cert.name}</h5>
                      <p className="text-sm text-gray-400">{cert.issuer}</p>
                    </div>
                    <div className="text-right">
                      <span className="text-sm text-terminal-green">{cert.date}</span>
                      <div className={`text-xs px-2 py-1 rounded ${
                        cert.status === 'Completed' 
                          ? 'bg-green-900/20 text-green-400' 
                          : 'bg-yellow-900/20 text-yellow-400'
                      }`}>
                        {cert.status}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Achievements & Self-Learning */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <h3 className="text-2xl font-bold text-terminal-green mb-6">
              Key Achievements
            </h3>

            <div className="space-y-4">
              {achievements.map((achievement, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="flex items-start space-x-3"
                >
                  <span className="text-terminal-green text-lg mt-1">▶</span>
                  <p className="text-gray-300">{achievement}</p>
                </motion.div>
              ))}
            </div>

            {/* Learning Philosophy */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
              className="bg-terminal-bg p-6 rounded-lg border border-terminal-green/20"
            >
              <h4 className="text-lg font-bold text-terminal-green mb-4">
                Learning Philosophy
              </h4>
              <p className="text-gray-300 leading-relaxed mb-4">
                "I believe in learning by building. Instead of just using Redis, I built it from scratch. 
                Instead of just using trading platforms, I built a complete Zerodha clone. This deep understanding 
                makes me a better developer and allows me to solve problems others can't even see."
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 bg-terminal-green/20 text-terminal-green rounded-full text-sm">
                  Learning by Building
                </span>
                <span className="px-3 py-1 bg-terminal-green/20 text-terminal-green rounded-full text-sm">
                  First Principles
                </span>
                <span className="px-3 py-1 bg-terminal-green/20 text-terminal-green rounded-full text-sm">
                  Systems Thinking
                </span>
              </div>
            </motion.div>

            {/* GitHub Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              viewport={{ once: true }}
              className="bg-terminal-bg p-6 rounded-lg border border-terminal-green/20"
            >
                          <h4 className="text-lg font-bold text-terminal-green mb-4">
              Open Source & Learning
            </h4>
            <div className="grid grid-cols-2 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-terminal-green">10+</div>
                <div className="text-sm text-gray-400">Repositories</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-terminal-green">200+</div>
                <div className="text-sm text-gray-400">Commits</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-terminal-green">5+</div>
                <div className="text-sm text-gray-400">Languages</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-terminal-green">Active</div>
                <div className="text-sm text-gray-400">Daily Coder</div>
              </div>
            </div>
              <div className="mt-4 text-center">
                <a
                  href="https://github.com/atithi4dev"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-terminal hover:scale-105 transform transition-all duration-300"
                >
                  View GitHub Profile
                </a>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default Education
