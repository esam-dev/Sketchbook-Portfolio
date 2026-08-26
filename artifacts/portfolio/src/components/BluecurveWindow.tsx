import { useState, useRef, ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Minus, Square } from "lucide-react";

interface BluecurveWindowProps {
  title: string;
  icon?: ReactNode;
  children: ReactNode;
  isOpen: boolean;
  onClose: () => void;
  onMinimize?: () => void;
  defaultWidth?: number;
  defaultHeight?: number;
  defaultPosition?: { x: number; y: number };
  minWidth?: number;
  minHeight?: number;
  resizable?: boolean;
  showMenuBar?: boolean;
  className?: string;
}

export default function BluecurveWindow({
  title,
  icon,
  children,
  isOpen,
  onClose,
  onMinimize,
  defaultWidth = 700,
  defaultHeight = 500,
  defaultPosition = { x: 80, y: 40 },
  minWidth = 300,
  minHeight = 200,
  resizable = true,
  showMenuBar = true,
  className = "",
}: BluecurveWindowProps) {
  const [isMaximized, setIsMaximized] = useState(false);
  const [position, setPosition] = useState(defaultPosition);
  const [size, setSize] = useState({ width: defaultWidth, height: defaultHeight });
  const constraintsRef = useRef(null);

  const handleMaximize = () => {
    if (isMaximized) {
      setSize({ width: defaultWidth, height: defaultHeight });
      setPosition(defaultPosition);
    } else {
      setSize({ width: window.innerWidth, height: window.innerHeight - 56 });
      setPosition({ x: 0, y: 0 });
    }
    setIsMaximized(!isMaximized);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.92 }}
          transition={{ duration: 0.15, ease: "easeOut" }}
          drag={!isMaximized}
          dragMomentum={false}
          dragElastic={0}
          onDragEnd={(_, info) => {
            setPosition((prev) => ({
              x: prev.x + info.offset.x,
              y: prev.y + info.offset.y,
            }));
          }}
          style={{
            position: "absolute",
            left: isMaximized ? 0 : position.x,
            top: isMaximized ? 0 : position.y,
            width: isMaximized ? "100%" : size.width,
            height: isMaximized ? "calc(100vh - 56px)" : size.height,
            zIndex: 100,
          }}
          className={`flex flex-col select-none ${className}`}
        >
          {/* Window outer bevel */}
          <div className="h-full flex flex-col bg-[#d4d0c8] border border-[#404040] shadow-[1px_1px_0px_#000]">
            {/* Titlebar */}
            <div className="titlebar-gradient flex items-center h-[26px] px-[3px] shrink-0 cursor-default">
              {/* Icon */}
              {icon && (
                <div className="w-[18px] h-[18px] flex items-center justify-center mr-[4px] shrink-0">
                  {icon}
                </div>
              )}

              {/* Title text */}
              <div className="flex-1 truncate text-[12px] font-semibold text-white px-1 leading-[26px]">
                {title}
              </div>

              {/* Window buttons */}
              <div className="flex items-center gap-[2px] ml-auto shrink-0">
                {/* Minimize */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onMinimize?.();
                  }}
                  className="w-[18px] h-[18px] flex items-center justify-center bg-[#d4d0c8] border border-t-white border-l-white border-b-[#404040] border-r-[#404040] hover:brightness-110 active:border-t-[#404040] active:border-l-[#404040] active:border-b-white active:border-r-white"
                  title="Minimize"
                >
                  <Minus className="w-[10px] h-[10px] text-black" strokeWidth={3} />
                </button>

                {/* Maximize */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleMaximize();
                  }}
                  className="w-[18px] h-[18px] flex items-center justify-center bg-[#d4d0c8] border border-t-white border-l-white border-b-[#404040] border-r-[#404040] hover:brightness-110 active:border-t-[#404040] active:border-l-[#404040] active:border-b-white active:border-r-white"
                  title="Maximize"
                >
                  <Square className="w-[9px] h-[9px] text-black" strokeWidth={2.5} />
                </button>

                {/* Close */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onClose();
                  }}
                  className="w-[18px] h-[18px] flex items-center justify-center bg-[#d4d0c8] border border-t-white border-l-white border-b-[#404040] border-r-[#404040] hover:brightness-110 active:border-t-[#404040] active:border-l-[#404040] active:border-b-white active:border-r-white ml-[2px]"
                  title="Close"
                >
                  <X className="w-[10px] h-[10px] text-black" strokeWidth={3} />
                </button>
              </div>
            </div>

            {/* Menu bar (optional slot) */}
            {showMenuBar && (
              <div className="bg-[#ececec] border-b border-b-[#808080] h-[22px] flex items-center px-2 text-[11px]">
                <span className="px-2 hover:bg-[#3366aa] hover:text-white cursor-default">File</span>
                <span className="px-2 hover:bg-[#3366aa] hover:text-white cursor-default">Edit</span>
                <span className="px-2 hover:bg-[#3366aa] hover:text-white cursor-default">View</span>
                <span className="px-2 hover:bg-[#3366aa] hover:text-white cursor-default">Help</span>
              </div>
            )}

            {/* Window content area with sunken border */}
            <div className="flex-1 m-[3px] mt-0 bg-white bevel-sunken overflow-auto bluecurve-scrollbar">
              {children}
            </div>

            {/* Status bar */}
            <div className="h-[20px] bg-[#ececec] border-t border-t-white flex items-center px-2 text-[11px] text-[#333] shrink-0">
              <div className="flex-1 bevel-flat px-2 py-[1px]">{title}</div>
            </div>
          </div>

          {/* Resize handles */}
          {resizable && !isMaximized && (
            <>
              <div
                className="absolute bottom-0 right-0 w-4 h-4 cursor-nwse-resize"
                onMouseDown={(e) => {
                  e.preventDefault();
                  const startX = e.clientX;
                  const startY = e.clientY;
                  const startW = size.width;
                  const startH = size.height;

                  const onMove = (ev: MouseEvent) => {
                    const newW = Math.max(minWidth, startW + (ev.clientX - startX));
                    const newH = Math.max(minHeight, startH + (ev.clientY - startY));
                    setSize({ width: newW, height: newH });
                  };
                  const onUp = () => {
                    window.removeEventListener("mousemove", onMove);
                    window.removeEventListener("mouseup", onUp);
                  };
                  window.addEventListener("mousemove", onMove);
                  window.addEventListener("mouseup", onUp);
                }}
              />
              <div
                className="absolute bottom-0 left-0 right-4 h-1 cursor-ns-resize"
                onMouseDown={(e) => {
                  e.preventDefault();
                  const startY = e.clientY;
                  const startH = size.height;

                  const onMove = (ev: MouseEvent) => {
                    const newH = Math.max(minHeight, startH + (ev.clientY - startY));
                    setSize((prev) => ({ ...prev, height: newH }));
                  };
                  const onUp = () => {
                    window.removeEventListener("mousemove", onMove);
                    window.removeEventListener("mouseup", onUp);
                  };
                  window.addEventListener("mousemove", onMove);
                  window.addEventListener("mouseup", onUp);
                }}
              />
              <div
                className="absolute bottom-4 right-0 w-1 h-auto cursor-ew-resize"
                onMouseDown={(e) => {
                  e.preventDefault();
                  const startX = e.clientX;
                  const startW = size.width;

                  const onMove = (ev: MouseEvent) => {
                    const newW = Math.max(minWidth, startW + (ev.clientX - startX));
                    setSize((prev) => ({ ...prev, width: newW }));
                  };
                  const onUp = () => {
                    window.removeEventListener("mousemove", onMove);
                    window.removeEventListener("mouseup", onUp);
                  };
                  window.addEventListener("mousemove", onMove);
                  window.addEventListener("mouseup", onUp);
                }}
              />
            </>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
