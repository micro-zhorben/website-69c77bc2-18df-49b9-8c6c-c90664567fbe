import { Win98Window } from "@/components/win98-window";
import { Win98Button } from "@/components/win98-button";
import { Typography } from "@/components/ui/typography";
import { AlertTriangle, Info, X } from "lucide-react";

interface Win98DialogProps {
  title: string;
  message: string;
  type?: "info" | "warning" | "error";
  buttons?: { label: string; onClick: () => void }[];
  isOpen: boolean;
  onClose: () => void;
}

export function Win98Dialog({
  title,
  message,
  type = "info",
  buttons = [{ label: "OK", onClick: () => {} }],
  isOpen,
  onClose,
}: Win98DialogProps) {
  if (!isOpen) return null;

  const getIcon = () => {
    switch (type) {
      case "warning":
        return <AlertTriangle className="h-10 w-10 text-foreground" />;
      case "error":
        return <X className="h-10 w-10 text-destructive" />;
      case "info":
      default:
        return <Info className="h-10 w-10 text-foreground" />;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <Win98Window
        title={title}
        width="350px"
        defaultPosition={{ x: window.innerWidth / 2 - 175, y: 100 }}
        onClose={onClose}
      >
        <div className="flex flex-col gap-4">
          <div className="flex gap-4">
            <div className="flex-shrink-0">{getIcon()}</div>
            <Typography.P>{message}</Typography.P>
          </div>
          <div className="flex justify-end gap-2">
            {buttons.map((button, index) => (
              <Win98Button
                key={index}
                onClick={() => {
                  button.onClick();
                  onClose();
                }}
              >
                {button.label}
              </Win98Button>
            ))}
          </div>
        </div>
      </Win98Window>
    </div>
  );
}