import React from 'react'
import { motion } from 'framer-motion'
import { BookOpen, GraduationCap, DollarSign, MapPin, Users, Trophy } from 'lucide-react'

interface FAQButtonsProps {
  onFAQClick: (question: string) => void
  isDarkMode: boolean
}

const faqQuestions = [
  {
    icon: BookOpen,
    question: "What courses does SFIT offer?",
    color: "from-blue-500 to-blue-600"
  },
  {
    icon: GraduationCap,
    question: "What are the eligibility criteria?",
    color: "from-green-500 to-green-600"
  },
  {
    icon: DollarSign,
    question: "What are the fees and scholarships?",
    color: "from-purple-500 to-purple-600"
  },
  {
    icon: MapPin,
    question: "Where is SFIT located?",
    color: "from-orange-500 to-orange-600"
  },
  {
    icon: Users,
    question: "What are the placement statistics?",
    color: "from-pink-500 to-pink-600"
  },
  {
    icon: Trophy,
    question: "What campus facilities are available?",
    color: "from-indigo-500 to-indigo-600"
  }
]

const FAQButtons: React.FC<FAQButtonsProps> = ({ onFAQClick, isDarkMode }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      className="mb-8"
    >
      <h3 className={`text-lg font-semibold mb-4 text-center ${
        isDarkMode ? 'text-gray-300' : 'text-gray-700'
      }`}>
        Quick Questions
      </h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        {faqQuestions.map((faq, index) => {
          const Icon = faq.icon
          return (
            <motion.button
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4 + index * 0.1 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => onFAQClick(faq.question)}
              className={`p-4 rounded-xl text-left transition-all duration-200 ${
                isDarkMode 
                  ? 'bg-gray-800 hover:bg-gray-700 border border-gray-700' 
                  : 'bg-white hover:bg-gray-50 border border-gray-200 shadow-sm'
              }`}
            >
              <div className="flex items-center space-x-3">
                <div className={`w-10 h-10 rounded-lg bg-gradient-to-r ${faq.color} flex items-center justify-center flex-shrink-0`}>
                  <Icon className="w-5 h-5 text-white" />
                </div>
                <span className={`text-sm font-medium ${
                  isDarkMode ? 'text-gray-200' : 'text-gray-700'
                }`}>
                  {faq.question}
                </span>
              </div>
            </motion.button>
          )
        })}
      </div>
    </motion.div>
  )
}

export default FAQButtons
