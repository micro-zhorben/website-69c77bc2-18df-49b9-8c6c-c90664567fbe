import { cn } from "@/lib/utils";
import { Typography } from "@/components/ui/typography";
import { useState } from "react";
import { ChevronRight } from "lucide-react";

interface MenuItem {
  label: string;
  icon?: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  separator?: boolean;
  submenu?: MenuItem[];
}

interface Win98MenuProps {
  items: MenuItem[];
  className?: string;
}

export function Win98Menu({ items, className }: Win98MenuProps) {
  return (
    <div
      className={cn(
        "border-2 border-border bg-card shadow-[2px_2px_0px_#000]",
        className
      )}
    >
      {items.map((item, index) => (
        <MenuItem key={index} item={item} level={0} />
      ))}
    </div>
  );
}

interface MenuItemProps {
  item: MenuItem;
  level: number;
}

function MenuItem({ item, level }: MenuItemProps) {
  const [isHovered, setIsHovered] = useState(false);

  if (item.separator) {
    return <div className="my-1 h-px bg-border" />;
  }

  return (
    <div
      className="relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className={cn(
          "flex cursor-pointer items-center justify-between px-4 py-1",
          item.disabled
            ? "cursor-not-allowed opacity-50"
            : "hover:bg-primary hover:text-primary-foreground",
          isHovered && "bg-primary text-primary-foreground"
        )}
        onClick={() => !item.disabled && item.onClick?.()}
      >
        <div className="flex items-center gap-2">
          {item.icon && (
            <span
              className={cn(
                "flex h-4 w-4 items-center justify-center",
                isHovered ? "text-primary-foreground" : "text-foreground"
              )}
            >
              {item.icon}
            </span>
          )}
          <Typography.Small
            className={cn(
              isHovered ? "text-primary-foreground" : "text-foreground"
            )}
          >
            {item.label}
          </Typography.Small>
        </div>
        {item.submenu && (
          <ChevronRight
            className={cn(
              "h-3 w-3",
              isHovered ? "text-primary-foreground" : "text-foreground"
            )}
          />
        )}
      </div>

      {isHovered && item.submenu && (
        <div
          className="absolute left-full top-0 z-10 border-2 border-border bg-card shadow-[2px_2px_0px_#000]"
          style={{ minWidth: "150px" }}
        >
          {item.submenu.map((subItem, subIndex) => (
            <MenuItem key={subIndex} item={subItem} level={level + 1} />
          ))}
        </div>
      )}
    </div>
  );
}