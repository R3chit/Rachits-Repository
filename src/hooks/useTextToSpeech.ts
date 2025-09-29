import { useState, useCallback } from 'react'

interface TextToSpeechHook {
  speak: (text: string) => void
  stopSpeaking: () => void
  isSpeaking: boolean
}

export const useTextToSpeech = (): TextToSpeechHook => {
  const [isSpeaking, setIsSpeaking] = useState(false)
  const [speechSynthesis, setSpeechSynthesis] = useState<SpeechSynthesis | null>(null)
  const [, setCurrentUtterance] = useState<SpeechSynthesisUtterance | null>(null)

  useState(() => {
    if ('speechSynthesis' in window) {
      setSpeechSynthesis(window.speechSynthesis)
    }
  })

  const speak = useCallback((text: string) => {
    if (!speechSynthesis) return

    // Stop any current speech
    stopSpeaking()

    const utterance = new SpeechSynthesisUtterance(text)
    
    // Set voice properties
    utterance.rate = 0.9
    utterance.pitch = 1
    utterance.volume = 0.8

    // Try to find a suitable voice (Hindi or English)
    const voices = speechSynthesis.getVoices()
    const hindiVoice = voices.find(voice => 
      voice.lang.includes('hi') || voice.lang.includes('HI')
    )
    const englishVoice = voices.find(voice => 
      voice.lang.includes('en') || voice.lang.includes('EN')
    )
    
    // Use Hindi voice if available, otherwise English
    if (hindiVoice) {
      utterance.voice = hindiVoice
    } else if (englishVoice) {
      utterance.voice = englishVoice
    }

    utterance.onstart = () => {
      setIsSpeaking(true)
    }

    utterance.onend = () => {
      setIsSpeaking(false)
      setCurrentUtterance(null)
    }

    utterance.onerror = (event) => {
      console.error('Speech synthesis error:', event.error)
      setIsSpeaking(false)
      setCurrentUtterance(null)
    }

    setCurrentUtterance(utterance)
    speechSynthesis.speak(utterance)
  }, [speechSynthesis])

  const stopSpeaking = useCallback(() => {
    if (speechSynthesis) {
      speechSynthesis.cancel()
      setIsSpeaking(false)
      setCurrentUtterance(null)
    }
  }, [speechSynthesis])

  return {
    speak,
    stopSpeaking,
    isSpeaking
  }
}
