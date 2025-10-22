import { motion } from 'framer-motion'
import { useState } from 'react'

const Contact = ({ setActiveSection }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState(null)

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    setTimeout(() => {
      setIsSubmitting(false)
      setSubmitStatus('success')
      setFormData({ name: '', email: '', subject: '', message: '' })
    }, 2000)
  }

  const contactInfo = [
    {
      icon: "📧",
      label: "Email",
      value: "atithisingh.dev@gmail.com",
      link: "mailto:atithisingh.dev@gmail.com"
    },
    {
      icon: "💼",
      label: "LinkedIn",
      value: "linkedin.com/in/singhatithi",
      link: "https://www.linkedin.com/in/singhatithi"
    },
    {
      icon: "🐙",
      label: "GitHub",
      value: "github.com/atithi4dev",
      link: "https://github.com/atithi4dev"
    },
    {
      icon: "🐦",
      label: "Twitter",
      value: "@bifreak_dev",
      link: "https://twitter.com/bifreak_dev"
    }
  ]

  return (
    <section id="contact" className="section relative">
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
            <span className="gradient-text">Get In Touch</span>
          </h2>
          <div className="text-terminal-green text-xs sm:text-sm font-mono mb-3 sm:mb-4">
            <span className="cursor-blink">$</span> echo "Let's connect!"
          </div>
          <p className="text-sm sm:text-base md:text-lg text-gray-400 max-w-3xl mx-auto px-4">
            Open to interesting backend/infrastructure opportunities. 
            Let's discuss systems programming, distributed systems, or any complex technical challenges.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8 sm:gap-12">
          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-6 sm:space-y-8"
          >
            <div>
              <h3 className="text-xl sm:text-2xl font-bold text-terminal-green mb-4 sm:mb-6 px-4 sm:px-0">
                Contact Information
              </h3>
              <div className="space-y-3 sm:space-y-4 px-4 sm:px-0">
                {contactInfo.map((info, index) => (
                  <motion.a
                    key={index}
                    href={info.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="flex items-center space-x-3 sm:space-x-4 p-3 sm:p-4 bg-terminal-bg border border-terminal-green/20 rounded-lg hover:border-terminal-green/40 transition-colors group"
                  >
                    <span className="text-xl sm:text-2xl">{info.icon}</span>
                    <div>
                      <div className="font-semibold text-sm sm:text-base text-white group-hover:text-terminal-green transition-colors">
                        {info.label}
                      </div>
                      <div className="text-gray-400 text-xs sm:text-sm break-all">{info.value}</div>
                    </div>
                  </motion.a>
                ))}
              </div>
            </div>

            {/* Availability */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
              className="bg-terminal-bg p-4 sm:p-6 rounded-lg border border-terminal-green/20 mx-4 sm:mx-0"
            >
              <h4 className="text-base sm:text-lg font-bold text-terminal-green mb-3 sm:mb-4">
                Current Status
              </h4>
              <div className="space-y-2 sm:space-y-3">
                <div className="flex items-center space-x-3">
                  <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 bg-green-400 rounded-full animate-pulse flex-shrink-0"></div>
                  <span className="text-white text-xs sm:text-base">Available for opportunities</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 bg-blue-400 rounded-full flex-shrink-0"></div>
                  <span className="text-gray-300 text-xs sm:text-base">Open to backend/infrastructure roles</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 bg-yellow-400 rounded-full flex-shrink-0"></div>
                  <span className="text-gray-300 text-xs sm:text-base">Interested in distributed systems</span>
                </div>
              </div>
            </motion.div>

            {/* Quick Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              viewport={{ once: true }}
              className="bg-terminal-bg p-4 sm:p-6 rounded-lg border border-terminal-green/20 mx-4 sm:mx-0"
            >
              <h4 className="text-base sm:text-lg font-bold text-terminal-green mb-3 sm:mb-4">
                Quick Facts
              </h4>
              <div className="grid grid-cols-2 gap-3 sm:gap-4 text-center">
                <div>
                  <div className="text-xl sm:text-2xl font-bold text-terminal-green">3+</div>
                  <div className="text-xs sm:text-sm text-gray-400">Years Learning</div>
                </div>
                <div>
                  <div className="text-xl sm:text-2xl font-bold text-terminal-green">15+</div>
                  <div className="text-xs sm:text-sm text-gray-400">Projects Built</div>
                </div>
                <div>
                  <div className="text-xl sm:text-2xl font-bold text-terminal-green">5+</div>
                  <div className="text-xs sm:text-sm text-gray-400">OS Experience</div>
                </div>
                <div>
                  <div className="text-xl sm:text-2xl font-bold text-terminal-green">∞</div>
                  <div className="text-xs sm:text-sm text-gray-400">Curiosity</div>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="bg-terminal-bg p-4 sm:p-6 md:p-8 rounded-lg border border-terminal-green/20 mx-4 sm:mx-0"
          >
            <h3 className="text-xl sm:text-2xl font-bold text-terminal-green mb-4 sm:mb-6">
              Send a Message
            </h3>
            
            <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
              <div className="grid md:grid-cols-2 gap-4 sm:gap-6">
                <div>
                  <label htmlFor="name" className="block text-xs sm:text-sm font-semibold text-white mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-terminal-gray border border-terminal-green/30 rounded-lg text-white text-sm sm:text-base placeholder-gray-400 focus:border-terminal-green focus:outline-none transition-colors"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-xs sm:text-sm font-semibold text-white mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-terminal-gray border border-terminal-green/30 rounded-lg text-white text-sm sm:text-base placeholder-gray-400 focus:border-terminal-green focus:outline-none transition-colors"
                    placeholder="your@email.com"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="subject" className="block text-xs sm:text-sm font-semibold text-white mb-2">
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-terminal-gray border border-terminal-green/30 rounded-lg text-white text-sm sm:text-base placeholder-gray-400 focus:border-terminal-green focus:outline-none transition-colors"
                  placeholder="What's this about?"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-xs sm:text-sm font-semibold text-white mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={6}
                  className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-terminal-gray border border-terminal-green/30 rounded-lg text-white text-sm sm:text-base placeholder-gray-400 focus:border-terminal-green focus:outline-none transition-colors resize-none"
                  placeholder="Tell me about your project, opportunity, or just say hello..."
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full btn-terminal text-sm sm:text-base py-2 sm:py-3 hover:scale-105 transform transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center space-x-2">
                    <div className="w-4 h-4 border-2 border-terminal-green border-t-transparent rounded-full animate-spin"></div>
                    <span>Sending...</span>
                  </span>
                ) : (
                  'Send Message'
                )}
              </button>

              {submitStatus === 'success' && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-center text-terminal-green text-xs sm:text-sm"
                >
                  Message sent successfully! I'll get back to you soon.
                </motion.div>
              )}
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default Contact
