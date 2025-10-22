import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { blogs } from '../data/blogs'

const Blogs = () => {
  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'Expert': return 'text-red-400 bg-red-900/20'
      case 'Advanced': return 'text-yellow-400 bg-yellow-900/20'
      case 'Intermediate': return 'text-blue-400 bg-blue-900/20'
      default: return 'text-green-400 bg-green-900/20'
    }
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
              <span className="cursive-text">Technical Blogs</span>
            </h1>
            <div className="text-terminal-green text-sm font-mono mb-4">
              <span className="cursor-blink">$</span> cat blogs/*.md
            </div>
            <p className="text-lg text-gray-400 max-w-3xl mx-auto">
              Deep-dive articles on complex backend topics, systems programming, and infrastructure. 
              Proving expertise through detailed technical writing.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Featured Blogs */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <h2 className="text-3xl font-bold text-terminal-green mb-8 text-center">
              Featured Articles
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              {blogs.filter(blog => blog.featured).map((blog, index) => (
                <motion.div
                  key={blog.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-terminal-bg border border-terminal-green/20 rounded-lg p-6 hover:border-terminal-green/40 transition-all duration-300 hover:scale-105"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-white mb-2">{blog.title}</h3>
                      <p className="text-gray-300 text-sm leading-relaxed">{blog.excerpt}</p>
                    </div>
                    <span className="ml-4 px-2 py-1 bg-terminal-green/20 text-terminal-green text-xs font-semibold rounded">
                      Featured
                    </span>
                  </div>

                  <div className="flex flex-wrap items-center gap-4 mb-4">
                    <span className="text-terminal-green text-sm">{blog.readTime}</span>
                    <span className={`px-2 py-1 rounded text-xs font-semibold ${getDifficultyColor(blog.difficulty)}`}>
                      {blog.difficulty}
                    </span>
                    <span className="text-gray-400 text-sm">{blog.date}</span>
                  </div>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {blog.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-1 bg-terminal-green/20 text-terminal-green rounded text-xs"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <Link
                    to={`/blogs/${blog.slug}`}
                    className="btn-terminal hover:scale-105 transform transition-all duration-300 text-sm"
                  >
                    Read Article
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* All Blogs */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold text-terminal-green mb-8 text-center">
              All Articles
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {blogs.map((blog, index) => (
                <motion.div
                  key={blog.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-terminal-bg border border-terminal-green/20 rounded-lg p-6 hover:border-terminal-green/40 transition-all duration-300 hover:scale-105"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-white mb-2">{blog.title}</h3>
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

                  <div className="flex flex-wrap gap-2 mb-4">
                    {blog.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-1 bg-terminal-green/20 text-terminal-green rounded text-xs"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <Link
                    to={`/blogs/${blog.slug}`}
                    className="btn-terminal hover:scale-105 transform transition-all duration-300 text-sm"
                  >
                    Read Article
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default Blogs
