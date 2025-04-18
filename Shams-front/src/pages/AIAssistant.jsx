import { useState, useRef, useEffect } from 'react';
import { BsSend, BsRobot, BsPerson } from 'react-icons/bs';
import './AIAssistant.css';

function AIAssistant() {
  const [message, setMessage] = useState('');
  const [chat, setChat] = useState([
    {
      type: 'ai',
      text: "Salom! Men sizning shaxsiy AI o'qituvchingizman. Qanday yordam bera olaman?"
    }
  ]);
  const chatEndRef = useRef(null);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [chat]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!message.trim()) return;

    // Add user message to chat
    const newChat = [...chat, { type: 'user', text: message }];
    
    // Simulate AI response (replace with actual AI integration)
    const aiResponse = {
      type: 'ai',
      text: "Men sizga yordam berishga tayyorman. Hozircha bu test javob, keyinchalik haqiqiy AI bilan almashtiriladi."
    };
    
    setChat([...newChat, aiResponse]);
    setMessage('');
  };

  return (
    <div className="ai-assistant">
      <div className="chat-header">
        <div className="ai-assistant-info">
          <BsRobot className="ai-icon" />
          <div>
            <h2>Sun'iy Intellekt Yordamchi</h2>
            <p>24/7 shaxsiy AI o'qituvchingiz</p>
          </div>
        </div>
      </div>
      
      <div className="chat-container">
        <div className="chat-messages">
          {chat.map((msg, index) => (
            <div key={index} className={`message ${msg.type}`}>
              <div className="message-icon">
                {msg.type === 'ai' ? <BsRobot /> : <BsPerson />}
              </div>
              <div className="message-content">
                {msg.text}
              </div>
            </div>
          ))}
          <div ref={chatEndRef} />
        </div>
        
        <form onSubmit={handleSubmit} className="message-form">
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Savolingizni yozing..."
            rows="3"
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSubmit(e);
              }
            }}
          />
          <button type="submit" className="send-button" disabled={!message.trim()}>
            <BsSend />
          </button>
        </form>
      </div>
    </div>
  );
}

export default AIAssistant;