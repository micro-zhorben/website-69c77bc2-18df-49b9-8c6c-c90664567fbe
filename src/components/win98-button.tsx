import { cn } from "@/lib/utils";
import { ButtonHTMLAttributes, forwardRef } from "react";
import { Typography } from "@/components/ui/typography";

interface Win98ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "primary" | "destructive";
  size?: "sm" | "md" | "lg";
  icon?: React.ReactNode;
}

export const Win98Button = forwardRef<HTMLButtonElement, Win98ButtonProps>(
  (
    {
      className,
      variant = "default",
      size = "md",
      children,
      icon,
      disabled,
      ...props
    },
    ref
  ) => {
    return (
      <button
        ref={ref}
        disabled={disabled}
        className={cn(
          "relative inline-flex select-none items-center justify-center gap-2 border-2 border-border bg-card text-foreground shadow-[inset_-1px_-1px_#000,_inset_1px_1px_#fff,_inset_-2px_-2px_#7e7e7e,_inset_2px_2px_#dfdfdf] transition-colors",
          "active:shadow-[inset_1px_1px_#000,_inset_-1px_-1px_#fff,_inset_2px_2px_#7e7e7e,_inset_-2px_-2px_#dfdfdf] active:translate-y-[1px]",
          "disabled:opacity-50 disabled:pointer-events-none",
          {
            "bg-primary text-primary-foreground": variant === "primary",
            "bg-destructive text-destructive-foreground":
              variant === "destructive",
            "px-2 py-1 text-xs": size === "sm",
            "px-3 py-1.5": size === "md",
            "px-4 py-2 text-lg": size === "lg",
          },
          className
        )}
        {...props}
      >
        {icon && <span className="flex items-center">{icon}</span>}
        <Typography.Small className="font-normal">{children}</Typography.Small>
      </button>
    );
  }
);

Win98Button.displayName = "Win98Button";