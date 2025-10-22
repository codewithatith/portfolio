import { motion } from 'framer-motion'
import { projects } from '../data/projects'

const Projects = ({ setActiveSection }) => {
  const getVersionColor = (version) => {
    if (!version) return 'hidden'
    return 'text-terminal-green bg-terminal-green/20 border-terminal-green/30'
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'Production Ready': return 'text-green-400'
      case 'Active Development': return 'text-blue-400'
      case 'Learning Project': return 'text-yellow-400'
      default: return 'text-gray-400'
    }
  }

  return (
    <section id="projects" className="section bg-terminal-gray/30 relative">
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
            <span className="elegant-text">Featured Projects</span>
          </h2>
          <div className="text-terminal-green text-xs sm:text-sm font-mono mb-3 sm:mb-4">
            <span className="cursor-blink">$</span> ls -la projects/
          </div>
          <p className="text-sm sm:text-base md:text-lg text-gray-400 max-w-3xl mx-auto px-4">
            Elite projects showcasing deep technical expertise in systems programming, 
            infrastructure, and building complex applications from first principles.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-6 sm:gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-terminal-bg border border-terminal-green/20 rounded-lg overflow-hidden hover:border-terminal-green/40 transition-all duration-300 hover:scale-105"
            >
              {/* Project Header */}
              <div className="p-4 sm:p-6 border-b border-terminal-green/20">
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-3 sm:mb-4">
                  <div className="mb-3 sm:mb-0">
                    <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">{project.title}</h3>
                    <p className="text-sm sm:text-base text-terminal-green font-semibold">{project.subtitle}</p>
                  </div>
                  <div className="flex flex-row sm:flex-col items-start sm:items-end space-x-2 sm:space-x-0 sm:space-y-2">
                    {project.version && (
                      <span className={`px-2 py-1 rounded text-xs font-semibold border whitespace-nowrap ${getVersionColor(project.version)}`}>
                        {project.version}
                      </span>
                    )}
                    <span className={`px-2 py-1 rounded text-xs font-semibold whitespace-nowrap ${getStatusColor(project.status)} bg-gray-800`}>
                      {project.status}
                    </span>
                  </div>
                </div>
                <p className="text-sm sm:text-base text-gray-300 leading-relaxed">{project.description}</p>
              </div>

              {/* Tech Stack */}
              <div className="p-4 sm:p-6 border-b border-terminal-green/20">
                <h4 className="text-xs sm:text-sm font-semibold text-terminal-green mb-3 uppercase tracking-wide">
                  Tech Stack
                </h4>
                <div className="flex flex-wrap gap-1.5 sm:gap-2">
                  {project.tech.map((tech) => (
                    <span
                      key={tech}
                      className="px-2 sm:px-3 py-1 bg-terminal-green/20 text-terminal-green rounded-full text-xs sm:text-sm"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Features */}
              <div className="p-4 sm:p-6 border-b border-terminal-green/20">
                <h4 className="text-xs sm:text-sm font-semibold text-terminal-green mb-3 uppercase tracking-wide">
                  Key Features
                </h4>
                <ul className="space-y-2">
                  {project.features.slice(0, 3).map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start space-x-2">
                      <span className="text-terminal-green text-xs sm:text-sm mt-0.5 sm:mt-1 flex-shrink-0">▶</span>
                      <span className="text-gray-300 text-xs sm:text-sm">{feature}</span>
                    </li>
                  ))}
                  {project.features.length > 3 && (
                    <li className="text-gray-500 text-xs sm:text-sm">
                      +{project.features.length - 3} more features
                    </li>
                  )}
                </ul>
              </div>

              {/* Links */}
              <div className="p-4 sm:p-6">
                <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4">
                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center sm:justify-start space-x-2 text-terminal-green hover:text-white transition-colors py-2 sm:py-0"
                    >
                      <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                      </svg>
                      <span className="text-xs sm:text-sm font-medium">GitHub</span>
                    </a>
                  )}
                  {project.demo && (
                    <a
                      href={project.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center sm:justify-start space-x-2 text-terminal-green hover:text-white transition-colors py-2 sm:py-0"
                    >
                      <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                      <span className="text-xs sm:text-sm font-medium">Live Demo</span>
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          viewport={{ once: true }}
          className="text-center mt-12 sm:mt-16 px-4 sm:px-0"
        >
          <div className="bg-terminal-bg p-6 sm:p-8 rounded-lg border border-terminal-green/20 max-w-4xl mx-auto">
            <h3 className="text-xl sm:text-2xl font-bold text-terminal-green mb-3 sm:mb-4">
              More Projects on GitHub
            </h3>
            <p className="text-sm sm:text-base text-gray-300 mb-4 sm:mb-6">
              Explore my complete portfolio of systems programming projects, learning experiments, 
              and infrastructure tools. Each project includes detailed documentation and code.
            </p>
            <a
              href="https://github.com/atithi4dev"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-terminal hover:scale-105 transform transition-all duration-300 inline-flex items-center space-x-2 text-sm sm:text-base"
            >
              <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
              <span>View All Projects</span>
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default Projects
