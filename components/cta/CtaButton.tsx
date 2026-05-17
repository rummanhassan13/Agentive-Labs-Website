import * as React from "react";
import Link from "next/link";
import { Button, type ButtonProps } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface CtaButtonProps extends Omit<ButtonProps, "asChild"> {
  href?: string;
  external?: boolean;
}

export function CtaButton({
  href,
  external,
  variant = "default",
  size = "default",
  className,
  children,
  ...props
}: CtaButtonProps) {
  const merged = cn(className);
  if (href) {
    if (external) {
      return (
        <Button asChild variant={variant} size={size} className={merged}>
          <a href={href} target="_blank" rel="noopener noreferrer">
            {children}
          </a>
        </Button>
      );
    }
    return (
      <Button asChild variant={variant} size={size} className={merged}>
        <Link href={href}>{children}</Link>
      </Button>
    );
  }
  return (
    <Button variant={variant} size={size} className={merged} {...props}>
      {children}
    </Button>
  );
}
