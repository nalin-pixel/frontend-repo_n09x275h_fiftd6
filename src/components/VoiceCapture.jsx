import { useEffect, useRef, useState } from 'react';
import { Mic, Square } from 'lucide-react';

export default function VoiceCapture({ onTranscript }) {
  const [listening, setListening] = useState(false);
  const [supported, setSupported] = useState(false);
  const recognitionRef = useRef(null);

  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      const rec = new SpeechRecognition();
      rec.lang = 'en-US';
      rec.interimResults = true;
      rec.continuous = false;
      rec.onresult = (e) => {
        const t = Array.from(e.results)
          .map(r => r[0])
          .map(r => r.transcript)
          .join(' ');
        if (e.results[0]?.isFinal) {
          onTranscript?.(t.trim());
          setListening(false);
        }
      };
      rec.onend = () => setListening(false);
      recognitionRef.current = rec;
      setSupported(true);
    }
  }, [onTranscript]);

  const toggleListen = () => {
    if (!supported) return;
    if (listening) {
      recognitionRef.current?.stop();
      setListening(false);
    } else {
      try {
        recognitionRef.current?.start();
        setListening(true);
      } catch (e) {
        // ignore double start errors
      }
    }
  };

  return (
    <div className="mt-8">
      <button
        type="button"
        onClick={toggleListen}
        className={`group relative inline-flex items-center gap-3 rounded-full px-6 py-3 text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-cyan-500/60 focus:ring-offset-2 focus:ring-offset-neutral-900 border ${listening ? 'bg-cyan-500/10 border-cyan-500/60 text-cyan-300' : 'bg-neutral-900 border-neutral-800 text-neutral-200 hover:border-cyan-500/40 hover:text-cyan-200'}`}
      >
        <span className="absolute -inset-0.5 rounded-full bg-cyan-500/20 blur opacity-0 group-hover:opacity-100 transition" />
        <span className="relative z-10 flex items-center gap-2">
          {listening ? <Square className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
          {listening ? 'Stop listening' : supported ? 'Speak your command' : 'Voice not supported'}
        </span>
      </button>
      <p className="mt-2 text-xs text-neutral-400">Tip: say “Create a task to send the client proposal by Friday 5pm.”</p>
    </div>
  );
}
