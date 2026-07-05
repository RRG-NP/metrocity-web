import Link from "next/link";
import { cn } from "@/lib/utils";

type Variant = "gradient" | "outline" | "ghost";
type Size = "sm" | "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2 rounded-full font-semibold transition-all duration-[250ms] ease-out focus-visible:outline-3 focus-visible:outline-offset-2 disabled:opacity-60 disabled:pointer-events-none";

const sizes: Record<Size, string> = {
  sm: "px-4 py-2 text-sm",
  md: "px-6 py-3 text-sm",
  lg: "px-8 py-4 text-base",
};

const variants: Record<Variant, string> = {
  gradient:
    "bg-gradient-primary text-white shadow-[var(--shadow-cranberry-20)] hover:-translate-y-0.5 hover:shadow-[var(--shadow-cranberry-40)]",
  outline:
    "border-2 border-azure text-azure bg-white hover:-translate-y-0.5 hover:bg-azure-50 hover:shadow-[var(--shadow-azure-20)]",
  ghost: "text-ink hover:text-cranberry hover:bg-cloud",
};

type CommonProps = {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: React.ReactNode;
};

type ButtonAsButton = CommonProps &
  React.ButtonHTMLAttributes<HTMLButtonElement> & { href?: undefined };

type ButtonAsLink = CommonProps & {
  href: string;
} & Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, "href">;

export function Button(props: ButtonAsButton | ButtonAsLink) {
  const {
    variant = "gradient",
    size = "md",
    className,
    children,
    ...rest
  } = props;

  const classes = cn(base, sizes[size], variants[variant], className);

  if ("href" in props && props.href !== undefined) {
    const { href, ...anchorRest } = rest as ButtonAsLink;
    const external = href.startsWith("http");
    // mailto:, tel:, etc. need a plain anchor (no router, no new tab).
    const scheme = /^[a-z][a-z0-9+.-]*:/i.test(href) && !external;
    if (external || scheme) {
      return (
        <a
          href={href}
          className={classes}
          {...(external
            ? { target: "_blank", rel: "noopener noreferrer" }
            : null)}
          {...(anchorRest as React.AnchorHTMLAttributes<HTMLAnchorElement>)}
        >
          {children}
        </a>
      );
    }
    return (
      <Link
        href={href}
        className={classes}
        {...(anchorRest as React.AnchorHTMLAttributes<HTMLAnchorElement>)}
      >
        {children}
      </Link>
    );
  }

  return (
    <button
      className={classes}
      {...(rest as React.ButtonHTMLAttributes<HTMLButtonElement>)}
    >
      {children}
    </button>
  );
}
