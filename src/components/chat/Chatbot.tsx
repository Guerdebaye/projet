import React, { useState, useEffect, useRef } from 'react';
import { MessageCircle, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface Msg { id: string; from: 'user' | 'bot'; text: string; time: string }

export const Chatbot: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Msg[]>([]);
  const [input, setInput] = useState('');
  const elRef = useRef<HTMLDivElement | null>(null);

  const STORAGE_KEY = 'medipass_chat_history';
  const API_URL = (import.meta as any)?.env?.VITE_CHAT_API_URL || '';

  // load saved history
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setMessages(JSON.parse(raw));
    } catch (e) {
      // ignore parse errors
    }
  }, []);

  useEffect(() => {
    if (open && messages.length === 0) {
      setTimeout(() => {
        setMessages(m => m.concat({ id: 'welcome', from: 'bot', text: "Bonjour ! Je suis l'assistant MediPass. En quoi puis-je vous aider ?", time: new Date().toLocaleTimeString() }));
      }, 300);
    }
  }, [open]);

  useEffect(() => {
    elRef.current?.scrollTo({ top: elRef.current.scrollHeight, behavior: 'smooth' });
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(messages)); } catch (e) {}
  }, [messages, open]);

  const clearHistory = () => {
    setMessages([]);
    try { localStorage.removeItem(STORAGE_KEY); } catch (e) {}
  };

  const send = async (text: string) => {
    if (!text.trim()) return;
    const now = new Date().toLocaleTimeString();
    const userMsg: Msg = { id: Date.now().toString(), from: 'user', text, time: now };
    setMessages(m => [...m, userMsg]);
    setInput('');

    // try remote API if configured
    if (API_URL) {
      try {
        const resp = await fetch(API_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ message: text, history: messages })
        });
        if (resp.ok) {
          const json = await resp.json();
          const reply = typeof json.reply === 'string' ? json.reply : (json.reply?.text || 'Désolé, je n\'ai pas de réponse.');
          const botReply: Msg = { id: (Date.now()+1).toString(), from: 'bot', text: reply, time: new Date().toLocaleTimeString() };
          setMessages(m => [...m, botReply]);
          return;
        }
      } catch (e) {
        // fallback to local reply on error
      }
    }

    // local simulated reply
    setTimeout(() => {
      const botReply: Msg = { id: (Date.now()+1).toString(), from: 'bot', text: generateReply(text), time: new Date().toLocaleTimeString() };
      setMessages(m => [...m, botReply]);
    }, 700 + Math.random() * 800);
  };

  const generateReply = (text: string) => {
    const t = text.toLowerCase();
    if (t.includes('rendez') || t.includes('rdv')) return "Pour gérer vos rendez-vous, allez dans l'onglet 'Rendez-vous'. Voulez-vous que je vous y conduise ?";
    if (t.includes('carnet')) return "Vous pouvez acheter ou renouveler un carnet via l'onglet 'Carnets'. Voulez-vous voir les types disponibles ?";
    if (t.includes('contact') || t.includes('expert')) return "Pour contacter un expert, utilisez notre formulaire de contact ou appelez +221 700 000 000.";
    if (t.includes('merci') || t.includes('thank')) return "Avec plaisir — n'hésitez pas si vous avez d'autres questions !";
    return "Je peux vous aider à gérer vos rendez-vous, carnets ou à contacter un expert. Que souhaitez-vous faire ?";
  };

  return (
    <>
      <div className="fixed bottom-6 right-6 z-50">
        <AnimatePresence>
          {open && (
            <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }} className="w-80 md:w-96 bg-white rounded-2xl shadow-2xl overflow-hidden border border-slate-200 mb-3">
              <div className="flex items-center justify-between px-4 py-2 bg-gradient-to-r from-primary-600 to-medical-500 text-white">
                <div className="flex items-center gap-2">
                  <MessageCircle className="h-5 w-5" />
                  <div className="text-sm font-semibold">Assistant MediPass</div>
                </div>
                <div className="flex items-center gap-2">
                  <button onClick={clearHistory} title="Effacer l'historique" className="px-2 py-1 bg-white/20 rounded text-white text-sm">Effacer</button>
                  <button onClick={() => setOpen(false)} className="p-1 rounded hover:bg-white/20">
                    <X className="h-4 w-4 text-white" />
                  </button>
                </div>
              </div>

              <div ref={elRef} className="p-3 h-64 overflow-auto space-y-3 bg-slate-50">
                {messages.map(m => (
                  <div key={m.id} className={`flex ${m.from === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`${m.from === 'user' ? 'bg-primary-600 text-white' : 'bg-white text-slate-900'} p-2 rounded-lg shadow-sm max-w-[80%]`}>
                      <div className="text-sm">{m.text}</div>
                      <div className="text-[10px] opacity-60 mt-1 text-right">{m.time}</div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="p-3 border-t border-slate-100 flex gap-2">
                <input value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={(e) => { if (e.key === 'Enter') send(input); }} placeholder="Écrire un message..." className="flex-1 px-3 py-2 rounded-lg border border-gray-200 outline-none focus:ring-2 focus:ring-primary-200" />
                <button onClick={() => send(input)} className="px-3 py-2 bg-primary-600 text-white rounded-lg">Envoyer</button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <button onClick={() => setOpen(v => !v)} className="w-14 h-14 rounded-full bg-primary-600 shadow-lg flex items-center justify-center text-white">
          <MessageCircle className="h-6 w-6" />
        </button>
      </div>
    </>
  );
};
