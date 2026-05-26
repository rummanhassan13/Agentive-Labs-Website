"use client";

import * as React from "react";
import * as runtime from "react/jsx-runtime";

interface MDXContentProps {
  code: string;
  components?: Record<string, React.ComponentType<any>>;
}

export function MDXContent({ code, components = {} }: MDXContentProps) {
  const Component = React.useMemo(() => {
    if (!code) return null;
    try {
      const fn = new Function(code);
      return fn(runtime).default;
    } catch (err) {
      console.error("Error executing MDX compiled code:", err);
      return null;
    }
  }, [code]);

  if (!Component) return null;

  return <Component components={components} />;
}
