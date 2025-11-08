import { Sparkles } from "lucide-react";

export default function Header() {
  return (
    <header className="w-full sticky top-0 z-20 backdrop-blur supports-[backdrop-filter]:bg-neutral-950/40 border-b border-neutral-800">
      <div className="mx-auto max-w-6xl px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-full bg-gradient-to-tr from-cyan-400 via-blue-500 to-violet-500" />
          <span className="text-neutral-100 font-semibold tracking-tight">Auralite</span>
        </div>
        <div className="flex items-center gap-3 text-sm text-neutral-400">
          <span className="hidden sm:inline">Personal AI Agent</span>
          <Sparkles className="h-4 w-4 text-cyan-400" />
        </div>
      </div>
    </header>
  );
}
