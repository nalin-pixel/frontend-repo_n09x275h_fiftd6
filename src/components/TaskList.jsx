import { useMemo } from 'react';
import { Clock, CheckCircle2 } from 'lucide-react';

function timeRemaining(deadline) {
  const d = new Date(deadline);
  const diff = d.getTime() - Date.now();
  if (isNaN(diff)) return 'No deadline';
  if (diff <= 0) return 'Due now';
  const h = Math.floor(diff / (1000 * 60 * 60));
  const m = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  if (h > 48) {
    const days = Math.ceil(h / 24);
    return `${days} day${days > 1 ? 's' : ''}`;
  }
  if (h >= 1) return `${h}h ${m}m`;
  return `${m}m`;
}

export default function TaskList({ tasks = [] }) {
  const sorted = useMemo(() => {
    return [...tasks].sort((a, b) => new Date(a.deadline) - new Date(b.deadline));
  }, [tasks]);

  if (!sorted.length) {
    return (
      <div className="mt-10 rounded-xl border border-neutral-800 bg-neutral-950 p-6 text-center text-neutral-400">
        No tasks yet. Speak a command to create one.
      </div>
    );
  }

  return (
    <ul className="mt-8 grid gap-4 sm:grid-cols-2">
      {sorted.map((t, i) => (
        <li key={i} className="group rounded-xl border border-neutral-800 bg-neutral-950 p-5 hover:border-cyan-500/40 transition-colors">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h3 className="text-neutral-100 font-medium">{t.title}</h3>
              <p className="mt-1 text-sm text-neutral-400">{t.description}</p>
            </div>
            <CheckCircle2 className="h-5 w-5 text-neutral-700 group-hover:text-cyan-400 transition-colors" />
          </div>
          <div className="mt-3 flex items-center gap-2 text-xs text-cyan-300">
            <Clock className="h-3.5 w-3.5" />
            <span>{timeRemaining(t.deadline)} remaining</span>
          </div>
        </li>
      ))}
    </ul>
  );
}
