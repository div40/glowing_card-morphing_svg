"use client";

import { cn } from "@/lib/utils";
import {
  ComponentPropsWithoutRef,
  CSSProperties,
  useEffect,
  useRef,
} from "react";

interface GlowAreaProps extends ComponentPropsWithoutRef<"div"> {
  size?: number;
}

const GlowArea = (props: GlowAreaProps) => {
  const element = useRef<HTMLDivElement | null>(null);
  const { size = 300, className, ...rest } = props;

  const latestCoordinates = useRef<{
    x: number;
    y: number;
  } | null>(null);

  const frameId = useRef<number | null>(null);

  const updateGlow = () => {
    if (latestCoordinates.current && element.current) {
      element.current.style.setProperty(
        "--glow-x",
        `${latestCoordinates.current.x}px`
      );
      element.current.style.setProperty(
        "--glow-y",
        `${latestCoordinates.current.y}px`
      );

      frameId.current = null;
    }
  };

  //Track mouse movements
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const bounds = e.currentTarget.getBoundingClientRect();
    latestCoordinates.current = {
      x: e.clientX - bounds.left,
      y: e.clientY - bounds.top,
    };

    if (!frameId.current) {
      frameId.current = requestAnimationFrame(() => updateGlow());
    }
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    e.currentTarget.style.removeProperty("--glow-x");
    e.currentTarget.style.removeProperty("--glow-y");
  };
  return (
    <div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      ref={element}
      className={cn("glow-area", className)}
      style={
        {
          "--glow-size": `${size}px`,
        } as CSSProperties
      }
      {...rest}
    />
  );
};

export default GlowArea;

interface GlowProps extends ComponentPropsWithoutRef<"div"> {
  color?: string;
}
export const Glow = (props: GlowProps) => {
  const { className, color = "blue", children, ...rest } = props;
  const element = useRef<HTMLDivElement | null>(null);

  /*calc(var(--glow-x, -99999px) - var(--glow-left, 0px))
  calc(var(--glow-y, -99999px) - var(--glow-top,0px)) sets the glow right underneath the cursor */

  // useEffect(() => {
  //   element.current?.style.setProperty(
  //     "--glow-top",
  //     `${element.current?.offsetTop}px`
  //   );
  //   element.current?.style.setProperty(
  //     "--glow-left",
  //     `${element.current?.offsetLeft}px`
  //   );
  // }, []);

  return (
    <div ref={element} className={cn("relative", className)}>
      <div
        {...rest}
        style={{
          backgroundImage: `radial-gradient(
        var(--glow-size) var(--glow-size) at calc(var(--glow-x, -99999px) - var(--glow-left, 0px))
        calc(var(--glow-y, -99999px) - var(--glow-top,0px)),
        ${color} 0%,
        transparent 100%
        )`,
        }}
        className={cn(
          className,
          "absolute pointer-events-none inset-0 dark:mix-blend-lighten mix-blend-multiply after:absolute after:bg-background/80 after:content-[''] after:inset-0.5 after:rounded-[inherit]"
        )}
      ></div>
      {children}
    </div>
  );
};
