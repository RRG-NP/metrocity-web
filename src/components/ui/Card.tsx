import { cn } from "@/lib/utils";

type CardProps = {
  children: React.ReactNode;
  className?: string;
  /** apply hover lift + shadow intensify */
  interactive?: boolean;
};

/** Surface card with signature asymmetric corners and soft tinted shadow. */
export function Card({ children, className, interactive }: CardProps) {
  return (
    <div
      className={cn(
        "rounded-asym-sm bg-white shadow-[var(--shadow-soft)]",
        interactive &&
          "transition-all duration-[250ms] ease-out hover:-translate-y-1 hover:shadow-[var(--shadow-cranberry-20)]",
        className,
      )}
    >
      {children}
    </div>
  );
}
