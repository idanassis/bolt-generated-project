'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { FaPaperPlane } from 'react-icons/fa'

const Chat = () => {
  const [messages, setMessages] = useState<{ role: 'user' | 'assistant'; content: string }[]>([
    { role: 'assistant', content: "Hi! I'm an AI trained on Idan's resume. How can I help you learn more about his experience and skills?" }
  ])
  const [input, setInput] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim()) return

    // Add user message to chat
    setMessages(prev => [...prev, { role: 'user', content: input }])
    setInput('')

    // TODO: Implement actual LLM call with RAG here
    // For now, we'll just simulate a response
    setTimeout(() => {
      setMessages(prev => [...prev, { role: 'assistant', content: "That's a great question about Idan's experience. Could you please be more specific about what you'd like to know?" }])
    }, 1000)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white rounded-lg shadow-md overflow-hidden h-[400px] max-w-md w-full flex flex-col"
    >
      <div className="bg-blue-500 text-white p-4">
        <h2 className="text-xl font-bold">Chat with My Resume</h2>
      </div>
      <div className="flex-grow overflow-y-auto p-4 space-y-4 max-h-[300px]">
        {messages.map((message, index) => (
          <div key={index} className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-3/4 p-3 rounded-lg ${message.role === 'user' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}>
              {message.content}
            </div>
          </div>
        ))}
      </div>
      <form onSubmit={handleSubmit} className="p-4 border-t">
        <div className="flex items-center">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about Idan's experience or skills..."
            className="flex-grow px-3 py-1 text-sm border rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="bg-blue-500 text-white px-3 py-1 rounded-r-md hover:bg-blue-600 transition duration-300"
          >
            <FaPaperPlane />
          </button>
        </div>
      </form>
    </motion.div>
  )
}

export default Chat
