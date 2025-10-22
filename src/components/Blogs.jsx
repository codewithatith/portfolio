import { motion } from 'framer-motion'
import { blogs } from '../data/blogs'
import { useState } from 'react'
import ReactMarkdown from 'react-markdown'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism'

const Blogs = ({ setActiveSection }) => {
  const [selectedBlog, setSelectedBlog] = useState(null)

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'Expert': return 'text-red-400 bg-red-900/20'
      case 'Advanced': return 'text-yellow-400 bg-yellow-900/20'
      case 'Intermediate': return 'text-blue-400 bg-blue-900/20'
      default: return 'text-green-400 bg-green-900/20'
    }
  }

  const BlogCard = ({ blog, index }) => (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: index * 0.1 }}
      viewport={{ once: true }}
      className="bg-terminal-bg border border-terminal-green/20 rounded-lg p-6 hover:border-terminal-green/40 transition-all duration-300 cursor-pointer hover:scale-105"
      onClick={() => setSelectedBlog(blog)}
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h3 className="text-xl font-bold text-white mb-2">{blog.title}</h3>
          <p className="text-gray-300 text-sm leading-relaxed">{blog.excerpt}</p>
        </div>
        {blog.featured && (
          <span className="ml-4 px-2 py-1 bg-terminal-green/20 text-terminal-green text-xs font-semibold rounded">
            Featured
          </span>
        )}
      </div>

      <div className="flex flex-wrap items-center gap-4 mb-4">
        <span className="text-terminal-green text-sm">{blog.readTime}</span>
        <span className={`px-2 py-1 rounded text-xs font-semibold ${getDifficultyColor(blog.difficulty)}`}>
          {blog.difficulty}
        </span>
        <span className="text-gray-400 text-sm">{blog.date}</span>
      </div>

      <div className="flex flex-wrap gap-2">
        {blog.tags.map((tag) => (
          <span
            key={tag}
            className="px-2 py-1 bg-terminal-green/20 text-terminal-green rounded text-xs"
          >
            {tag}
          </span>
        ))}
      </div>
    </motion.div>
  )

  const BlogDetail = ({ blog, onClose }) => (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        className="bg-terminal-bg border border-terminal-green/20 rounded-lg max-w-4xl w-full max-h-[90vh] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-6 border-b border-terminal-green/20">
          <div className="flex items-start justify-between mb-4">
            <h2 className="text-2xl font-bold text-white">{blog.title}</h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-white transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <div className="flex flex-wrap items-center gap-4">
            <span className="text-terminal-green text-sm">{blog.readTime}</span>
            <span className={`px-2 py-1 rounded text-xs font-semibold ${getDifficultyColor(blog.difficulty)}`}>
              {blog.difficulty}
            </span>
            <span className="text-gray-400 text-sm">{blog.date}</span>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-200px)]">
          <ReactMarkdown
            components={{
              code({ node, inline, className, children, ...props }) {
                const match = /language-(\w+)/.exec(className || '')
                return !inline && match ? (
                  <SyntaxHighlighter
                    style={vscDarkPlus}
                    language={match[1]}
                    PreTag="div"
                    {...props}
                  >
                    {String(children).replace(/\n$/, '')}
                  </SyntaxHighlighter>
                ) : (
                  <code className={className} {...props}>
                    {children}
                  </code>
                )
              }
            }}
          >
            {blog.content}
          </ReactMarkdown>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-terminal-green/20">
          <div className="flex flex-wrap gap-2">
            {blog.tags.map((tag) => (
              <span
                key={tag}
                className="px-2 py-1 bg-terminal-green/20 text-terminal-green rounded text-xs"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </motion.div>
    </motion.div>
  )

  return (
    <section id="blogs" className="section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="gradient-text">Technical Blogs</span>
          </h2>
          <div className="text-terminal-green text-sm font-mono mb-4">
            <span className="cursor-blink">$</span> cat blogs/*.md
          </div>
          <p className="text-lg text-gray-400 max-w-3xl mx-auto">
            Deep-dive articles on complex backend topics, systems programming, and infrastructure. 
            Proving expertise through detailed technical writing.
          </p>
        </motion.div>

        {/* Featured Blogs */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <h3 className="text-2xl font-bold text-terminal-green mb-8 text-center">
            Featured Articles
          </h3>
          <div className="grid md:grid-cols-2 gap-6">
            {blogs.filter(blog => blog.featured).map((blog, index) => (
              <BlogCard key={blog.id} blog={blog} index={index} />
            ))}
          </div>
        </motion.div>

        {/* All Blogs */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <h3 className="text-2xl font-bold text-terminal-green mb-8 text-center">
            All Articles
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {blogs.map((blog, index) => (
              <BlogCard key={blog.id} blog={blog} index={index} />
            ))}
          </div>
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <div className="bg-terminal-bg p-8 rounded-lg border border-terminal-green/20 max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold text-terminal-green mb-4">
              More Technical Content
            </h3>
            <p className="text-gray-300 mb-6">
              Follow my technical journey as I explore distributed systems, 
              container internals, and building infrastructure from first principles.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="https://github.com/atithi4dev"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-terminal hover:scale-105 transform transition-all duration-300 inline-flex items-center justify-center space-x-2"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
                <span>GitHub</span>
              </a>
              <button
                onClick={() => setActiveSection('contact')}
                className="btn-terminal hover:scale-105 transform transition-all duration-300"
              >
                Get In Touch
              </button>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Blog Detail Modal */}
      {selectedBlog && (
        <BlogDetail blog={selectedBlog} onClose={() => setSelectedBlog(null)} />
      )}
    </section>
  )
}

export default Blogs
