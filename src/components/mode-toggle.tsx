import { useTheme } from "@/components/theme-provider";
import { Button } from "@/components/ui/button";
import { Moon, Sun } from "lucide-react";
import { Typography } from "@/components/ui/typography";

export function ModeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <div className="flex items-center gap-2">
      <Button
        variant="outline"
        size="sm"
        className="border-2 border-border bg-card px-2 py-1 text-foreground shadow-[inset_-1px_-1px_#000,_inset_1px_1px_#fff,_inset_-2px_-2px_#7e7e7e,_inset_2px_2px_#dfdfdf] hover:bg-card/90 dark:shadow-[inset_-1px_-1px_#666,_inset_1px_1px_#333,_inset_-2px_-2px_#444,_inset_2px_2px_#222]"
        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      >
        {theme === "dark" ? (
          <Sun className="h-4 w-4 text-foreground" />
        ) : (
          <Moon className="h-4 w-4 text-foreground" />
        )}
        <Typography.Small>
          {theme === "dark" ? "Светлая тема" : "Темная тема"}
        </Typography.Small>
      </Button>
    </div>
  );
}