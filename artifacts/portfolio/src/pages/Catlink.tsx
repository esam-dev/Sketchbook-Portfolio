import { ArrowLeft, Github } from "lucide-react";

export default function Catlink() {
  return (
    <div className="w-screen h-screen overflow-hidden relative desktop-gradient flex items-center justify-center">
      {/* Top Panel */}
      <div
        className="panel-gradient h-[28px] flex items-center px-0 text-[12px] text-white fixed top-0 left-0 right-0 z-[1000] select-none"
        style={{ boxShadow: "0 1px 2px rgba(0,0,0,0.3)" }}
      >
        <div className="flex items-center h-full">
          <div className="flex items-center justify-center h-full px-3">
            <svg viewBox="0 0 24 24" className="w-[18px] h-[18px]" fill="white">
              <circle cx="12" cy="12" r="10" fill="none" stroke="white" strokeWidth="1.5" />
              <text x="12" y="16" textAnchor="middle" fontSize="11" fontWeight="bold" fill="white">f</text>
            </svg>
          </div>
        </div>
        <div className="flex-1 flex justify-center">
          <span className="text-[12px] text-white/80">Catlink - Coming Soon</span>
        </div>
      </div>

      {/* Window */}
      <div className="bg-[#d4d0c8] border border-[#404040] shadow-[1px_1px_0px_#000] w-[550px]" style={{ animation: "window-open 0.15s ease-out" }}>
        {/* Titlebar */}
        <div className="titlebar-gradient flex items-center h-[26px] px-[3px]">
          <div className="flex-1 text-[12px] font-semibold text-white px-1 leading-[26px]">Catlink - Coming Soon</div>
          <a href="/" className="w-[18px] h-[18px] flex items-center justify-center bg-[#d4d0c8] border border-t-white border-l-white border-b-[#404040] border-r-[#404040]">
            <span className="text-black text-[12px] font-bold leading-none">×</span>
          </a>
        </div>

        {/* Content */}
        <div className="p-6 bg-white m-[3px] mt-0 bevel-sunken">
          <div className="flex gap-3 items-center mb-4">
            <svg viewBox="0 0 48 48" className="w-[40px] h-[40px] shrink-0">
              <rect x="4" y="4" width="40" height="40" rx="4" fill="#ffcc00" stroke="#333" strokeWidth="1.5" />
              <text x="24" y="32" textAnchor="middle" fontSize="24" fill="#333">🚧</text>
            </svg>
            <div>
              <h1 className="text-[20px] font-bold text-[#333]">Catlink</h1>
              <div className="text-[12px] text-[#3366aa] font-semibold">Under Development</div>
            </div>
          </div>

          <p className="text-[12px] text-[#555] leading-relaxed mb-4">
            This page will be available soon. I'm working on the public version
            of the project so you can see the complete catalog, orders, and
            administration flow.
          </p>

          <div className="flex gap-2">
            <a
              href="https://github.com/esam-dev/catlink"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-bluecurve flex items-center gap-1.5 text-[11px]"
            >
              <Github className="w-3.5 h-3.5" /> View Code
            </a>
            <a href="/" className="btn-widget flex items-center gap-1.5 text-[11px]">
              <ArrowLeft className="w-3.5 h-3.5" /> Back to Desktop
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
