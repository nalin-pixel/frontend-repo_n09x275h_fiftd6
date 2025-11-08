import { useCallback, useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import VoiceCapture from './components/VoiceCapture';
import TaskList from './components/TaskList';

// Basic natural language to task parser (client-side mock)
function parseCommandToTask(text) {
  if (!text) return null;
  // Extract a simple deadline if there's a weekday/time
  const timeMatch = text.match(/\b(\d{1,2})(?:\:(\d{2}))?\s*(am|pm)?\b/i);
  const dayMatch = text.match(/\b(monday|tuesday|wednesday|thursday|friday|saturday|sunday|tomorrow|today|next week|tonight)\b/i);

  let deadline = new Date();
  if (dayMatch) {
    const day = dayMatch[1].toLowerCase();
    const map = { sunday:0, monday:1, tuesday:2, wednesday:3, thursday:4, friday:5, saturday:6 };
    if (day === 'tomorrow') deadline.setDate(deadline.getDate() + 1);
    else if (day === 'today' || day === 'tonight') {}
    else if (day === 'next week') deadline.setDate(deadline.getDate() + 7);
    else {
      const target = map[day];
      const diff = (target + 7 - deadline.getDay()) % 7 || 7;
      deadline.setDate(deadline.getDate() + diff);
    }
  }
  if (timeMatch) {
    let hours = parseInt(timeMatch[1], 10);
    const minutes = timeMatch[2] ? parseInt(timeMatch[2], 10) : 0;
    const ampm = timeMatch[3]?.toLowerCase();
    if (ampm) {
      if (ampm === 'pm' && hours < 12) hours += 12;
      if (ampm === 'am' && hours === 12) hours = 0;
    }
    deadline.setHours(hours, minutes, 0, 0);
  } else {
    // default 5pm today
    const d = new Date();
    deadline.setHours(17, 0, 0, 0);
    if (deadline < d) deadline.setDate(deadline.getDate() + 1);
  }

  // Derive title and description
  const cleaned = text
    .replace(/^(create|add|make|set)\b/i, '')
    .replace(/\b(task|reminder|to\s*do)\b/i, '')
    .replace(/\bby\b.*$/i, '')
    .trim();

  const title = cleaned.charAt(0).toUpperCase() + cleaned.slice(1) || 'New Task';
  return {
    title,
    description: `From voice: "${text}"`,
    deadline: deadline.toISOString(),
  };
}

export default function App() {
  const [tasks, setTasks] = useState([
    {
      title: 'Prepare project brief',
      description: 'Outline goals and deliverables for Q4 initiative',
      deadline: new Date(Date.now() + 1000 * 60 * 60 * 5).toISOString(),
    },
  ]);

  const handleTranscript = useCallback((speechText) => {
    const task = parseCommandToTask(speechText);
    if (!task) return;
    setTasks((prev) => [task, ...prev]);
  }, []);

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-200">
      <Header />
      <Hero />

      <main className="relative z-10 mx-auto max-w-6xl px-4 pb-24">
        <div className="mt-6">
          <h2 className="text-xl font-medium text-neutral-100">Voice Commands</h2>
          <p className="mt-1 text-neutral-400 max-w-2xl">
            Press the button and speak naturally. Your agent understands intent, extracts deadlines, and creates tasks.
          </p>

          <VoiceCapture onTranscript={handleTranscript} />

          <div className="mt-10 flex items-center justify-between">
            <h3 className="text-lg font-medium text-neutral-100">Your tasks</h3>
            <span className="text-xs text-neutral-400">Dark + neon blue aesthetic</span>
          </div>

          <TaskList tasks={tasks} />
        </div>
      </main>

      {/* background subtle gradient */}
      <div className="pointer-events-none fixed inset-0 -z-0 bg-[radial-gradient(600px_400px_at_70%_10%,rgba(56,189,248,0.08),transparent),radial-gradient(400px_300px_at_20%_20%,rgba(99,102,241,0.08),transparent)]" />
    </div>
  );
}
