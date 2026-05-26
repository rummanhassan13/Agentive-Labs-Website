"use client";

import * as React from "react";
import { Menu } from "lucide-react";

import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { NavLink } from "@/components/nav/NavLink";
import { BookSprintCta } from "@/components/cta/BookSprintCta";
import { ThemeToggle } from "@/components/utility/ThemeToggle";
import type { NavItem } from "@/components/nav/nav-config";

export function MobileDrawer({ items }: { items: NavItem[] }) {
  const [open, setOpen] = React.useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          aria-label="Open navigation menu"
          className="md:hidden"
        >
          <Menu className="h-5 w-5" />
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-full sm:max-w-sm">
        <SheetHeader>
          <SheetTitle>Menu</SheetTitle>
        </SheetHeader>
        <nav className="mt-8 flex flex-col gap-4" aria-label="Mobile">
          {items.map((it) => (
            <NavLink
              key={it.href}
              href={it.href}
              onClick={() => setOpen(false)}
              className="text-base"
            >
              {it.label}
            </NavLink>
          ))}
        </nav>
        <div className="mt-8 flex items-center justify-between gap-3">
          <BookSprintCta className="w-full flex-1" label="Book the Discovery Sprint" />
          <ThemeToggle />
        </div>
      </SheetContent>
    </Sheet>
  );
}
