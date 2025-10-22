import { motion } from 'framer-motion'

const Skills = ({ setActiveSection }) => {
  const skills = [
    // Languages
    { name: "Go", level: "advanced", cat: "lang", icon: "🔷" },
    { name: "Node.js", level: "advanced", cat: "lang", icon: "🟢" },
    { name: "Python", level: "advanced", cat: "lang", icon: "🐍" },
    { name: "C/C++", level: "intermediate", cat: "lang", icon: "⚡" },
    { name: "JavaScript/TS", level: "advanced", cat: "lang", icon: "💛" },
    
    // Infrastructure & DevOps
    { name: "Docker", level: "advanced", cat: "infra", iconUrl: "https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/docker.svg" },
    { name: "Kubernetes", level: "intermediate", cat: "infra", iconUrl: "https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/kubernetes.svg" },
    { name: "Linux", level: "advanced", cat: "infra", iconUrl: "https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/linux.svg" },
    { name: "CI/CD", level: "intermediate", cat: "infra", iconUrl: "https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/jenkins.svg" },
    { name: "AWS (ECS/ECR/S3)", level: "intermediate", cat: "infra", icon: "☁️" },
    { name: "Networking", level: "intermediate", cat: "infra", icon: "🌐" },
    
    // Databases
    { name: "PostgreSQL", level: "advanced", cat: "db", iconUrl: "https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/postgresql.svg" },
    { name: "Redis", level: "advanced", cat: "db", iconUrl: "https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/redis.svg" },
    { name: "MongoDB", level: "intermediate", cat: "db", iconUrl: "https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/mongodb.svg" },
    
    // Backend & Streaming
    { name: "HLS Streaming", level: "advanced", cat: "backend", iconUrl: "https://img.icons8.com/color/48/000000/hls.png" },
    { name: "FFmpeg", level: "intermediate", cat: "backend", iconUrl: "https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/ffmpeg.svg" },
    { name: "WebRTC", level: "intermediate", cat: "backend", iconUrl: "https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/webrtc.svg" },
    { name: "WebSocket", level: "advanced", cat: "backend", iconUrl: "https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/websocket.svg" },
    { name: "REST APIs", level: "advanced", cat: "backend", icon: "🔌" },
    
    // Systems & Architecture
    { name: "Distributed Systems", level: "intermediate", cat: "systems", icon: "🔗" },
    { name: "System Design", level: "intermediate", cat: "systems", icon: "📐" },
    { name: "Microservices", level: "intermediate", cat: "systems", icon: "🧩" },
  ]

  const tools = [
    { name: "Neovim", note: "daily driver", iconUrl: "https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/neovim.svg" },
    { name: "Git", note: "version control", iconUrl: "https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/git.svg" },
    { name: "VS Code", note: "when needed", iconUrl: "https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/visualstudiocode.svg" },
    { name: "Cursor", note: "AI pair programming", iconUrl: "https://cursor.so/favicon.ico" },
    { name: "Postman", note: "API testing", iconUrl: "https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/postman.svg" },
    { name: "Docker Desktop", note: "containers", iconUrl: "https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/docker.svg" },
    { name: "Warp", note: "terminal", iconUrl: "https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/warp.svg" },
    { name: "Linux", note: "dev environment", iconUrl: "https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/linux.svg" },
  ]

  const categories = {
    lang: { label: "Languages" },
    infra: { label: "Infrastructure" },
    db: { label: "Databases" },
    backend: { label: "Backend & Streaming" },
    systems: { label: "Systems & Architecture" }
  }

  const getLevelColor = (level) => {
    return level === 'advanced' ? 'text-emerald-400' : 'text-amber-400'
  }

  return (
    <section id="skills" className="section relative">
      {/* Vertical grid lines background */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
        <div className="h-full w-full" style={{
          backgroundImage: 'repeating-linear-gradient(90deg, #ffffff 0px, #ffffff 1px, transparent 1px, transparent 60px)',
        }} />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-8 sm:mb-12"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 sm:mb-4 px-4">
            <span className="elegant-text">Tech Stack</span>
          </h2>
          <div className="text-terminal-green text-xs sm:text-sm font-mono mb-2 sm:mb-3">
            <span className="cursor-blink">$</span> cat skills.json
          </div>
          <p className="text-sm sm:text-base text-gray-400 max-w-2xl mx-auto px-4">
            Real-world experience building production systems. Not just tutorials - actual deployed projects.
          </p>
        </motion.div>

        {/* Skills by Category */}
        <div className="space-y-6 sm:space-y-8 mb-12 sm:mb-16">
          {Object.keys(categories).map((catKey, catIdx) => {
            const category = categories[catKey]
            const categorySkills = skills.filter(s => s.cat === catKey)
            
            return (
              <motion.div
                key={catKey}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: catIdx * 0.1 }}
                viewport={{ once: true }}
                className="relative"
              >
                {/* Category header */}
                <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4 px-2 sm:px-0">
                  <div className="h-px flex-1 bg-gray-700" />
                  <h3 className="text-sm sm:text-base md:text-lg font-semibold text-white px-2 sm:px-3 py-1 bg-gray-800 rounded border border-gray-700 whitespace-nowrap">
                    {category.label}
                  </h3>
                  <div className="h-px flex-1 bg-gray-700" />
                </div>

                {/* Skills grid */}
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 sm:gap-3">
                  {categorySkills.map((skill, idx) => (
                    <motion.div
                      key={skill.name}
                      initial={{ opacity: 0, scale: 0.95 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.3, delay: idx * 0.03 }}
                      viewport={{ once: true }}
                      whileHover={{ scale: 1.03, y: -2 }}
                      className="group relative bg-gray-900 p-2 sm:p-3 rounded-lg border border-gray-700 hover:border-gray-500 transition-all"
                    >
                      <div className="flex items-center justify-between mb-1">
                        {skill.iconUrl ? (
                          <img 
                            src={skill.iconUrl} 
                            alt={skill.name} 
                            width="16" 
                            height="16"
                            className="opacity-70 group-hover:opacity-100 transition-opacity sm:w-[18px] sm:h-[18px]" 
                            style={{ filter: 'brightness(0) invert(1)' }}
                          />
                        ) : (
                          <span className="text-sm sm:text-base opacity-70 group-hover:opacity-100 transition-opacity">{skill.icon}</span>
                        )}
                        <div className={`w-1.5 h-1.5 rounded-full ${skill.level === 'advanced' ? 'bg-emerald-400' : 'bg-amber-400'}`} />
                      </div>
                      <div className="text-xs sm:text-sm text-white font-medium truncate">{skill.name}</div>
                      <div className={`text-[10px] sm:text-xs ${getLevelColor(skill.level)} mt-0.5 truncate`}>
                        {skill.level}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* Tools Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-8 sm:mb-12"
        >
          <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6 px-2 sm:px-0">
            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-gray-600 to-gray-600" />
            <h3 className="text-base sm:text-lg md:text-xl font-bold text-white whitespace-nowrap">
              Development Tools
            </h3>
            <div className="h-px flex-1 bg-gradient-to-l from-transparent via-gray-600 to-gray-600" />
          </div>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 sm:gap-4">
            {tools.map((tool, index) => (
              <motion.div
                key={tool.name}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                viewport={{ once: true }}
                whileHover={{ y: -4 }}
                className="bg-gray-900 p-3 sm:p-4 rounded-lg border border-gray-700 hover:border-gray-500 transition-all"
              >
                <div className="flex items-center gap-2 sm:gap-3 mb-1 sm:mb-2">
                  <img 
                    src={tool.iconUrl} 
                    alt={tool.name} 
                    width="20" 
                    className="opacity-80 w-5 h-5 sm:w-[22px] sm:h-[22px]" 
                    style={{ filter: 'brightness(0) invert(1)' }}
                  />
                  <div className="text-xs sm:text-sm font-semibold text-white truncate">{tool.name}</div>
                </div>
                <div className="text-[10px] sm:text-xs text-gray-400 truncate">{tool.note}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Personal Philosophy */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="bg-gray-900 p-4 sm:p-6 rounded-lg border border-gray-700"
        >
          <div className="flex items-start gap-2 sm:gap-3">
            <div className="text-xl sm:text-2xl flex-shrink-0">💡</div>
            <div className="flex-1 min-w-0">
              <h4 className="text-sm sm:text-base text-white font-semibold mb-1 sm:mb-2">Learning by Building</h4>
              <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">
                Built a Redis clone to understand in-memory databases. Recreated Zerodha's trading platform to learn financial systems. 
                Developed a full streaming service with HLS and WebRTC. That's how I actually learn tech - not by watching tutorials, 
                but by rebuilding complex systems from scratch.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default Skills
