interface Message {
  id: string
  content: string
  sender: 'user' | 'bot'
  timestamp: Date
}

export const sendMessageToOpenAI = async (
  userMessage: string,
  knowledgeBase: string,
  chatHistory: Message[]
): Promise<string> => {
  const apiKey = import.meta.env.VITE_OPENAI_API_KEY
  
  if (!apiKey) {
    throw new Error('OpenAI API key not found. Please add VITE_OPENAI_API_KEY to your environment variables.')
  }

  // Convert chat history to OpenAI format
  const messages = [
    {
      role: 'system',
      content: knowledgeBase
    },
    ...chatHistory.slice(-10).map(msg => ({ // Keep last 10 messages for context
      role: msg.sender === 'user' ? 'user' : 'assistant',
      content: msg.content
    })),
    {
      role: 'user',
      content: userMessage
    }
  ]

  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: messages,
        max_tokens: 500,
        temperature: 0.7,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0,
      }),
    })

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      throw new Error(`OpenAI API error: ${response.status} - ${errorData.error?.message || 'Unknown error'}`)
    }

    const data = await response.json()
    
    if (!data.choices || !data.choices[0] || !data.choices[0].message) {
      throw new Error('Invalid response format from OpenAI API')
    }

    return data.choices[0].message.content.trim()
  } catch (error) {
    console.error('Error calling OpenAI API:', error)
    
    if (error instanceof Error) {
      if (error.message.includes('API key')) {
        throw new Error('Invalid or missing OpenAI API key. Please check your configuration.')
      } else if (error.message.includes('quota')) {
        throw new Error('OpenAI API quota exceeded. Please check your usage limits.')
      } else if (error.message.includes('rate limit')) {
        throw new Error('Too many requests. Please wait a moment and try again.')
      }
    }
    
    throw new Error('Failed to get response from AI. Please try again later.')
  }
}
