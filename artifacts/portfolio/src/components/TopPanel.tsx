import { useState, useEffect, ReactNode } from "react";
import { ChevronDown } from "lucide-react";

interface TopPanelProps {
  activeWindowTitle?: string;
  onMenuAction?: (action: string) => void;
  lang: string;
  onLangChange: () => void;
}

export default function TopPanel({
  activeWindowTitle = "Desktop",
  onMenuAction,
  lang,
  onLangChange,
}: TopPanelProps) {
  const [time, setTime] = useState(new Date());
  const [menuOpen, setMenuOpen] = useState<string | null>(null);

  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  const formatTime = (d: Date) => {
    return d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  const handleMenuClick = (menu: string) => {
    setMenuOpen(menuOpen === menu ? null : menu);
  };

  const handleMenuAction = (action: string) => {
    setMenuOpen(null);
    onMenuAction?.(action);
  };

  const menuItems: Record<string, { label: string; action: string }[]> = {
    applications: [
      { label: "About Me", action: "about" },
      { label: "Skills", action: "skills" },
      { label: "Projects", action: "projects" },
      { label: "Experience", action: "experience" },
    ],
    places: [
      { label: "Home Folder", action: "about" },
      { label: "Projects", action: "projects" },
      { label: "Contact", action: "contact" },
    ],
    system: [
      { label: "Preferences", action: "" },
      { label: "About This Portfolio", action: "about" },
      { label: "Logout", action: "" },
    ],
  };

  return (
    <div
      className="panel-gradient h-[28px] flex items-center px-0 text-[12px] text-white fixed top-0 left-0 right-0 z-[1000] select-none"
      style={{ boxShadow: "0 1px 2px rgba(0,0,0,0.3)" }}
    >
      {/* Left side: Fedora logo + menus */}
      <div className="flex items-center h-full">
        {/* Fedora "foot" logo */}
        <div
          className="flex items-center justify-center h-full px-3 hover:bg-white/10 cursor-default"
          title="Fedora"
        >
          <svg viewBox="0 0 24 24" className="w-[18px] h-[18px]" fill="white">
            <circle cx="12" cy="12" r="10" fill="none" stroke="white" strokeWidth="1.5" />
            <text x="12" y="16" textAnchor="middle" fontSize="11" fontWeight="bold" fill="white">
              f
            </text>
          </svg>
        </div>

        {/* Divider */}
        <div className="w-px h-[18px] bg-white/20 mx-0" />

        {/* Applications menu */}
        <div className="relative">
          <button
            className={`flex items-center gap-1 h-[28px] px-3 hover:bg-white/10 ${
              menuOpen === "applications" ? "bg-white/15" : ""
            }`}
            onClick={() => handleMenuClick("applications")}
          >
            <span className="font-semibold text-[12px]">Applications</span>
          </button>
          {menuOpen === "applications" && (
            <MenuDropdown items={menuItems.applications} onSelect={handleMenuAction} />
          )}
        </div>

        {/* Places menu */}
        <div className="relative">
          <button
            className={`flex items-center gap-1 h-[28px] px-3 hover:bg-white/10 ${
              menuOpen === "places" ? "bg-white/15" : ""
            }`}
            onClick={() => handleMenuClick("places")}
          >
            <span className="font-semibold text-[12px]">Places</span>
          </button>
          {menuOpen === "places" && (
            <MenuDropdown items={menuItems.places} onSelect={handleMenuAction} />
          )}
        </div>

        {/* System menu */}
        <div className="relative">
          <button
            className={`flex items-center gap-1 h-[28px] px-3 hover:bg-white/10 ${
              menuOpen === "system" ? "bg-white/15" : ""
            }`}
            onClick={() => handleMenuClick("system")}
          >
            <span className="font-semibold text-[12px]">System</span>
          </button>
          {menuOpen === "system" && (
            <MenuDropdown items={menuItems.system} onSelect={handleMenuAction} />
          )}
        </div>
      </div>

      {/* Center: active window title */}
      <div className="flex-1 flex justify-center">
        <span className="text-[12px] text-white/80 font-normal truncate max-w-[400px]">
          {activeWindowTitle}
        </span>
      </div>

      {/* Right side: lang toggle + clock */}
      <div className="flex items-center h-full">
        {/* Language toggle */}
        <button
          className="flex items-center h-full px-3 hover:bg-white/10 text-[12px] font-semibold"
          onClick={onLangChange}
          title="Toggle language"
        >
          {lang === "es" ? "ES" : "EN"}
        </button>

        {/* Divider */}
        <div className="w-px h-[18px] bg-white/20" />

        {/* Volume icon */}
        <div className="flex items-center h-full px-2 hover:bg-white/10 cursor-default">
          <svg viewBox="0 0 16 16" className="w-[14px] h-[14px]" fill="white">
            <path d="M2 5h3l4-3v12l-4-3H2V5z" />
            <path d="M11 5.5s1.5 1 1.5 2.5-1.5 2.5-1.5 2.5" fill="none" stroke="white" strokeWidth="1.2" />
          </svg>
        </div>

        {/* Clock */}
        <div className="flex items-center h-full px-3 hover:bg-white/10 cursor-default">
          <span className="text-[12px] font-medium tabular-nums">
            {formatTime(time)}
          </span>
        </div>
      </div>

      {/* Click outside to close menus */}
      {menuOpen && (
        <div
          className="fixed inset-0 z-[-1]"
          onClick={() => setMenuOpen(null)}
        />
      )}
    </div>
  );
}

function MenuDropdown({
  items,
  onSelect,
}: {
  items: { label: string; action: string }[];
  onSelect: (action: string) => void;
}) {
  return (
    <div className="absolute top-[28px] left-0 bg-white border border-[#808080] shadow-[2px_2px_4px_rgba(0,0,0,0.3)] z-[1001] min-w-[180px] py-[2px]">
      {items.map((item, i) => (
        <button
          key={i}
          className="w-full text-left px-4 py-[3px] text-[12px] text-black hover:bg-[#3366aa] hover:text-white flex items-center gap-2 cursor-default"
          onClick={() => onSelect(item.action)}
        >
          {item.label}
        </button>
      ))}
    </div>
  );
}
