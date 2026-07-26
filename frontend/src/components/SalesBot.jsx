import { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Phone, Mail } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { useNavigate } from 'react-router-dom';
import { API_BASE } from '../utils/api.js';

export default function SalesBot({ isOverlay = true }) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: 'assistant', text: "Hello! Welcome to Godslight Innovations Technology and Solar Energy. I'm your AI Sales Assistant. What service can I help you with today?" }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showWhatsApp, setShowWhatsApp] = useState(false); // Only show after prospect ready
  const scrollRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    scrollRef.current?.scrollTo(0, scrollRef.current.scrollHeight);
  }, [messages]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMsg = { role: 'user', text: input };
    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    try {
      console.log('Sending message to backend:', input);
      const response = await fetch(`${API_BASE}/api/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          message: input,
          history: messages.slice(0, -1).map(m => ({
            role: m.role === 'assistant' ? 'model' : m.role,
            parts: [{ text: m.text }]
          }))
        })
      });

      const data = await response.json();
      console.log('Backend response:', data);

      if (!response.ok) {
        throw new Error(data.error || 'Server responded with error');
      }

      let reply = data.reply;

      // Check for prospect signal
      if (reply.includes("PROSPECT_READY")) {
        setShowWhatsApp(true);
        reply = reply.replace("PROSPECT_READY", "");

        // Auto-send email lead capture
        await fetch(`${API_BASE}/api/chat/capture-lead`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ conversation: [...messages, { role: 'user', text: input }, { role: 'assistant', text: reply }] })
        });
      }

      setMessages((prev) => [...prev, { role: 'assistant', text: reply }]);
    } catch (err) {
      console.error('Chat error:', err);
      setMessages((prev) => [...prev, { role: 'assistant', text: "Sorry, I'm having trouble connecting. Please try WhatsApp directly!" }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handoffToWhatsApp = async () => {
    // Generate a structured summary using the AI before opening WhatsApp
    let summary = "I'm interested in GITSE services. Here are my details:\n\n";

    // We send the current conversation to the AI to summarize it into a structured format
    try {
      const response = await fetch(`${API_BASE}/api/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: "Summarize this conversation into a concise lead inquiry for a solar/technical sales engineer. Include: Service needed, Location, Estimated Requirements (if any), and any specific questions asked. Keep it professional and short.",
          history: messages.slice(0, -1).map(m => ({
            role: m.role === 'assistant' ? 'model' : m.role,
            parts: [{ text: m.text }]
          }))
        })
      });
      const data = await response.json();
      summary = data.reply || summary;
    } catch (err) {
      // Fallback if AI summarization fails
      summary += messages.map(m => `${m.role === 'user' ? 'Customer' : 'Bot'}: ${m.text}`).join('\n');
    }
    const encoded = encodeURIComponent(summary);
    window.open(`https://wa.me/2347064110671?text=${encoded}`, '_blank');
  };

  if (!isOverlay) {
      return (
    <div className="max-w-2xl mx-auto p-4 sm:p-6 bg-white dark:bg-brand-navy-800 rounded-2xl shadow-lg border border-gray-100 dark:border-white/10">
      <div className="flex items-center justify-between bg-brand-navy-900 p-4 text-white rounded-t-xl">
        <h3 className="font-bold text-xs sm:text-sm">Godslight AI Assistant</h3>
        <button onClick={() => navigate('/')}><X className="h-5 w-5" /></button>
      </div>

      <div ref={scrollRef} className="h-[400px] overflow-y-auto p-4 space-y-4 bg-gray-50 dark:bg-brand-navy-900/50">
        {messages.map((m, i) => (
          <div key={i} className={`text-sm ${m.role === 'user' ? 'text-right' : ''}`}>
            <span className={`inline-block p-3 rounded-lg prose prose-sm dark:prose-invert ${m.role === 'user' ? 'bg-brand-yellow-400 text-brand-navy-900' : 'bg-white dark:bg-brand-navy-700 dark:text-white'}`}>
              <ReactMarkdown>{m.text}</ReactMarkdown>
            </span>
          </div>
        ))}
        {isLoading && <div className="text-sm text-gray-500">Typing...</div>}
      </div>

      <div className="p-4 border-t dark:border-white/10">
        {showWhatsApp && (
        <button onClick={handoffToWhatsApp} className="mb-4 flex w-full items-center justify-center gap-2 rounded-lg bg-green-500 py-2 text-white font-semibold text-sm">
            <Phone className="h-4 w-4" /> Speak to an Engineer
        </button>
      )}
        <form onSubmit={handleSubmit} className="flex gap-2">
          <input value={input} onChange={(e) => setInput(e.target.value)} className="flex-1 rounded-lg border p-2 text-sm dark:bg-brand-navy-900 dark:border-white/10" placeholder="Type a message..." />
          <button type="submit" className="bg-brand-navy-900 text-white p-2 rounded-lg"><Send className="h-4 w-4" /></button>
        </form>
    </div>
    </div>
      )
}

  return (
    <div className="fixed bottom-6 right-4 sm:right-6 z-50">
      {!isOpen && (
        <a
          href="/chat"
          className="relative flex h-14 w-14 items-center justify-center rounded-full bg-brand-yellow-400 text-brand-navy-900 shadow-lg hover:scale-105 transition-transform"
        >
          <MessageCircle className="h-7 w-7" />
          <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-red-500 animate-ping"></span>
        </a>
      )}
    </div>
  );
}

