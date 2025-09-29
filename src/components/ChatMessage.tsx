import React from 'react'
import { motion } from 'framer-motion'
import { User, Bot } from 'lucide-react'

interface Message {
  id: string
  content: string
  sender: 'user' | 'bot'
  timestamp: Date
}

interface ChatMessageProps {
  message: Message
  isDarkMode: boolean
}

const ChatMessage: React.FC<ChatMessageProps> = ({ message, isDarkMode }) => {
  const isUser = message.sender === 'user'
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}
    >
      <div className={`flex items-start space-x-3 max-w-[80%] ${isUser ? 'flex-row-reverse space-x-reverse' : ''}`}>
        {/* Avatar */}
        <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
          isUser 
            ? 'bg-sfit-red text-white' 
            : 'bg-sfit-green text-white'
        }`}>
          {isUser ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
        </div>
        
        {/* Message Content */}
        <div className={`flex flex-col ${isUser ? 'items-end' : 'items-start'}`}>
          <div className={`px-4 py-3 rounded-2xl shadow-sm ${
            isUser
              ? 'bg-sfit-red text-white rounded-br-md'
              : isDarkMode
              ? 'bg-gray-700 text-gray-100 rounded-bl-md'
              : 'bg-gray-100 text-gray-900 rounded-bl-md'
          }`}>
            <div className="whitespace-pre-wrap break-words">
              {message.content}
            </div>
          </div>
          
          {/* Timestamp */}
          <span className={`text-xs mt-1 px-2 ${
            isDarkMode ? 'text-gray-400' : 'text-gray-500'
          }`}>
            {message.timestamp.toLocaleTimeString([], { 
              hour: '2-digit', 
              minute: '2-digit' 
            })}
          </span>
        </div>
      </div>
    </motion.div>
  )
}

export default ChatMessage
