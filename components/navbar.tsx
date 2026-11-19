"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Icon, Logo } from "./shared";

export function Navbar() {
  const [menu, setMenu] = useState(false);
  const pathname = usePathname();
  const closeMenu = () => setMenu(false);

  return (
    <header className="sticky top-0 relative z-[50] h-[68px] border-b border-[#eceaf7] bg-white/70 backdrop-blur-[15px] lg:h-[78px]">
      <div className="container mx-auto flex h-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Logo />
        <nav
          className={cn(
            "hidden items-center gap-[30px] lg:flex",
            menu &&
            "absolute left-[15px] right-[15px] top-[72px] z-10 flex flex-col items-stretch gap-0 rounded-[14px] bg-white p-[15px] shadow-[0_15px_40px_rgba(50,55,90,0.16)] lg:static lg:flex-row lg:items-center lg:gap-[30px] lg:rounded-none lg:bg-transparent lg:p-0 lg:shadow-none",
          )}
        >
          <Link
            href="/"
            className={cn(
              "relative border-0 bg-transparent px-3 py-3 text-left text-sm font-semibold text-[#686d88] hover:text-ink lg:px-0 lg:py-[28px] lg:text-center",
              pathname === "/" &&
              "text-ink after:absolute after:bottom-4 after:left-0 after:right-0 after:hidden after:h-0.5 after:rounded-sm after:bg-ink lg:after:block",
            )}
            onClick={closeMenu}
          >
            Home
          </Link>
          <Link
            href="/events"
            className={cn(
              "relative border-0 bg-transparent px-3 py-3 text-left text-sm font-semibold text-[#686d88] hover:text-ink lg:px-0 lg:py-[28px] lg:text-center",
              pathname.startsWith("/events") &&
              "text-ink after:absolute after:bottom-4 after:left-0 after:right-0 after:hidden after:h-0.5 after:rounded-sm after:bg-ink lg:after:block",
            )}
            onClick={closeMenu}
          >
            Upcoming events
          </Link>
        </nav>

        <Link href="/register"> 
        <Button
 className="inline-flex items-center justify-center gap-[10px] rounded-xl bg-ink px-[18px] py-[11px] text-sm font-bold text-white shadow-[0_8px_18px_rgba(66,72,116,0.18)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#343a64] hover:shadow-[0_11px_25px_rgba(66,72,116,0.24)] hidden sm:inline-flex">
          Sign In <Icon name="arrow" size={16} />
        </Button>
      </Link>

      <button
        className="border-0 bg-transparent text-ink lg:hidden"
        onClick={() => setMenu(!menu)}
        aria-label="Toggle menu"
        aria-expanded={menu}
      >
        {menu ? <Icon name="close" /> : <Icon name="menu" />}
      </button>
    </div>
    </header >
  );
}
