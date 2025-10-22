import { motion } from 'framer-motion'

const About = ({ setActiveSection }) => {
  const stats = [
    { label: 'Projects Built', value: '4+' },
    { label: 'Technologies', value: '10+' },
    { label: 'Years Coding', value: '2+' },
    { label: 'Current Year', value: '2nd' }
  ]

  const philosophy = [
    "Learning by building - Redis, Zerodha clone, streaming platforms from scratch",
    "Focus on backend development and system design",
    "Linux enthusiast exploring low-level programming",
    "Second year CS student passionate about infrastructure",
    "Tech identity: learner and builder"
  ]

  return (
    <section id="about" className="section bg-terminal-gray/30 relative">
      {/* Vertical grid lines background */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
        <div className="h-full w-full" style={{
          backgroundImage: 'repeating-linear-gradient(90deg, #ffffff 0px, #ffffff 1px, transparent 1px, transparent 60px)',
        }} />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12 sm:mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6 px-4">
            <span className="elegant-text">About Me</span>
          </h2>
          <div className="text-terminal-green text-xs sm:text-sm font-mono mb-3 sm:mb-4">
            <span className="cursor-blink">$</span> cat about.txt
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 items-center px-4 sm:px-0">
          {/* Left side - Philosophy */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-4 sm:space-y-6"
          >
            <h3 className="text-xl sm:text-2xl font-bold text-terminal-green mb-4 sm:mb-6">
              Philosophy & Approach
            </h3>
            
            <div className="space-y-3 sm:space-y-4">
              {philosophy.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="flex items-start space-x-2 sm:space-x-3 animate-slide-left"
                  whileHover={{ x: 5, transition: { duration: 0.2 } }}
                >
                  <motion.span 
                    className="text-terminal-green text-base sm:text-lg flex-shrink-0"
                    animate={{ rotate: [0, 10, 0] }}
                    transition={{ duration: 2, repeat: Infinity, delay: index * 0.2 }}
                  >
                    ▶
                  </motion.span>
                  <p className="text-sm sm:text-base text-gray-300 leading-relaxed">{item}</p>
                </motion.div>
              ))}
            </div>

            <div className="mt-6 sm:mt-8 p-4 sm:p-6 bg-terminal-bg border border-terminal-green/20 rounded-lg">
              <h4 className="text-base sm:text-lg font-semibold text-terminal-green mb-2 sm:mb-3">
                Current Focus
              </h4>
              <p className="text-sm sm:text-base text-gray-300">
                Deep diving into distributed systems, container orchestration, and building 
                infrastructure tools that developers actually want to use. Currently exploring 
                the intersection of performance, scalability, and developer experience.
              </p>
            </div>
          </motion.div>

          {/* Right side - Stats & Visual */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-6 sm:space-y-8"
          >
            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-4 sm:gap-6">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="text-center p-6 bg-terminal-bg border border-terminal-green/20 rounded-lg hover:border-terminal-green/40 transition-colors animate-float"
                  whileHover={{ scale: 1.05, y: -5 }}
                  animate={{ y: [0, -5, 0] }}
                >
                  <div className="text-3xl font-bold text-terminal-green mb-2">
                    {stat.value}
                  </div>
                  <div className="text-sm text-gray-400">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Tech Stack Preview */}
            <div className="p-6 bg-terminal-bg border border-terminal-green/20 rounded-lg">
              <h4 className="text-lg font-semibold text-terminal-green mb-4">
                Core Technologies
              </h4>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-gray-300">Systems Programming</span>
                  <div className="flex space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <div key={i} className="w-2 h-2 bg-terminal-green rounded-full" />
                    ))}
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-300">Container Orchestration</span>
                  <div className="flex space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <div key={i} className="w-2 h-2 bg-terminal-green rounded-full" />
                    ))}
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-300">Database Systems</span>
                  <div className="flex space-x-1">
                    {[...Array(4)].map((_, i) => (
                      <div key={i} className="w-2 h-2 bg-terminal-green rounded-full" />
                    ))}
                    <div className="w-2 h-2 bg-gray-600 rounded-full" />
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-300">Media Streaming</span>
                  <div className="flex space-x-1">
                    {[...Array(4)].map((_, i) => (
                      <div key={i} className="w-2 h-2 bg-terminal-green rounded-full" />
                    ))}
                    <div className="w-2 h-2 bg-gray-600 rounded-full" />
                  </div>
                </div>
              </div>
            </div>

            {/* Call to action */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <button
                onClick={() => setActiveSection('projects')}
                className="btn-terminal hover:scale-105 transform transition-all duration-300"
              >
                View My Work
              </button>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default About
