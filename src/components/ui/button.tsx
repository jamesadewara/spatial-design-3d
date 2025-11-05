import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 relative overflow-hidden",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline:
          "border border-input bg-background hover:bg-accent",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary",
hero: `
  relative
  border-0
  bg-primary text-primary-foreground font-mono leading-none no-underline
  shadow-[rgba(0,0,0,0.05)_0_2px_4px,rgba(0,0,0,0.05)_0_7px_13px_-3px,theme(colors.border)_0_-3px_0_inset]
  transition-all duration-150 ease-in-out
  hover:-translate-y-0.5
  hover:shadow-[rgba(0,0,0,0.07)_0_4px_8px,rgba(0,0,0,0.07)_0_7px_13px_-3px,theme(colors.border)_0_-3px_0_inset]
  active:translate-y-0.5
  active:shadow-[theme(colors.border)_0_3px_7px_inset]
  focus:shadow-[theme(colors.border)_0_0_0_1.5px_inset,rgba(0,0,0,0.1)_0_2px_4px,rgba(0,0,0,0.05)_0_7px_13px_-3px,theme(colors.border)_0_-3px_0_inset]
  touch-manipulation
  before:absolute before:inset-0
  before:bg-gradient-to-r before:from-transparent before:via-white/20 before:to-transparent
  before:-translate-x-[200%] hover:before:translate-x-[200%]
  before:transition-transform before:duration-700
  rounded-lg hover:-translate-y-[2px] active:translate-y-[1px]
  hover:shadow-xl active:shadow-md active:border-2 
`,
        gradient:
          "bg-gradient-to-r from-primary to-accent text-primary-foreground hover:opacity-90 before:absolute before:inset-0 before:bg-gradient-to-r before:from-transparent before:via-white/30 before:to-transparent before:-translate-x-[200%] hover:before:translate-x-[200%] before:transition-transform before:duration-700",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-12 rounded-lg px-8 text-base",
        xl: "h-14 rounded-xl px-10 text-lg",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  shimmer?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, shimmer = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    
    const shimmerClass = shimmer 
      ? "before:absolute before:inset-0 before:bg-gradient-to-r before:from-transparent before:via-white/30 before:to-transparent before:translate-x-[-200%] hover:before:translate-x-[200%] before:transition-transform before:duration-700" 
      : "";
    
    return (
      <Comp 
        className={cn(buttonVariants({ variant, size }), shimmerClass, className)} 
        ref={ref} 
        {...props} 
      />
    );
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };