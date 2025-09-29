import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Send, 
  Mic, 
  Volume2, 
  VolumeX, 
  Moon, 
  Sun, 
  MessageCircle,
  Trash2
} from 'lucide-react'
import ChatMessage from './components/ChatMessage'
import TypingIndicator from './components/TypingIndicator'
import FAQButtons from './components/FAQButtons'
import { sendMessageToOpenAI } from './services/openai'
import { useSpeechRecognition } from './hooks/useSpeechRecognition'
import { useTextToSpeech } from './hooks/useTextToSpeech'
import { useLocalStorage } from './hooks/useLocalStorage'

interface Message {
  id: string
  content: string
  sender: 'user' | 'bot'
  timestamp: Date
}

const SFIT_KNOWLEDGE_BASE = `
You are SFITBot, an expert admission assistant for St. Francis Institute of Technology (SFIT), Borivali, Mumbai.

=== COURSES OFFERED ===
- B.E. Computer Engineering (CE)
- B.E. Information Technology (IT)
- B.E. Electronics & Computer Science (ECS)
- B.E. Artificial Intelligence & Data Science (AI & DS)

=== ELIGIBILITY ===
- Passed 12th (HSC) with Physics + Math + Chemistry/CS/Biology/IT
- Appeared for MHT-CET or JEE Main
- Minimum 45% marks (General) / 40% (Reserved)

=== CUTOFFS 2023 (Approx.) ===
- CE: 97.2 percentile (CET)
- IT: 96.5+
- AI-DS: 94+
- ECS: 91+

=== ADMISSION PROCESS ===
- Through CAP Rounds (CET Cell)
- CAP Round 1: Freeze/Float
- CAP Round 2: Upgrades
- CAP Round 3 / Institute Level Round (ILR) if seats remain
- 51% seats reserved for Christian Minority students

=== DOCUMENTS REQUIRED ===
- CET/JEE scorecard
- 10th & 12th marksheets
- Aadhar card
- Domicile certificate (Maharashtra)
- Caste certificate (if applicable)
- Minority certificate (Christian quota)
- School Leaving Certificate
- Passport photos
- Income certificate (for scholarships)

=== FEES ===
- Approx. ₹1,75,000 per year
- Decided by Shikshan Shulka Samiti (SSS)

=== SCHOLARSHIPS ===
- Government scholarships (SC/ST/OBC/NT/VJNT)
- TFWS (Tuition Fee Waiver) for income < ₹8L
- EBC for General category
- Minority scholarships
- Merit-based internal scholarships

=== LOCATION ===
- Mt. Poinsur, S.V.P. Road, Borivali (W), Mumbai-400103
- 5-7 mins from Borivali Railway Station (West)

=== HOSTEL ===
- No in-house hostel
- Many PGs available nearby

=== PLACEMENTS 2023 ===
- Highest: ₹13 LPA
- Average: ₹4.8-5.5 LPA
- Top recruiters: TCS, LTI, Infosys, Capgemini, Morgan Stanley, Accenture
- 90%+ placement rate for CS/IT/AI branches

=== CAMPUS FACILITIES ===
- Wi-Fi, modern labs, library, gym, canteen
- Basketball court, prayer room

=== FESTIVALS ===
- Cognition (Technical Fest)
- Verve (Cultural Fest)
- Sports Week, Hackathons

=== CLUBS ===
- Coding Club, Rotaract, NSS, Robotics, IEEE, CSI, IETE, ACM

=== CONTACT ===
- Website: https://sfit.ac.in/admission
- For ILR: Fill form on SFIT website

Answer naturally in the user's language (English/Hindi/Hinglish). Be concise but complete. If unsure about any information, guide users to contact SFIT admissions office.
`

function App() {
  const [messages, setMessages] = useLocalStorage<Message[]>('sfit-chat-history', [])
  const [inputMessage, setInputMessage] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [isDarkMode, setIsDarkMode] = useLocalStorage('sfit-dark-mode', false)
  const [isTTSEnabled, setIsTTSEnabled] = useLocalStorage('sfit-tts-enabled', false)
  const [isRecording, setIsRecording] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const {
    startListening,
    stopListening,
    isListening,
    transcript,
    isSupported: isSpeechSupported
  } = useSpeechRecognition()

  const { speak, stopSpeaking, isSpeaking } = useTextToSpeech()

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  useEffect(() => {
    if (transcript) {
      setInputMessage(transcript)
    }
  }, [transcript])

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [isDarkMode])

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputMessage.trim(),
      sender: 'user',
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setInputMessage('')
    setIsTyping(true)

    try {
      const response = await sendMessageToOpenAI(inputMessage.trim(), SFIT_KNOWLEDGE_BASE, messages)
      
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: response,
        sender: 'bot',
        timestamp: new Date()
      }

      setMessages(prev => [...prev, botMessage])
      
      if (isTTSEnabled) {
        speak(response)
      }
    } catch (error) {
      console.error('Error sending message:', error)
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: 'Sorry, I encountered an error. Please try again or contact SFIT admissions office for assistance.',
        sender: 'bot',
        timestamp: new Date()
      }
      setMessages(prev => [...prev, errorMessage])
    } finally {
      setIsTyping(false)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  const handleVoiceToggle = () => {
    if (isRecording) {
      stopListening()
      setIsRecording(false)
    } else {
      startListening()
      setIsRecording(true)
    }
  }

  const handleFAQClick = (question: string) => {
    setInputMessage(question)
  }

  const clearChat = () => {
    setMessages([])
    stopSpeaking()
  }

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode)
  }

  const toggleTTS = () => {
    setIsTTSEnabled(!isTTSEnabled)
    if (isTTSEnabled && isSpeaking) {
      stopSpeaking()
    }
  }

  return (
    <div className={`min-h-screen transition-colors duration-300 flex flex-col ${
      isDarkMode ? 'bg-gray-900 text-white' : 'bg-gradient-to-br from-sfit-green/10 to-sfit-red/10'
    }`}>
      {/* Header */}
      <header className={`sticky top-0 z-50 shadow-lg ${
        isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
      } border-b`}>
        <div className="max-w-4xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-sfit-red to-sfit-green rounded-full flex items-center justify-center">
                <MessageCircle className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-sfit-red">SFITBot</h1>
                <p className="text-sm text-gray-600 dark:text-gray-400">Admission Assistant</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <button
                onClick={toggleTTS}
                className={`p-2 rounded-full transition-colors ${
                  isTTSEnabled 
                    ? 'bg-sfit-green text-white' 
                    : isDarkMode ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
                }`}
                title={isTTSEnabled ? 'Disable Text-to-Speech' : 'Enable Text-to-Speech'}
              >
                {isTTSEnabled ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}
              </button>
              
              <button
                onClick={toggleDarkMode}
                className={`p-2 rounded-full transition-colors ${
                  isDarkMode ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
                }`}
                title="Toggle Dark Mode"
              >
                {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </button>
              
              <button
                onClick={clearChat}
                className={`p-2 rounded-full transition-colors ${
                  isDarkMode ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
                }`}
                title="Clear Chat"
              >
                <Trash2 className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Chat Container */}
      <main className="max-w-4xl mx-auto px-4 py-6 flex-1 overflow-y-auto">
        {/* Welcome Message */}
        {messages.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-8"
          >
            <div className={`inline-block p-8 rounded-2xl shadow-lg ${
              isDarkMode ? 'bg-gray-800' : 'bg-white'
            }`}>
              <div className="w-16 h-16 bg-gradient-to-r from-sfit-red to-sfit-green rounded-full flex items-center justify-center mx-auto mb-4">
                <MessageCircle className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-sfit-red mb-2">Welcome to SFITBot!</h2>
              <p className={`text-lg ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                I'm your AI assistant for SFIT admissions. Ask me anything about courses, eligibility, fees, or campus life!
              </p>
            </div>
          </motion.div>
        )}

        {/* FAQ Buttons */}
        {messages.length === 0 && (
          <FAQButtons onFAQClick={handleFAQClick} isDarkMode={isDarkMode} />
        )}

        {/* Messages */}
        <div className={`space-y-4 mb-6 min-h-[400px] overflow-y-auto ${messages.length > 0 ? 'mt-8' : ''}`}>
          <AnimatePresence>
            {messages.map((message) => (
              <ChatMessage
                key={message.id}
                message={message}
                isDarkMode={isDarkMode}
              />
            ))}
          </AnimatePresence>
          
          {isTyping && <TypingIndicator isDarkMode={isDarkMode} />}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className={`sticky bottom-0 p-4 rounded-t-2xl shadow-lg ${
          isDarkMode ? 'bg-gray-800 border-t border-gray-700' : 'bg-white border-t border-gray-200'
        }`}>
          <div className="flex items-end space-x-3">
            <div className="flex-1 relative">
              <textarea
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask me anything about SFIT admissions..."
                className={`w-full p-3 pr-12 rounded-xl border resize-none transition-colors ${
                  isDarkMode
                    ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-sfit-green'
                    : 'bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-500 focus:border-sfit-green'
                } focus:outline-none focus:ring-2 focus:ring-sfit-green/20`}
                rows={1}
                style={{
                  minHeight: '48px',
                  maxHeight: '120px',
                  height: 'auto',
                }}
                onInput={(e) => {
                  const target = e.target as HTMLTextAreaElement
                  target.style.height = 'auto'
                  target.style.height = Math.min(target.scrollHeight, 120) + 'px'
                }}
              />
              
              {/* Voice Input Button */}
              {isSpeechSupported && (
                <button
                  onClick={handleVoiceToggle}
                  disabled={isListening}
                  className={`absolute right-3 top-3 p-1 rounded-full transition-colors ${
                    isRecording
                      ? 'bg-sfit-red text-white animate-pulse'
                      : isDarkMode
                      ? 'text-gray-400 hover:text-sfit-red'
                      : 'text-gray-500 hover:text-sfit-red'
                  }`}
                  title="Voice Input"
                >
                  {isRecording ? (
                    <div className="flex space-x-1">
                      <div className="w-1 h-3 bg-white rounded-full wave-animation"></div>
                      <div className="w-1 h-3 bg-white rounded-full wave-animation"></div>
                      <div className="w-1 h-3 bg-white rounded-full wave-animation"></div>
                      <div className="w-1 h-3 bg-white rounded-full wave-animation"></div>
                    </div>
                  ) : (
                    <Mic className="w-5 h-5" />
                  )}
                </button>
              )}
            </div>
            
            <button
              onClick={handleSendMessage}
              disabled={!inputMessage.trim() || isTyping}
              className={`p-3 rounded-xl transition-all ${
                inputMessage.trim() && !isTyping
                  ? 'bg-sfit-green text-white hover:bg-sfit-green/90 shadow-lg'
                  : isDarkMode
                  ? 'bg-gray-700 text-gray-500 cursor-not-allowed'
                  : 'bg-gray-200 text-gray-400 cursor-not-allowed'
              }`}
              title="Send Message"
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
          
          {/* Voice Status */}
          {isListening && (
            <div className="mt-2 text-center">
              <span className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                🎤 Listening... Speak now
              </span>
            </div>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className={`mt-12 py-6 text-center border-t ${
        isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
      }`}>
        <div className="max-w-4xl mx-auto px-4">
          <div className="flex items-center justify-center space-x-2 mb-2">
            <div className="w-6 h-6 bg-gradient-to-r from-sfit-red to-sfit-green rounded-full flex items-center justify-center">
              <MessageCircle className="w-4 h-4 text-white" />
            </div>
            <span className="font-semibold text-sfit-red">Powered by SFIT</span>
          </div>
          <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            St. Francis Institute of Technology, Borivali, Mumbai
          </p>
          <p className={`text-xs mt-1 ${isDarkMode ? 'text-gray-500' : 'text-gray-500'}`}>
            For official information, visit <a href="https://sfit.ac.in/admission" target="_blank" rel="noopener noreferrer" className="text-sfit-green hover:underline">sfit.ac.in</a>
          </p>
        </div>
      </footer>
    </div>
  )
}

export default App
