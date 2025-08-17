"use client"

import type React from "react"
import { createContext, useContext, useState, useCallback } from "react"

interface Message {
  id: string
  role: "user" | "assistant"
  content: string
  timestamp: Date
}

interface ChatContextType {
  messages: Message[]
  isLoading: boolean
  isOpen: boolean
  addMessage: (content: string, role: "user" | "assistant") => void
  sendMessage: (content: string) => Promise<void>
  toggleChat: () => void
  clearMessages: () => void
}

const ChatContext = createContext<ChatContextType | null>(null)

export function ChatProvider({ children }: { children: React.ReactNode }) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      role: "assistant",
      content:
        "Hi! I'm your Walmart shopping assistant. I can help you find products, compare prices, and answer questions about your shopping. What can I help you with today?",
      timestamp: new Date(),
    },
  ])
  const [isLoading, setIsLoading] = useState(false)
  const [isOpen, setIsOpen] = useState(false)

  const addMessage = useCallback((content: string, role: "user" | "assistant") => {
    const newMessage: Message = {
      id: Date.now().toString(),
      role,
      content,
      timestamp: new Date(),
    }
    setMessages((prev) => [...prev, newMessage])
  }, [])

  const sendMessage = useCallback(
    async (content: string) => {
      // Add user message
      addMessage(content, "user")
      setIsLoading(true)

      try {
        const response = await fetch("/api/chat", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            messages: [...messages, { role: "user", content }],
          }),
        })

        if (!response.ok) {
          throw new Error("Failed to send message")
        }

        const data = await response.json()
        addMessage(data.message, "assistant")
      } catch (error) {
        console.error("Error sending message:", error)
        addMessage("I'm sorry, I'm having trouble responding right now. Please try again later.", "assistant")
      } finally {
        setIsLoading(false)
      }
    },
    [messages, addMessage],
  )

  const toggleChat = useCallback(() => {
    setIsOpen((prev) => !prev)
  }, [])

  const clearMessages = useCallback(() => {
    setMessages([
      {
        id: "welcome",
        role: "assistant",
        content:
          "Hi! I'm your Walmart shopping assistant. I can help you find products, compare prices, and answer questions about your shopping. What can I help you with today?",
        timestamp: new Date(),
      },
    ])
  }, [])

  return (
    <ChatContext.Provider
      value={{
        messages,
        isLoading,
        isOpen,
        addMessage,
        sendMessage,
        toggleChat,
        clearMessages,
      }}
    >
      {children}
    </ChatContext.Provider>
  )
}

export function useChat() {
  const context = useContext(ChatContext)
  if (!context) {
    throw new Error("useChat must be used within a ChatProvider")
  }
  return context
}
