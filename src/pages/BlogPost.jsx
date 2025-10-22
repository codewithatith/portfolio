import { motion } from 'framer-motion'
import { useParams, Link } from 'react-router-dom'
import { blogs } from '../data/blogs'
import ReactMarkdown from 'react-markdown'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism'

const BlogPost = () => {
  const { slug } = useParams()
  const blog = blogs.find(b => b.slug === slug)

  if (!blog) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white mb-4">Blog Post Not Found</h1>
          <Link to="/blogs" className="btn-terminal">
            Back to Blogs
          </Link>
        </div>
      </div>
    )
  }

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
      {/* Header */}
      <section className="pt-20 pb-8 bg-terminal-gray/30">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-3xl md:text-5xl font-bold mb-6 text-white">
              {blog.title}
            </h1>
            
            <div className="flex flex-wrap items-center justify-center gap-4 mb-6">
              <span className="text-terminal-green text-sm">{blog.readTime}</span>
              <span className={`px-3 py-1 rounded text-sm font-semibold ${getDifficultyColor(blog.difficulty)}`}>
                {blog.difficulty}
              </span>
              <span className="text-gray-400 text-sm">{blog.date}</span>
            </div>

            <div className="flex flex-wrap justify-center gap-2 mb-6">
              {blog.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 bg-terminal-green/20 text-terminal-green rounded-full text-sm"
                >
                  {tag}
                </span>
              ))}
            </div>

            <Link
              to="/blogs"
              className="btn-terminal hover:scale-105 transform transition-all duration-300"
            >
              ← Back to Blogs
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <section className="py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="prose prose-invert prose-lg max-w-none"
          >
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
          </motion.div>
        </div>
      </section>

      {/* Navigation */}
      <section className="py-8 bg-terminal-gray/30">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <Link
              to="/blogs"
              className="btn-terminal hover:scale-105 transform transition-all duration-300"
            >
              ← All Blogs
            </Link>
            <div className="text-center">
              <p className="text-gray-400 text-sm mb-2">Found this helpful?</p>
              <motion.a
                href="https://github.com/atithi4dev"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                className="inline-flex items-center space-x-2 bg-terminal-green text-black px-6 py-3 rounded-lg font-semibold hover:bg-white transition-colors"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
                <span>View on GitHub</span>
              </motion.a>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default BlogPost
