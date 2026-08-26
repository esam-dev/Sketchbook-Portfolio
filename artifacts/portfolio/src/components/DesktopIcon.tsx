import { ReactNode } from "react";

interface DesktopIconProps {
  label: string;
  icon: ReactNode;
  onClick: () => void;
  isSelected?: boolean;
}

export default function DesktopIcon({ label, icon, onClick, isSelected }: DesktopIconProps) {
  return (
    <button
      className={`flex flex-col items-center gap-1 w-[76px] p-1 rounded cursor-default select-none ${
        isSelected ? "bg-[#3366aa]/40" : "hover:bg-white/10"
      }`}
      onClick={onClick}
      onDoubleClick={onClick}
    >
      <div className="w-[48px] h-[48px] flex items-center justify-center">
        {icon}
      </div>
      <span
        className={`text-[11px] text-center leading-tight px-1 max-w-full truncate ${
          isSelected ? "bg-[#3366aa] text-white" : "text-white"
        }`}
        style={{
          textShadow: "1px 1px 2px rgba(0,0,0,0.8)",
        }}
      >
        {label}
      </span>
    </button>
  );
}
