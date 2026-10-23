import React, { useState } from 'react';
import { Send, Sparkles, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function App() {
  const [link, setLink] = useState('https://whatsapp.com/channel/0029Vb7fLpyFHWq0NqajYF3g/600');
  const [emoji, setEmoji] = useState('💖');
  const [loading, setLoading] = useState(false);
  const [responseMsg, setResponseMsg] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  const popularEmojis = ['💖', '🔥', '👍', '🚀', '⭐', '👏', '😍', '🎉'];

  const handleReaction = async (e) => {
    e.preventDefault();
    setLoading(true);
    setResponseMsg(null);
    setErrorMsg(null);

    try {
      const encodedLink = encodeURIComponent(link);
      const encodedEmoji = encodeURIComponent(emoji);
      const apiUrl = `https://homely-worthy-autotote--sadewrashmika06.replit.app/api/react?link=${encodedLink}&emoji=${encodedEmoji}`;

      const res = await fetch(apiUrl);
      const data = await res.json();

      if (res.ok) {
        setResponseMsg('ਪ්‍රතිචාරය සාර්ථකව යවන ලදී! (Reaction sent successfully!)');
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 }
        });
      } else {
        setErrorMsg(data.message || 'යමක් වැරදී ඇත. කරුණාකර නැවත උත්සාහ කරන්න.');
      }
    } catch (err) {
      setErrorMsg('Network Error: API එක හා සම්බන්ධ වීමේදී දෝෂයක් ඇති විය.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl p-6">
        <div className="text-center mb-6">
          <div className="inline-flex p-3 bg-pink-500/10 text-pink-500 rounded-full mb-3">
            <Sparkles className="w-8 h-8" />
          </div>
          <h1 className="text-2xl font-bold">WhatsApp Reaction Hub</h1>
          <p className="text-sm text-slate-400 mt-1">ඔබේ ලින්ක් එකට සජීවීව Emojis යවන්න</p>
        </div>

        <form onSubmit={handleReaction} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase mb-1">Target Link (URL)</label>
            <input
              type="url"
              required
              value={link}
              onChange={(e) => setLink(e.target.value)}
              className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white focus:ring-2 focus:ring-pink-500 outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase mb-1">Select Emoji</label>
            <div className="flex gap-2 mb-2 overflow-x-auto pb-1">
              {popularEmojis.map((em) => (
                <button
                  type="button"
                  key={em}
                  onClick={() => setEmoji(em)}
                  className={`text-xl p-2 rounded-lg border transition-all ${
                    emoji === em ? 'bg-pink-600/30 border-pink-500 scale-105' : 'bg-slate-950 border-slate-800'
                  }`}
                >
                  {em}
                </button>
              ))}
            </div>
            <input
              type="text"
              required
              maxLength={4}
              value={emoji}
              onChange={(e) => setEmoji(e.target.value)}
              className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-center text-xl text-white focus:ring-2 focus:ring-pink-500 outline-none"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 px-4 bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-500 hover:to-purple-500 text-white font-medium rounded-xl shadow-lg flex items-center justify-center gap-2 disabled:opacity-50 transition-all"
          >
            {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5" />}
            <span>{loading ? 'യවමින් පවතී...' : 'Send Reaction 🚀'}</span>
          </button>
        </form>

        {responseMsg && (
          <div className="mt-4 p-3 bg-emerald-500/10 border border-emerald-500/30 rounded-xl flex items-center gap-3 text-emerald-400 text-sm">
            <CheckCircle2 className="w-5 h-5 shrink-0" />
            <span>{responseMsg}</span>
          </div>
        )}

        {errorMsg && (
          <div className="mt-4 p-3 bg-rose-500/10 border border-rose-500/30 rounded-xl flex items-center gap-3 text-rose-400 text-sm">
            <AlertCircle className="w-5 h-5 shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}
      </div>
    </div>
  );
}
