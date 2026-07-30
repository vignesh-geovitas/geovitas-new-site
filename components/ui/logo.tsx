import Image from "next/image";

/**
 * Brand book, logo usage rules:
 *   1. The colour brandmark should only be used on a white background.
 *   2. The white brandmark should be used on dark backgrounds.
 * `geovitas-logo-white.png` is generated from the master artwork's alpha
 * channel, so it is the official white brandmark rather than a CSS filter.
 */
export function Logo({
  variant = "white",
  width = 148,
  className = "",
  priority = false,
}: {
  variant?: "white" | "colour";
  width?: number;
  className?: string;
  priority?: boolean;
}) {
  const INTRINSIC_RATIO = 1920 / 472;

  return (
    <Image
      src={variant === "white" ? "/geovitas-logo-white.png" : "/geovitas-logo.png"}
      alt="Geovitas"
      width={width}
      height={Math.round(width / INTRINSIC_RATIO)}
      priority={priority}
      className={className}
    />
  );
}
