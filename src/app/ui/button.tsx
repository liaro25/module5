"use client";

import * as React from "react";
import Link, { type LinkProps } from "next/link";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "danger" | "ghost";
type Size = "sm" | "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2 rounded-xl font-semibold " +
  "transition-all duration-300 ease-out active:scale-95 " +
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A896FF]/50 " +
  "disabled:opacity-50 disabled:pointer-events-none";

const variants: Record<Variant, string> = {
  primary:
    "text-white bg-linear-to-r from-[#A896FF] to-[#82E0FF] " +
    "shadow-[0_8px_24px_rgba(168,150,255,0.25)] " +
    "hover:scale-105 hover:shadow-[0_16px_36px_rgba(168,150,255,0.35)]",

  // changed to white instead of unseen background
  secondary:
    "text-stone-800 bg-white border border-stone-200 shadow-sm " +
    "hover:scale-105 hover:shadow-md",

  danger:
    "text-white bg-linear-to-r from-[#FF9EB5] to-[#FF6B8A] " +
    "hover:scale-105 hover:shadow-[0_12px_28px_rgba(255,107,138,0.35)]",

  ghost:
    "text-stone-800 bg-transparent border border-transparent " +
    "hover:bg-white/50 hover:border-white/40",
};

const sizes: Record<Size, string> = {
  sm: "px-3 py-2 text-xs",
  md: "px-5 py-2.5 text-sm",
  lg: "px-6 py-3 text-base",
};

type CommonProps = {
  variant?: Variant;
  size?: Size;
  fullWidth?: boolean;
  className?: string;
  children: React.ReactNode;
};

// Button mode (render <button>)
type ButtonOnlyProps = CommonProps &
  Omit<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    "className" | "children"
  > & {
    href?: never;
  };

// Link mode (render <Link>)
type LinkOnlyProps = CommonProps &
  Omit<
    React.AnchorHTMLAttributes<HTMLAnchorElement>,
    "className" | "children" | "href"
  > & {
    href: LinkProps["href"];
  };

//
export default function Button(props: ButtonOnlyProps): React.ReactElement;
export default function Button(props: LinkOnlyProps): React.ReactElement;

export default function Button(props: ButtonOnlyProps | LinkOnlyProps) {
  const {
    variant = "primary",
    size = "md",
    fullWidth,
    className,
    children,
    ...rest
  } = props;

  const classes = cn(
    base,
    variants[variant],
    sizes[size],
    fullWidth && "w-full",
    className,
  );

  if ("href" in props) {
    const { href, ...linkProps } = rest as Omit<
      LinkOnlyProps,
      keyof CommonProps
    >;
    return (
      <Link href={href} className={classes} {...linkProps}>
        {children}
      </Link>
    );
  }

  return (
    <button
      className={classes}
      {...(rest as Omit<ButtonOnlyProps, keyof CommonProps>)}
    >
      {children}
    </button>
  );
}
