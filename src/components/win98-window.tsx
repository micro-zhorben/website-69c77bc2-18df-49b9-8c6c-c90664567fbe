import { cn } from "@/lib/utils";
import { ReactNode, useState } from "react";
import { Minus, Square, X } from "lucide-react";
import { Typography } from "@/components/ui/typography";

interface Win98WindowProps {
  title: string;
  children: ReactNode;
  className?: string;
  defaultPosition?: { x: number; y: number };
  width?: string;
  height?: string;
  onClose?: () => void;
}

export function Win98Window({
  title,
  children,
  className,
  defaultPosition = { x: 50, y: 50 },
  width = "400px",
  height = "auto",
  onClose,
}: Win98WindowProps) {
  const [position, setPosition] = useState(defaultPosition);
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [isMinimized, setIsMinimized] = useState(false);

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    setIsDragging(true);
    setDragOffset({
      x: e.clientX - position.x,
      y: e.clientY - position.y,
    });
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isDragging) {
      setPosition({
        x: e.clientX - dragOffset.x,
        y: e.clientY - dragOffset.y,
      });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  return (
    <div
      className={cn(
        "absolute shadow-[2px_2px_0px_#000] transition-all",
        className
      )}
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        width,
        height: isMinimized ? "32px" : height,
        zIndex: isDragging ? 100 : 10,
      }}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={() => isDragging && setIsDragging(false)}
    >
      <div
        className="flex h-8 cursor-move items-center justify-between bg-primary px-2 text-primary-foreground"
        onMouseDown={handleMouseDown}
      >
        <Typography.Small className="font-bold">{title}</Typography.Small>
        <div className="flex gap-1">
          <button
            className="flex h-5 w-5 items-center justify-center border-2 border-border bg-card text-foreground shadow-[inset_-1px_-1px_#000,_inset_1px_1px_#fff,_inset_-2px_-2px_#7e7e7e,_inset_2px_2px_#dfdfdf] hover:bg-card/90"
            onClick={() => setIsMinimized(!isMinimized)}
          >
            <Minus className="h-3 w-3 text-foreground" />
          </button>
          <button
            className="flex h-5 w-5 items-center justify-center border-2 border-border bg-card text-foreground shadow-[inset_-1px_-1px_#000,_inset_1px_1px_#fff,_inset_-2px_-2px_#7e7e7e,_inset_2px_2px_#dfdfdf] hover:bg-card/90"
          >
            <Square className="h-3 w-3 text-foreground" />
          </button>
          <button
            className="flex h-5 w-5 items-center justify-center border-2 border-border bg-card text-foreground shadow-[inset_-1px_-1px_#000,_inset_1px_1px_#fff,_inset_-2px_-2px_#7e7e7e,_inset_2px_2px_#dfdfdf] hover:bg-card/90"
            onClick={onClose}
          >
            <X className="h-3 w-3 text-foreground" />
          </button>
        </div>
      </div>
      {!isMinimized && (
        <div className="border-2 border-t-0 border-border bg-card p-4">
          {children}
        </div>
      )}
    </div>
  );
}