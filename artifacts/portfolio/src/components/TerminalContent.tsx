import { useState, useRef, useEffect } from "react";

const HISTORY: string[] = [];

const COMMANDS: Record<string, () => string[]> = {
  help: () => [
    "Available commands:",
    "  whoami    - Display user info",
    "  ls        - List portfolio sections",
    "  cat       - Display section details (e.g. cat about)",
    "  skills    - Show technical skills",
    "  exp       - Show work experience",
    "  projects  - List projects",
    "  contact   - Show contact info",
    "  clear     - Clear terminal",
    "  history   - Show command history",
    "  date      - Show current date",
    "  uname     - System information",
    "  neofetch  - System info display",
  ],
  whoami: () => [
    "elias@fedora (Elías Ortiz)",
    "Full-Stack Software Developer",
    "Mid Software Engineer @ Navixsoft",
    "Location: Latin America",
  ],
  ls: () => [
    "about/    skills/    projects/    experience/    contact/    resume.pdf",
  ],
  clear: () => ["__CLEAR__"],
  history: () => HISTORY.map((cmd, i) => `  ${i + 1}  ${cmd}`),
  date: () => [new Date().toString()],
  uname: () => ["Fedora Core release 1 (Yarrow)", "Linux 2.4.19-0 i686"],
  neofetch: () => [
    "         _____",
    "        /     \\        elias@fedora",
    "       / () () \\       ─────────────────",
    "      |   __   |       OS: Fedora Core 1 (Yarrow)",
    "       \\  \\/  /        Kernel: 2.4.19-0",
    "        \\_____/         Shell: bash 2.05b",
    "       /|     |\\        DE: GNOME 2.4.0",
    "      / |     | \\       Theme: Bluecurve",
    "     /  |     |  \\      Resolution: 1024x768",
    "    /___|_____|___\\     Terminal: gnome-terminal",
    "                       CPU: Developer @ 100%",
    "                       Memory: Coffee-powered",
  ],
  skills: () => [
    "┌─────────────────────────────────────────────┐",
    "│  FRONTEND   │ React, TypeScript, JavaScript │",
    "│  MOBILE     │ React Native, Expo            │",
    "│  BACKEND    │ Python, Java, Node.js         │",
    "│  DATABASE   │ PostgreSQL, MongoDB           │",
    "│  DEVOPS     │ AWS, GCP, Railway, Vercel     │",
    "└─────────────────────────────────────────────┘",
  ],
  exp: () => [
    "[2025 - Present] Mid Software Engineer @ Navixsoft",
    "  Backend & frontend with Python, Node.js, React",
    "  Infrastructure: AWS, GCP, Railway",
    "",
    "[2025 - 2026] Full-Stack Developer @ Botcamp Roshka",
    "  UI development with React and APIs in Java",
    "",
    "[2023 - 2024] Junior Developer @ StartUp Factory",
    "  Legacy system maintenance and web dev",
  ],
  projects: () => [
    "1. E-commerce Platform - Next.js Commerce",
    "   Modern store with Shopify checkout",
    "   → nextjs-commerce-three-sooty-63.vercel.app",
    "",
    "2. Finanz - Financial Services Platform",
    "   Dashboard, auth, personal finance management",
    "",
    "3. Website - Navixsoft",
    "   Corporate site. Full-stack development",
    "   → navixsoft.com",
  ],
  contact: () => [
    "Email:    emails.eliasortiz@gmail.com",
    "GitHub:   github.com/esam-dev",
    "LinkedIn: linkedin.com/in/elías-ortíz",
    "Web:      navixsoft.com",
  ],
};

const ALIASES: Record<string, string> = {
  "cat about": "whoami",
  "cat skills": "skills",
  "cat experience": "exp",
  "cat projects": "projects",
  "cat contact": "contact",
};

function processCommand(input: string): string[] {
  const trimmed = input.trim();
  if (!trimmed) return [];

  HISTORY.push(trimmed);

  // Check aliases
  const alias = ALIASES[trimmed.toLowerCase()];
  if (alias && COMMANDS[alias]) return COMMANDS[alias]();

  // Check direct commands
  const cmd = trimmed.toLowerCase();
  if (COMMANDS[cmd]) return COMMANDS[cmd]();

  return [`bash: ${trimmed}: command not found`, 'Type "help" for available commands.'];
}

export default function TerminalContent() {
  const [lines, setLines] = useState<string[]>([
    "[elias@fedora ~]$ cat /etc/motd",
    "",
    "  Welcome to Fedora Core 1 (Yarrow)",
    "  GNOME 2.4 Desktop Environment",
    "  Bluecurve Theme Engine",
    "",
    "  Type 'help' for available commands.",
    "",
  ]);
  const [input, setInput] = useState("");
  const [historyIdx, setHistoryIdx] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "instant" });
  }, [lines]);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const prompt = `[elias@fedora ~]$ ${input}`;
    const output = processCommand(input);

    if (output.includes("__CLEAR__")) {
      setLines([]);
    } else {
      setLines((prev) => [...prev, prompt, ...output, ""]);
    }
    setInput("");
    setHistoryIdx(-1);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowUp") {
      e.preventDefault();
      const newIdx = Math.min(historyIdx + 1, HISTORY.length - 1);
      setHistoryIdx(newIdx);
      setInput(HISTORY[HISTORY.length - 1 - newIdx] || "");
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      const newIdx = Math.max(historyIdx - 1, -1);
      setHistoryIdx(newIdx);
      setInput(newIdx >= 0 ? HISTORY[HISTORY.length - 1 - newIdx] : "");
    }
  };

  return (
    <div
      className="h-full bg-[#1a1a2e] text-[#00ff00] p-3 overflow-y-auto bluecurve-scrollbar cursor-text"
      style={{ fontFamily: "'DejaVu Sans Mono', 'Courier New', monospace", fontSize: "12px", lineHeight: "1.4" }}
      onClick={() => inputRef.current?.focus()}
    >
      {lines.map((line, i) => (
        <div key={i} className="whitespace-pre-wrap break-all">
          {line}
        </div>
      ))}

      {/* Input line */}
      <form onSubmit={handleSubmit} className="flex items-center">
        <span className="text-[#00ff00] shrink-0">[elias@fedora ~]$ </span>
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          className="flex-1 bg-transparent text-[#00ff00] outline-none border-none caret-[#00ff00]"
          style={{ fontFamily: "'DejaVu Sans Mono', 'Courier New', monospace", fontSize: "12px" }}
          autoFocus
          spellCheck={false}
          autoComplete="off"
        />
      </form>

      <div ref={bottomRef} />
    </div>
  );
}
