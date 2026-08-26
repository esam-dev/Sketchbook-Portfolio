import { useState, useRef, useEffect } from "react";
import { Clock, Calculator, FileText, Terminal, Monitor } from "lucide-react";

interface BottomDockProps {
  openWindows: { id: string; title: string; icon: string }[];
  activeWindow: string | null;
  onSelectWindow: (id: string) => void;
  onShowDesktop: () => void;
  onOpenApp: (id: string) => void;
}

const APPS = [
  { id: "terminal", label: "Terminal", icon: <Terminal className="w-[13px] h-[13px]" /> },
  { id: "clock", label: "Clock", icon: <Clock className="w-[13px] h-[13px]" /> },
  { id: "calculator", label: "Calculator", icon: <Calculator className="w-[13px] h-[13px]" /> },
  { id: "texteditor", label: "Text Editor", icon: <FileText className="w-[13px] h-[13px]" /> },
];

export default function BottomDock({
  openWindows,
  activeWindow,
  onSelectWindow,
  onShowDesktop,
  onOpenApp,
}: BottomDockProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!menuOpen) return;
    const handler = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [menuOpen]);

  const handleDesktopClick = () => {
    setMenuOpen((prev) => !prev);
  };

  const handleOpen = (id: string) => {
    onOpenApp(id);
    setMenuOpen(false);
  };

  return (
    <div
      className="panel-gradient h-[28px] flex items-center px-1 fixed bottom-0 left-0 right-0 z-[1000] select-none"
      style={{ boxShadow: "0 -1px 2px rgba(0,0,0,0.3)" }}
    >
      {/* Show Desktop / Applications button */}
      <div className="relative" ref={menuRef}>
        <button
          className="h-[22px] px-2 mx-1 flex items-center justify-center gap-1 bg-[#d4d0c8] border border-t-white border-l-white border-b-[#404040] border-r-[#404040] hover:brightness-105 active:border-t-[#404040] active:border-l-[#404040] active:border-b-white active:border-r-white"
          onClick={handleDesktopClick}
          title="Applications"
        >
          <Monitor className="w-[12px] h-[12px] text-[#333]" />
          <span className="text-[10px] text-[#333] font-medium">Desktop</span>
        </button>

        {/* Context menu */}
        {menuOpen && (
          <div className="absolute bottom-full left-0 mb-1 min-w-[180px] bg-[#ececec] border border-t-white border-l-white border-b-[#808080] border-r-[#808080] shadow-md z-[2000]">
            {APPS.map((app) => (
              <button
                key={app.id}
                className="w-full flex items-center gap-2 px-3 py-[5px] text-[12px] text-[#333] hover:bg-[#3366aa] hover:text-white text-left cursor-default"
                onClick={() => handleOpen(app.id)}
              >
                {app.icon}
                <span>{app.label}</span>
              </button>
            ))}
            <div className="h-px bg-[#808080] mx-1 my-[2px]" />
            <button
              className="w-full flex items-center gap-2 px-3 py-[5px] text-[12px] text-[#333] hover:bg-[#3366aa] hover:text-white text-left cursor-default"
              onClick={() => { onShowDesktop(); setMenuOpen(false); }}
            >
              <Monitor className="w-[13px] h-[13px]" />
              <span>Show Desktop</span>
            </button>
          </div>
        )}
      </div>

      {/* Divider */}
      <div className="w-px h-[18px] bg-white/20 mx-1" />

      {/* Window buttons */}
      <div className="flex items-center gap-[2px] flex-1">
        {openWindows.map((win) => (
          <button
            key={win.id}
            className={`h-[22px] px-3 max-sm:px-1.5 flex items-center gap-2 text-[11px] text-white border max-w-[160px] max-sm:max-w-[100px] truncate ${
              activeWindow === win.id
                ? "bg-white/20 border-t-[#404040] border-l-[#404040] border-b-white border-r-white"
                : "bg-white/5 border-t-white border-l-white border-b-[#404040] border-r-[#404040] hover:bg-white/10"
            }`}
            onClick={() => onSelectWindow(win.id)}
          >
            <span className="text-[12px]">{win.icon}</span>
            <span className="truncate">{win.title}</span>
          </button>
        ))}
      </div>

      {/* Divider */}
      <div className="w-px h-[18px] bg-white/20 mx-1" />

      {/* System tray */}
      <div className="flex items-center gap-1 px-2">
        <div className="w-[14px] h-[14px] flex items-center justify-center">
          <svg viewBox="0 0 16 16" className="w-[12px] h-[12px]" fill="white" opacity="0.8">
            <rect x="2" y="4" width="12" height="8" rx="1" fill="none" stroke="white" strokeWidth="1" />
            <path d="M4 7h8M4 9h5" stroke="white" strokeWidth="0.8" />
          </svg>
        </div>
      </div>
    </div>
  );
}
