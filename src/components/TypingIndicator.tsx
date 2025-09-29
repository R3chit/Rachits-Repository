import React from 'react'
import { motion } from 'framer-motion'
import { Bot } from 'lucide-react'

interface TypingIndicatorProps {
  isDarkMode: boolean
}

const TypingIndicator: React.FC<TypingIndicatorProps> = ({ isDarkMode }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex justify-start"
    >
      <div className="flex items-start space-x-3 max-w-[80%]">
        {/* Bot Avatar */}
        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-sfit-green text-white flex items-center justify-center">
          <Bot className="w-4 h-4" />
        </div>
        
        {/* Typing Animation */}
        <div className={`px-4 py-3 rounded-2xl shadow-sm rounded-bl-md ${
          isDarkMode ? 'bg-gray-700' : 'bg-gray-100'
        }`}>
          <div className="flex items-center space-x-1">
            <span className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              SFITBot is typing
            </span>
            <div className="flex space-x-1 ml-2">
              <motion.div
                className={`w-2 h-2 rounded-full ${
                  isDarkMode ? 'bg-gray-400' : 'bg-gray-500'
                }`}
                animate={{ opacity: [1, 0.3, 1] }}
                transition={{ duration: 1.5, repeat: Infinity, delay: 0 }}
              />
              <motion.div
                className={`w-2 h-2 rounded-full ${
                  isDarkMode ? 'bg-gray-400' : 'bg-gray-500'
                }`}
                animate={{ opacity: [1, 0.3, 1] }}
                transition={{ duration: 1.5, repeat: Infinity, delay: 0.2 }}
              />
              <motion.div
                className={`w-2 h-2 rounded-full ${
                  isDarkMode ? 'bg-gray-400' : 'bg-gray-500'
                }`}
                animate={{ opacity: [1, 0.3, 1] }}
                transition={{ duration: 1.5, repeat: Infinity, delay: 0.4 }}
              />
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default TypingIndicator
