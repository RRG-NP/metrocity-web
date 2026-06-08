"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Menu, X } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Logo } from "@/components/ui/Logo";
import { navLinks } from "@/data/siteSettings";
import { cn } from "@/lib/utils";

export function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close drawer on route change.
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setOpen(false);
  }, [pathname]);

  // Lock body scroll while drawer is open.
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled
          ? "bg-white/90 shadow-[var(--shadow-soft)] backdrop-blur-md"
          : "bg-transparent",
      )}
    >
      <Container className="flex h-18 items-center justify-between py-3">
        {/* White logo over the hero, dark logo once scrolled. */}
        <Logo light={!scrolled} />

        {/* Desktop nav */}
        <nav aria-label="Primary" className="hidden lg:block">
          <ul className="flex items-center gap-7">
            {navLinks.map((link) => {
              const active = isActive(link.href);
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    aria-current={active ? "page" : undefined}
                    className={cn(
                      "group relative text-sm font-semibold transition-colors duration-200",
                      scrolled
                        ? active
                          ? "text-cranberry"
                          : "text-ink hover:text-cranberry"
                        : active
                          ? "text-white"
                          : "text-white/85 hover:text-white",
                    )}
                  >
                    {link.label}
                    <span
                      className={cn(
                        "absolute -bottom-1.5 left-0 h-0.5 rounded-full transition-all duration-300",
                        scrolled ? "bg-gradient-primary" : "bg-white",
                        active ? "w-full" : "w-0 group-hover:w-full",
                      )}
                    />
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="flex items-center gap-3">
          <Button
            href="/membership"
            size="sm"
            variant={scrolled ? "gradient" : "outline"}
            className={cn(
              "hidden sm:inline-flex",
              !scrolled &&
                "!border-white/70 !bg-white !text-cranberry hover:!bg-cloud",
            )}
          >
            Join Us
          </Button>

          {/* Mobile toggle */}
          <button
            type="button"
            className={cn(
              "inline-flex h-10 w-10 items-center justify-center rounded-full transition-colors lg:hidden",
              scrolled
                ? "text-ink hover:text-cranberry"
                : "text-white hover:text-white/80",
            )}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X /> : <Menu />}
          </button>
        </div>
      </Container>

      {/* Mobile drawer */}
      <AnimatePresence>
        {open && (
          <>
            <motion.div
              className="bg-ink/40 fixed inset-0 z-40 backdrop-blur-sm lg:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
              aria-hidden="true"
            />
            <motion.nav
              aria-label="Mobile"
              className="fixed top-0 right-0 z-50 flex h-dvh w-[82%] max-w-sm flex-col bg-white p-6 shadow-2xl lg:hidden"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{
                type: "tween",
                duration: 0.3,
                ease: [0.215, 0.61, 0.355, 1],
              }}
            >
              <div className="mb-8 flex items-center justify-between">
                <Logo />
                <button
                  type="button"
                  aria-label="Close menu"
                  onClick={() => setOpen(false)}
                  className="text-ink hover:text-cranberry inline-flex h-10 w-10 items-center justify-center rounded-full"
                >
                  <X />
                </button>
              </div>
              <ul className="flex flex-col gap-1">
                {navLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      aria-current={isActive(link.href) ? "page" : undefined}
                      className={cn(
                        "block rounded-xl px-4 py-3 text-lg font-semibold transition-colors",
                        isActive(link.href)
                          ? "bg-cloud text-cranberry"
                          : "text-ink hover:bg-cloud",
                      )}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
              <div className="mt-auto pt-6">
                <Button href="/membership" className="w-full">
                  Join Us
                </Button>
              </div>
            </motion.nav>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}
