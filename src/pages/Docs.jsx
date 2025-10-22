import { motion } from 'framer-motion'
import { projects } from '../data/projects'

const Docs = () => {
  const getVersionColor = (version) => {
    if (!version) return 'hidden'
    return 'text-terminal-green bg-terminal-green/20 border-terminal-green/30'
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="pt-20 pb-16 bg-terminal-gray/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              <span className="cursive-text">Project Documentation</span>
            </h1>
            <div className="text-terminal-green text-sm font-mono mb-4">
              <span className="cursor-blink">$</span> ls -la docs/
            </div>
            <p className="text-lg text-gray-400 max-w-3xl mx-auto">
              Comprehensive documentation for all my projects. From architecture decisions 
              to implementation details, everything you need to understand and contribute.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Projects Documentation */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-12"
          >
            <h2 className="text-3xl font-bold text-terminal-green mb-8 text-center">
              Project Documentation
            </h2>
            
            <div className="grid lg:grid-cols-2 gap-8">
              {projects.map((project, index) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                  className="bg-terminal-bg border border-terminal-green/20 rounded-lg p-8 hover:border-terminal-green/40 transition-all duration-300"
                >
                  {/* Project Header */}
                  <div className="flex items-start justify-between mb-6">
                    <div>
                      <h3 className="text-2xl font-bold text-white mb-2">{project.title}</h3>
                      <p className="text-terminal-green font-semibold mb-4">{project.subtitle}</p>
                      <p className="text-gray-300 leading-relaxed">{project.longDescription}</p>
                    </div>
                    <div className="flex flex-col items-end space-y-2">
                      {project.version && (
                        <span className={`px-3 py-1 rounded text-sm font-semibold border ${getVersionColor(project.version)}`}>
                          {project.version}
                        </span>
                      )}
                      <span className="px-3 py-1 bg-terminal-green/20 text-terminal-green text-sm font-semibold rounded">
                        {project.status}
                      </span>
                    </div>
                  </div>

                  {/* Tech Stack */}
                  <div className="mb-6">
                    <h4 className="text-lg font-semibold text-terminal-green mb-3">
                      Technology Stack
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {project.tech.map((tech) => (
                        <span
                          key={tech}
                          className="px-3 py-1 bg-terminal-green/20 text-terminal-green rounded-full text-sm"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Key Features */}
                  <div className="mb-6">
                    <h4 className="text-lg font-semibold text-terminal-green mb-3">
                      Key Features
                    </h4>
                    <ul className="space-y-2">
                      {project.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-start space-x-2">
                          <span className="text-terminal-green text-sm mt-1">▶</span>
                          <span className="text-gray-300 text-sm">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Links */}
                  <div className="flex space-x-4">
                    {project.github && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center space-x-2 text-terminal-green hover:text-white transition-colors"
                      >
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                        </svg>
                        <span className="text-sm font-medium">GitHub</span>
                      </a>
                    )}
                    {project.demo && (
                      <a
                        href={project.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center space-x-2 text-terminal-green hover:text-white transition-colors"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                        <span className="text-sm font-medium">Live Demo</span>
                      </a>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Architecture Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="bg-terminal-bg p-8 rounded-lg border border-terminal-green/20"
          >
            <h3 className="text-2xl font-bold text-terminal-green mb-6 text-center">
              Architecture Principles
            </h3>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h4 className="text-lg font-semibold text-white mb-4">Design Philosophy</h4>
                <ul className="space-y-3">
                  <li className="flex items-start space-x-3">
                    <span className="text-terminal-green text-lg">▶</span>
                    <span className="text-gray-300">Build from first principles</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <span className="text-terminal-green text-lg">▶</span>
                    <span className="text-gray-300">Performance over convenience</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <span className="text-terminal-green text-lg">▶</span>
                    <span className="text-gray-300">Scalability from day one</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <span className="text-terminal-green text-lg">▶</span>
                    <span className="text-gray-300">Developer experience matters</span>
                  </li>
                </ul>
              </div>
              
              <div>
                <h4 className="text-lg font-semibold text-white mb-4">Technical Standards</h4>
                <ul className="space-y-3">
                  <li className="flex items-start space-x-3">
                    <span className="text-terminal-green text-lg">▶</span>
                    <span className="text-gray-300">Comprehensive testing</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <span className="text-terminal-green text-lg">▶</span>
                    <span className="text-gray-300">Detailed documentation</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <span className="text-terminal-green text-lg">▶</span>
                    <span className="text-gray-300">Monitoring and observability</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <span className="text-terminal-green text-lg">▶</span>
                    <span className="text-gray-300">Security by design</span>
                  </li>
                </ul>
              </div>
            </div>
          </motion.div>

          {/* Contribution Guidelines */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mt-12 text-center"
          >
            <div className="bg-terminal-bg p-8 rounded-lg border border-terminal-green/20 max-w-4xl mx-auto">
              <h3 className="text-2xl font-bold text-terminal-green mb-4">
                Contributing
              </h3>
              <p className="text-gray-300 mb-6">
                All projects are open source and welcome contributions. Check individual 
                repositories for specific contribution guidelines and coding standards.
              </p>
              <a
                href="https://github.com/atithi4dev"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-terminal hover:scale-105 transform transition-all duration-300"
              >
                View All Projects on GitHub
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default Docs
