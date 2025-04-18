import { useState, useRef, useEffect } from 'react';
import { FaPaperPlane, FaRobot, FaUser } from 'react-icons/fa';
import './AI.css';

function AI() {
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: 'Salom! Men sizning sun\'iy intellekt yordamchingizman. Sizga qanday yordam bera olaman?',
      sender: 'ai',
      timestamp: new Date().toISOString(),
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const chatContainerRef = useRef(null);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    // Add user message
    const userMessage = {
      id: messages.length + 1,
      text: inputValue,
      sender: 'user',
      timestamp: new Date().toISOString(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    // Simulate AI response (replace with actual API call)
    setTimeout(() => {
      const aiMessage = {
        id: messages.length + 2,
        text: 'Bu yerda AI javobi bo\'ladi. Haqiqiy API integratsiyasi qo\'shilganda, bu o\'rniga haqiqiy javob keladi.',
        sender: 'ai',
        timestamp: new Date().toISOString(),
      };
      setMessages(prev => [...prev, aiMessage]);
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="ai-container">
      {/* Introduction Section */}
      <div className="intro-section">
        <h2>AI Yordamchi</h2>
        <p>
          Men sizga dasturlash, dizayn va boshqa texnologiyalar bo'yicha yordam bera olaman.
          Savolingizni yozing va tez orada javob oling.
        </p>
      </div>

      {/* Chat Container */}
      <div className="chat-container" ref={chatContainerRef}>
        {messages.map(message => (
          <div
            key={message.id}
            className={`message ${message.sender === 'user' ? 'user-message' : 'ai-message'}`}
          >
            <div className="message-icon">
              {message.sender === 'user' ? <FaUser /> : <FaRobot />}
            </div>
            <div className="message-content">
              <p>{message.text}</p>
              <span className="message-time">
                {new Date(message.timestamp).toLocaleTimeString()}
              </span>
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="message ai-message">
            <div className="message-icon">
              <FaRobot />
            </div>
            <div className="message-content">
              <div className="typing-indicator">
                <span></span>
                <span></span>
                <span></span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Input Section */}
      <form className="input-section" onSubmit={handleSubmit}>
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Savolingizni yozing..."
          disabled={isLoading}
        />
        <button type="submit" disabled={isLoading}>
          <FaPaperPlane />
        </button>
      </form>
    </div>
  );
}

export default AI; 