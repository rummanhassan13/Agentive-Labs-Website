"use client";

import * as React from "react";
import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";

import { Button } from "@/components/ui/button";

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  // resolvedTheme is undefined on first render (next-themes resolves it after
  // hydration) — use that as our hydration gate instead of a separate mounted
  // boolean.
  const ready = resolvedTheme !== undefined;
  const isDark = ready && resolvedTheme === "dark";

  return (
    <Button
      variant="ghost"
      size="icon"
      aria-label={
        ready ? `Switch to ${isDark ? "light" : "dark"} mode` : "Toggle theme"
      }
      onClick={() => ready && setTheme(isDark ? "light" : "dark")}
    >
      {ready ? (
        isDark ? (
          <Sun className="h-5 w-5" aria-hidden />
        ) : (
          <Moon className="h-5 w-5" aria-hidden />
        )
      ) : (
        <span className="block h-5 w-5" aria-hidden />
      )}
    </Button>
  );
}
