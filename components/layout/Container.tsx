import * as React from "react";
import { cn } from "@/lib/utils";

type ContainerSize = "prose" | "default" | "wide";

const sizeClass: Record<ContainerSize, string> = {
  prose: "max-w-[64ch]",
  default: "max-w-[1200px]",
  wide: "max-w-[1440px]",
};

export function Container({
  size = "default",
  className,
  children,
}: {
  size?: ContainerSize;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className={cn(
        "mx-auto w-full px-5 sm:px-6 lg:px-8",
        sizeClass[size],
        className
      )}
    >
      {children}
    </div>
  );
}
