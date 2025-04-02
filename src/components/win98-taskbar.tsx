import { useState } from "react";
import { Win98Button } from "@/components/win98-button";
import { Typography } from "@/components/ui/typography";
import { ModeToggle } from "@/components/mode-toggle";
import { Clock, Menu } from "lucide-react";

interface StartMenuItem {
  label: string;
  icon?: React.ReactNode;
  onClick?: () => void;
  submenu?: StartMenuItem[];
}

interface Win98TaskbarProps {
  startMenuItems?: StartMenuItem[];
  openWindows?: { id: string; title: string; onFocus: () => void }[];
}

export function Win98Taskbar({
  startMenuItems = [],
  openWindows = [],
}: Win98TaskbarProps) {
  const [isStartMenuOpen, setIsStartMenuOpen] = useState(false);
  const [currentTime, setCurrentTime] = useState(
    new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
  );

  // Обновление времени каждую минуту
  useState(() => {
    const timer = setInterval(() => {
      setCurrentTime(
        new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        })
      );
    }, 60000);
    return () => clearInterval(timer);
  });

  const toggleStartMenu = () => {
    setIsStartMenuOpen(!isStartMenuOpen);
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 border-t-2 border-[#dfdfdf] bg-card shadow-[0_-2px_0_#7e7e7e]">
      <div className="flex h-10 items-center justify-between px-1">
        <div className="relative flex items-center gap-1">
          <Win98Button
            className={cn(
              "h-8 px-2 py-1",
              isStartMenuOpen &&
                "shadow-[inset_1px_1px_#000,_inset_-1px_-1px_#fff,_inset_2px_2px_#7e7e7e,_inset_-2px_-2px_#dfdfdf]"
            )}
            onClick={toggleStartMenu}
            icon={<Menu className="h-4 w-4 text-foreground" />}
          >
            Пуск
          </Win98Button>

          {isStartMenuOpen && (
            <div className="absolute bottom-full left-0 mb-1 w-56 border-2 border-border bg-card shadow-[2px_2px_0px_#000]">
              {startMenuItems.map((item, index) => (
                <div
                  key={index}
                  className="flex cursor-pointer items-center gap-2 px-4 py-2 hover:bg-primary hover:text-primary-foreground"
                  onClick={() => {
                    item.onClick?.();
                    setIsStartMenuOpen(false);
                  }}
                >
                  {item.icon}
                  <Typography.Small>{item.label}</Typography.Small>
                </div>
              ))}
            </div>
          )}

          {openWindows.map((window) => (
            <Win98Button
              key={window.id}
              className="h-8 min-w-32 px-2 py-1"
              onClick={window.onFocus}
            >
              {window.title}
            </Win98Button>
          ))}
        </div>

        <div className="flex items-center gap-2 px-2">
          <ModeToggle />
          <div className="flex h-8 items-center gap-1 border-2 border-border bg-card px-2 shadow-[inset_1px_1px_#000,_inset_-1px_-1px_#fff,_inset_2px_2px_#7e7e7e,_inset_-2px_-2px_#dfdfdf]">
            <Clock className="h-4 w-4 text-foreground" />
            <Typography.Small>{currentTime}</Typography.Small>
          </div>
        </div>
      </div>
    </div>
  );
}

// Вспомогательная функция для условного объединения классов
function cn(...classes: (string | boolean | undefined)[]) {
  return classes.filter(Boolean).join(" ");
}