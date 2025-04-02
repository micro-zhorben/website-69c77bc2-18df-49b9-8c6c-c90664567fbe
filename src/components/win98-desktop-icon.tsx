import { cn } from "@/lib/utils";
import { Typography } from "@/components/ui/typography";

interface Win98DesktopIconProps {
  icon: React.ReactNode;
  label: string;
  onClick?: () => void;
  className?: string;
  isSelected?: boolean;
}

export function Win98DesktopIcon({
  icon,
  label,
  onClick,
  className,
  isSelected = false,
}: Win98DesktopIconProps) {
  return (
    <div
      className={cn(
        "flex w-20 cursor-pointer flex-col items-center gap-1 p-2 text-center",
        isSelected && "bg-primary text-primary-foreground",
        className
      )}
      onClick={onClick}
      onDoubleClick={onClick}
    >
      <div
        className={cn(
          "flex h-12 w-12 items-center justify-center",
          isSelected ? "text-primary-foreground" : "text-foreground"
        )}
      >
        {icon}
      </div>
      <Typography.Small
        className={cn(
          "w-full break-words text-center",
          isSelected ? "text-primary-foreground" : "text-foreground"
        )}
      >
        {label}
      </Typography.Small>
    </div>
  );
}