import type { ReactNode } from "react";

/**
 * Page measure. 1200px content column with 24px / 40px gutters — slightly
 * wider than the reference sites so the three-up sector row keeps its air.
 */
export function Container({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`mx-auto w-full max-w-[75rem] px-6 lg:px-10 ${className}`}>
      {children}
    </div>
  );
}
