'use client'

import { useState, useRef } from "react";

interface Props {
  content: string;
  children: React.ReactNode;
}

export function Tooltip({ content, children }: Props) {
  const [pos, setPos] = useState<{ x: number; y: number } | null>(null);
  const ref = useRef<HTMLDivElement>(null);

  const show = () => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    setPos({ x: rect.left + rect.width / 2, y: rect.top });
  };

  const hide = () => setPos(null);

  return (
    <div ref={ref} className="inline-block" onMouseEnter={show} onMouseLeave={hide}>
      {children}
      {pos && (
        <span
          className="fixed z-50 px-3 py-2 bg-surface border border-outline-variant rounded-lg text-sm text-on-surface shadow-lg pointer-events-none"
          style={{ left: pos.x, top: pos.y - 8, transform: "translate(-50%, -100%)", maxWidth: "280px", wordBreak: "break-word", whiteSpace: "normal" }}
        >
          {content}
        </span>
      )}
    </div>
  );
}
