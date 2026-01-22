import { useState, useEffect } from 'react'
import './App.css'
import { io } from "socket.io-client"

function App() {
  // Chat history ko store karne ke liye
  const [messages, setMessages] = useState([])
  const [inputValue, setInputValue] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [socket, setSocket] = useState(null)

  // Socket connection setup
  useEffect(() => {
    const socketInstance = io('http://localhost:3000');
    setSocket(socketInstance)

    // AI response receive karne par
    socketInstance.on('ai-message-response', (response) => {
      const aiMessage = {
        id: Date.now(),
        text: response,
        sender: 'ai',
        timestamp: new Date().toLocaleTimeString()
      }
      setMessages((prev) => [...prev, aiMessage])
      setIsLoading(false)
    })

    return () => socketInstance.close()
  }, [])

  // Send button click karne par
  const handleSendMessage = () => {
    // Agar input empty hai to return karo
    if (inputValue.trim() === '') return

    // User ka message banao
    const userMessage = {
      id: Date.now(),
      text: inputValue,
      sender: 'user',
      timestamp: new Date().toLocaleTimeString()
    }

    // Message ko screen par add karo
    setMessages((prev) => [...prev, userMessage])

    // AI ko message bhejo socket se
    if (socket) {
      socket.emit('ai-message', { prompt: inputValue })
    }

    // Input field ko empty karo
    setInputValue('')
    setIsLoading(true)
  }

  // Enter key press karne par message bhejne ke liye
  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !isLoading) {
      handleSendMessage()
    }
  }

  return (
    <div className="chat-container">
      {/* Chat header */}
      <div className="chat-header">
        <h1>AI ChatBot</h1>
        <p>Chat with Groq AI</p>
      </div>

      {/* Messages display area */}
      <div className="chat-messages">
        {messages.length === 0 ? (
          <div className="empty-state">
            <p>No messages yet. Start a conversation!</p>
          </div>
        ) : (
          messages.map((message) => (
            <div key={message.id} className={`message message-${message.sender}`}>
              <div className="message-content">
                <p>{message.text}</p>
                <span className="message-time">{message.timestamp}</span>
              </div>
            </div>
          ))
        )}
        {isLoading && (
          <div className="message message-ai">
            <div className="message-content">
              <p className="typing">AI is typing...</p>
            </div>
          </div>
        )}
      </div>

      {/* Input area */}
      <div className="chat-input-area">
        <input
          type="text"
          className="chat-input"
          placeholder="Type your message here..."
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyPress={handleKeyPress}
          disabled={isLoading}
        />
        <button
          className="send-button"
          onClick={handleSendMessage}
          disabled={isLoading}
        >
          {isLoading ? 'Sending...' : 'Send'}
        </button>
      </div>
    </div>
  )
}

export default App
