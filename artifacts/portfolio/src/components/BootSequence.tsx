import { useState, useEffect, useRef } from "react";

const BOOT_LINES: { text: string; delay: number; color?: string }[] = [
  { text: "", delay: 200 },
  { text: "Fedora Core release 1 (Yarrow)", delay: 300, color: "#00aaff" },
  { text: "Kernel 2.4.19 on an i686", delay: 200 },
  { text: "", delay: 100 },
  { text: "INIT: version 2.85 booting", delay: 250, color: "#aaaaaa" },
  { text: "", delay: 80 },
  { text: "Welcome to Fedora Core", delay: 400, color: "#00cc00" },
  { text: "", delay: 100 },
  { text: "Starting udev:                       [  OK  ]", delay: 180, color: "#00cc00" },
  { text: "Initializing USB controller:           [  OK  ]", delay: 150, color: "#00cc00" },
  { text: "Loading keymap:                       [  OK  ]", delay: 130, color: "#00cc00" },
  { text: "Setting hostname localhost:            [  OK  ]", delay: 160, color: "#00cc00" },
  { text: "Bringing up loopback:                 [  OK  ]", delay: 140, color: "#00cc00" },
  { text: "Bringing up interface eth0:            [  OK  ]", delay: 200, color: "#00cc00" },
  { text: "Starting pcmcia:                      [  OK  ]", delay: 170, color: "#00cc00" },
  { text: "Mounting filesystems:                 [  OK  ]", delay: 150, color: "#00cc00" },
  { text: "Starting system message bus:          [  OK  ]", delay: 180, color: "#00cc00" },
  { text: "Starting SSH daemon:                  [  OK  ]", delay: 160, color: "#00cc00" },
  { text: "Starting sendmail:                    [  OK  ]", delay: 200, color: "#00cc00" },
  { text: "Starting crond:                       [  OK  ]", delay: 130, color: "#00cc00" },
  { text: "Starting xinetd:                      [  OK  ]", delay: 150, color: "#00cc00" },
  { text: "", delay: 100 },
  { text: "Starting GNOME Display Manager:       [  OK  ]", delay: 350, color: "#ffcc00" },
  { text: "", delay: 200 },
  { text: "XFree86 Version 4.3.0", delay: 250, color: "#aaaaaa" },
  { text: "Release Date: 2003-09-25", delay: 150, color: "#aaaaaa" },
  { text: "X Protocol Version 11, Revision 0, Release 6.6", delay: 150, color: "#aaaaaa" },
  { text: "Screen 0: 1024x768 24-bit color", delay: 200, color: "#aaaaaa" },
  { text: "", delay: 200 },
  { text: "Starting Bluecurve theme engine...", delay: 400, color: "#5a8fc4" },
  { text: "Loading desktop environment...", delay: 500, color: "#5a8fc4" },
  { text: "", delay: 300 },
  { text: "Fedora Core. It's the freedom.", delay: 600, color: "#00cc00" },
];

interface BootSequenceProps {
  onComplete: () => void;
}

export default function BootSequence({ onComplete }: BootSequenceProps) {
  const [visibleLines, setVisibleLines] = useState<string[]>([]);
  const [cursorVisible, setCursorVisible] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);

  // Blinking cursor
  useEffect(() => {
    const interval = setInterval(() => setCursorVisible((v) => !v), 530);
    return () => clearInterval(interval);
  }, []);

  // Type out boot lines sequentially
  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;
    let cancelled = false;

    async function runBoot() {
      for (let i = 0; i < BOOT_LINES.length; i++) {
        if (cancelled) return;
        await new Promise((r) => {
          timeout = setTimeout(r, BOOT_LINES[i].delay);
        });
        if (cancelled) return;
        setVisibleLines((prev) => [...prev, BOOT_LINES[i].text]);
      }

      // Wait after boot completes, then fade out
      await new Promise((r) => {
        timeout = setTimeout(r, 800);
      });
      if (!cancelled) onComplete();
    }

    runBoot();
    return () => {
      cancelled = true;
      clearTimeout(timeout);
    };
  }, [onComplete]);

  // Auto-scroll to bottom
  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [visibleLines]);

  // Skip on click or keypress
  useEffect(() => {
    const handleSkip = () => onComplete();
    window.addEventListener("keydown", handleSkip);
    window.addEventListener("click", handleSkip);
    return () => {
      window.removeEventListener("keydown", handleSkip);
      window.removeEventListener("click", handleSkip);
    };
  }, [onComplete]);

  return (
    <div
      className="fixed inset-0 z-[9999] bg-black flex items-center justify-center"
      style={{ fontFamily: "'DejaVu Sans Mono', 'Courier New', monospace" }}
    >
      <div
        ref={containerRef}
        className="w-full h-full max-w-[900px] max-h-[600px] mx-4 p-4 overflow-y-auto text-[13px] leading-[1.35]"
      >
        {visibleLines.map((line, i) => {
          const config = BOOT_LINES[i];
          const isOK = line.includes("[  OK  ]");
          const isError = line.includes("[FAILED]");

          return (
            <div key={i} className="whitespace-pre" style={{ color: config?.color || "#cccccc" }}>
              {line}
              {/* Color the OK/FAILED tags */}
              {isOK && !config?.color && (
                <span className="text-[#00cc00]">[  OK  ]</span>
              )}
              {isError && (
                <span className="text-[#cc0000]">[FAILED]</span>
              )}
            </div>
          );
        })}

        {/* Blinking cursor at the end */}
        <div className="whitespace-pre text-[#cccccc]">
          <span style={{ opacity: cursorVisible ? 1 : 0 }}>_</span>
        </div>
      </div>

      {/* Skip hint */}
      <div className="absolute bottom-6 right-6 text-[11px] text-[#555]" style={{ fontFamily: "'Noto Sans', sans-serif" }}>
        Click or press any key to skip
      </div>
    </div>
  );
}
