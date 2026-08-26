import { useState } from "react";

const WELCOME_TEXT = `Welcome to gedit - GNOME Text Editor

This is a simple text editor for the
Fedora Core 1 desktop environment.

You can type anything here. Your text
will be preserved during this session.

-- End of file --`;

export default function TextEditorApp() {
  const [content, setContent] = useState(WELCOME_TEXT);
  const [modified, setModified] = useState(false);
  const [fileName, setFileName] = useState("Untitled");

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
    if (!modified) setModified(true);
  };

  const handleNew = () => {
    setContent("");
    setFileName("Untitled");
    setModified(false);
  };

  const handleSave = () => {
    const blob = new Blob([content], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = fileName === "Untitled" ? "document.txt" : fileName;
    a.click();
    URL.revokeObjectURL(url);
    setModified(false);
  };

  const lineCount = content.split("\n").length;
  const charCount = content.length;

  return (
    <div className="h-full flex flex-col bg-[#ececec]">
      {/* Toolbar */}
      <div className="flex items-center gap-1 px-2 py-1 bg-[#ececec] border-b border-[#d0d0d0] shrink-0">
        <button onClick={handleNew} className="btn-widget text-[11px] px-2 py-0.5">
          New
        </button>
        <button onClick={handleSave} className="btn-widget text-[11px] px-2 py-0.5">
          Save
        </button>
        <div className="flex-1" />
        <span className="text-[11px] text-[#666]">
          {modified ? "* " : ""}{fileName}
        </span>
      </div>

      {/* Text area */}
      <div className="flex-1 bg-white bevel-sunken m-[3px] overflow-hidden">
        <textarea
          value={content}
          onChange={handleChange}
          className="w-full h-full p-2 text-[12px] text-[#333] bg-transparent resize-none outline-none"
          style={{ fontFamily: "'DejaVu Sans Mono', 'Courier New', monospace", lineHeight: "1.5" }}
          spellCheck={false}
          wrap="off"
        />
      </div>

      {/* Status bar */}
      <div className="h-[20px] bg-[#ececec] border-t border-t-white flex items-center justify-between px-2 text-[10px] text-[#666] shrink-0">
        <span>Ln {lineCount}, Col 1</span>
        <span>{charCount} characters</span>
        <span>UTF-8</span>
      </div>
    </div>
  );
}
