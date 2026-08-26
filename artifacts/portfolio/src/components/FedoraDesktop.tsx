import { useState, useCallback, ReactNode } from "react";
import TopPanel from "./TopPanel";
import BottomDock from "./BottomDock";
import DesktopIcon from "./DesktopIcon";

export interface WindowConfig {
  id: string;
  title: string;
  icon: ReactNode;
  desktopIcon: ReactNode;
  desktopLabel: string;
}

interface FedoraDesktopProps {
  windows: WindowConfig[];
  windowComponents: Record<string, ReactNode>;
  lang: string;
  onLangChange: () => void;
}

export default function FedoraDesktop({
  windows,
  windowComponents,
  lang,
  onLangChange,
}: FedoraDesktopProps) {
  const [openWindows, setOpenWindows] = useState<string[]>([]);
  const [activeWindow, setActiveWindow] = useState<string | null>(null);

  const openWindow = useCallback((id: string) => {
    setOpenWindows((prev) => {
      if (prev.includes(id)) {
        setActiveWindow(id);
        return prev;
      }
      return [...prev, id];
    });
    setActiveWindow(id);
  }, []);

  const closeWindow = useCallback((id: string) => {
    setOpenWindows((prev) => prev.filter((w) => w !== id));
    setActiveWindow((prev) => (prev === id ? null : prev));
  }, []);

  const selectWindow = useCallback((id: string) => {
    setActiveWindow(id);
  }, []);

  const showDesktop = useCallback(() => {
    setActiveWindow(null);
  }, []);

  const handleMenuAction = useCallback(
    (action: string) => {
      if (action) openWindow(action);
    },
    [openWindow]
  );

  const activeWindowTitle = activeWindow
    ? windows.find((w) => w.id === activeWindow)?.title || ""
    : "Fedora Core 1 Desktop";

  const dockItems = openWindows.map((id) => {
    const win = windows.find((w) => w.id === id);
    return {
      id,
      title: win?.title || id,
      icon: "📄",
    };
  });

  return (
    <div className="w-screen h-screen overflow-hidden relative desktop-gradient">
      {/* Top Panel */}
      <TopPanel
        activeWindowTitle={activeWindowTitle}
        onMenuAction={handleMenuAction}
        lang={lang}
        onLangChange={onLangChange}
      />

      {/* Desktop area (below top panel, above bottom dock) */}
      <div
        className="absolute left-0 right-0 overflow-hidden"
        style={{ top: "28px", bottom: "28px" }}
      >
        {/* Desktop icons - left column */}
        <div className="absolute top-4 left-4 flex flex-col gap-1 z-[50]">
          {windows.map((win) => (
            <DesktopIcon
              key={win.id}
              label={win.desktopLabel}
              icon={win.desktopIcon}
              onClick={() => openWindow(win.id)}
              isSelected={activeWindow === win.id}
            />
          ))}
        </div>

        {/* Windows layer */}
        <div className="absolute inset-0">
          {openWindows.map((id) => {
            const comp = windowComponents[id];
            if (!comp) return null;
            return <div key={id}>{comp}</div>;
          })}
        </div>
      </div>

      {/* Bottom Dock */}
      <BottomDock
        openWindows={dockItems}
        activeWindow={activeWindow}
        onSelectWindow={selectWindow}
        onShowDesktop={showDesktop}
        onOpenApp={openWindow}
      />
    </div>
  );
}
