export default function NotFound() {
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
          <span className="text-[12px] text-white/80">Error</span>
        </div>
      </div>

      {/* Error dialog */}
      <div className="flex flex-col items-center" style={{ animation: "window-open 0.15s ease-out" }}>
        <div className="bg-[#d4d0c8] border border-[#404040] shadow-[1px_1px_0px_#000] w-[400px]">
          {/* Titlebar */}
          <div className="titlebar-gradient flex items-center h-[26px] px-[3px]">
            <div className="flex-1 text-[12px] font-semibold text-white px-1 leading-[26px]">
              Error - Not Found
            </div>
            <a
              href="/"
              className="w-[18px] h-[18px] flex items-center justify-center bg-[#d4d0c8] border border-t-white border-l-white border-b-[#404040] border-r-[#404040]"
            >
              <span className="text-black text-[12px] font-bold leading-none">×</span>
            </a>
          </div>

          {/* Content */}
          <div className="p-6 bg-white m-[3px] mt-0 bevel-sunken">
            <div className="flex gap-4 items-start">
              {/* Error icon */}
              <div className="shrink-0">
                <svg viewBox="0 0 48 48" className="w-[48px] h-[48px]">
                  <circle cx="24" cy="24" r="20" fill="#ffcc00" stroke="#333" strokeWidth="2" />
                  <text x="24" y="34" textAnchor="middle" fontSize="28" fontWeight="bold" fill="#333">!</text>
                </svg>
              </div>
              <div>
                <h1 className="text-[18px] font-bold text-[#333] mb-2">404 - Page Not Found</h1>
                <p className="text-[12px] text-[#555] leading-relaxed">
                  The page you are looking for does not exist in this portfolio.
                  It may have been moved or deleted.
                </p>
                <p className="text-[12px] text-[#555] mt-2">
                  Please check the URL or return to the desktop.
                </p>
              </div>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-2 p-3 bg-[#ececec]">
            <a href="/" className="btn-bluecurve px-6 py-1.5 text-[12px] font-bold">
              Go to Desktop
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
