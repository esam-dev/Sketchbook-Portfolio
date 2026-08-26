import { useState } from "react";

export default function CalculatorApp() {
  const [display, setDisplay] = useState("0");
  const [prev, setPrev] = useState<number | null>(null);
  const [op, setOp] = useState<string | null>(null);
  const [fresh, setFresh] = useState(true);

  const handleDigit = (d: string) => {
    if (fresh) {
      setDisplay(d === "." ? "0." : d);
      setFresh(false);
    } else {
      if (d === "." && display.includes(".")) return;
      setDisplay(display === "0" && d !== "." ? d : display + d);
    }
  };

  const handleOp = (nextOp: string) => {
    const current = parseFloat(display);
    if (prev !== null && op && !fresh) {
      const result = calculate(prev, current, op);
      setDisplay(String(result));
      setPrev(result);
    } else {
      setPrev(current);
    }
    setOp(nextOp);
    setFresh(true);
  };

  const handleEquals = () => {
    if (prev === null || !op) return;
    const current = parseFloat(display);
    const result = calculate(prev, current, op);
    setDisplay(String(result));
    setPrev(null);
    setOp(null);
    setFresh(true);
  };

  const calculate = (a: number, b: number, operator: string): number => {
    switch (operator) {
      case "+": return a + b;
      case "-": return a - b;
      case "*": return a * b;
      case "/": return b !== 0 ? a / b : 0;
      default: return b;
    }
  };

  const handleClear = () => {
    setDisplay("0");
    setPrev(null);
    setOp(null);
    setFresh(true);
  };

  const handleBackspace = () => {
    if (display.length > 1) {
      setDisplay(display.slice(0, -1));
    } else {
      setDisplay("0");
      setFresh(true);
    }
  };

  const handlePercent = () => {
    setDisplay(String(parseFloat(display) / 100));
  };

  const handleNegate = () => {
    setDisplay(String(-parseFloat(display)));
  };

  const Button = ({
    label,
    onClick,
    wide = false,
    accent = false,
    dark = false,
  }: {
    label: string;
    onClick: () => void;
    wide?: boolean;
    accent?: boolean;
    dark?: boolean;
  }) => (
    <button
      onClick={onClick}
      className={`
        ${wide ? "col-span-2" : ""}
        h-[34px] text-[14px] font-bold border
        ${accent
          ? "bg-[#3366aa] text-white border-[#2a5580] hover:bg-[#4a7fb8]"
          : dark
            ? "bg-[#606060] text-white border-[#404040] hover:bg-[#707070]"
            : "bg-[#ececec] text-[#333] border-t-white border-l-white border-b-[#808080] border-r-[#808080] hover:bg-[#e0e0e0]"
        }
        active:brightness-90 cursor-pointer
      `}
    >
      {label}
    </button>
  );

  return (
    <div className="h-full flex flex-col bg-[#ececec] p-3 gap-2">
      {/* Display */}
      <div className="bg-white bevel-sunken px-2 py-1.5 text-right min-h-[36px] flex items-center justify-end">
        <span
          className="text-[22px] font-bold text-[#333] truncate tabular-nums"
          style={{ fontFamily: "'DejaVu Sans Mono', monospace", maxWidth: "100%" }}
        >
          {display}
        </span>
      </div>

      {/* Buttons grid */}
      <div className="grid grid-cols-4 gap-1.5 flex-1">
        <Button label="C" onClick={handleClear} dark />
        <Button label="±" onClick={handleNegate} dark />
        <Button label="%" onClick={handlePercent} dark />
        <Button label="÷" onClick={() => handleOp("/")} accent={op === "/" && fresh} />

        <Button label="7" onClick={() => handleDigit("7")} />
        <Button label="8" onClick={() => handleDigit("8")} />
        <Button label="9" onClick={() => handleDigit("9")} />
        <Button label="×" onClick={() => handleOp("*")} accent={op === "*" && fresh} />

        <Button label="4" onClick={() => handleDigit("4")} />
        <Button label="5" onClick={() => handleDigit("5")} />
        <Button label="6" onClick={() => handleDigit("6")} />
        <Button label="−" onClick={() => handleOp("-")} accent={op === "-" && fresh} />

        <Button label="1" onClick={() => handleDigit("1")} />
        <Button label="2" onClick={() => handleDigit("2")} />
        <Button label="3" onClick={() => handleDigit("3")} />
        <Button label="+" onClick={() => handleOp("+")} accent={op === "+" && fresh} />

        <Button label="0" onClick={() => handleDigit("0")} wide />
        <Button label="." onClick={() => handleDigit(".")} />
        <Button label="=" onClick={handleEquals} accent />
      </div>
    </div>
  );
}
