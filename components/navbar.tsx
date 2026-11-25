"use client";

import { useState } from "react";
import Link from "next/link";
import { redirect, usePathname } from "next/navigation";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import {
  Popover,
  PopoverContent,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
} from "@/components/ui/popover"
import { ArrowRight, Menu, X } from "lucide-react";


import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { authClient } from "@/lib/auth-client";

export default function Navbar() {
  const [menu, setMenu] = useState(false);
  const [profilePopoverOpen, setProfilePopoverOpen] = useState(false);
  const pathname = usePathname();
  const closeMenu = () => setMenu(false);
  const closeProfilePopover = () => setProfilePopoverOpen(false);

  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;

  const handleSignOut = () => {
    closeProfilePopover();
    authClient.signOut();
    redirect("/")

  }
  return (
    <header className="sticky top-0 z-[50] h-[68px] border-b border-[#eceaf7] bg-white/70 backdrop-blur-[15px] lg:h-[78px]">
      {/* The mobile grid keeps the menu, logo, and account action on opposite sides. */}
      <div className="container relative mx-auto grid h-full max-w-7xl grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] items-center px-4 sm:px-6 lg:flex lg:justify-between lg:px-8">
        <Link
          href="/"
          className="hidden lg:inline-flex items-center gap-[10px] border-0 bg-transparent p-0 font-heading text-lg font-extrabold tracking-[-0.8px] text-ink sm:text-xl"
          aria-label="Go to home"
        >
          <span>
            Kindred<span className="text-[#8995ce]">Good</span>
          </span>
        </Link>
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

        <div className="col-start-3 row-start-1 justify-self-end lg:col-auto lg:row-auto">
        {
          isPending ? <div className="flex items-center gap-2 mx-2 justify-end">
            <Avatar >
              <AvatarImage referrerPolicy="no-referrer"
              />
              <AvatarFallback></AvatarFallback>
            </Avatar>
            <strong className="hidden lg:flex rounded-lg w-14 h-4 bg-gray-200"></strong></div> :
            user ? <div>

              <Popover open={profilePopoverOpen} onOpenChange={setProfilePopoverOpen}>
                <PopoverTrigger render={<Button className="w-fit bg-transparent shadow-none text-gray-800 hover:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:outline-none">
                  <Avatar>
                    <AvatarImage referrerPolicy="no-referrer"
                      src={user?.image as string}
                      alt={user?.name}

                    />
                    <AvatarFallback>{user?.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <strong className="hidden lg:inline">{user.name}</strong>
                </Button>} />
                <PopoverContent align="start" className={"bg-gray-50/90"}>
                  <PopoverHeader className="*:my-2 ">
                    <PopoverTitle> <Link href={"/dashboard/create"} onClick={closeProfilePopover}>Create Event</Link></PopoverTitle>
                    <PopoverTitle> <Link href={"/manage-events"} onClick={closeProfilePopover}>Manage Events</Link></PopoverTitle>
                    <PopoverTitle><Link href={"/joined-event"} onClick={closeProfilePopover}>Joined Events</Link></PopoverTitle>
                    <Button onClick={handleSignOut}>Sign Out</Button>
                  </PopoverHeader>
                </PopoverContent>
              </Popover>

            </div>

              : <div>
                <Link href="/login" className="lg:mx-2">
                  <Button
                    className=" text-[10px] h-6 md:h-8 inline-flex items-center justify-center gap-[10px] rounded-xl bg-ink md:px-[18px] md:py-[11px] md:text-sm font-bold text-white shadow-[0_8px_18px_rgba(66,72,116,0.18)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#343a64] hover:shadow-[0_11px_25px_rgba(66,72,116,0.24)] ">
                    Sign In <ArrowRight size={16} aria-hidden="true" className="hidden md:flex"/>
                  </Button>
                </Link>
                <Link href="/register">
                  <Button
                    className="inline-flex items-center justify-center gap-[10px] rounded-xl bg-transparent  px-[18px] py-[11px] text-sm font-bold text-ink transition-all duration-200  hover:bg-ink hover:text-white hover:shadow-[0_11px_25px_rgba(66,72,116,0.24)] hidden lg:inline-flex">
                    Sign Up <ArrowRight size={16} aria-hidden="true" />
                  </Button>
                </Link>
              </div>
        }
        </div>
        <Link
          href="/"
          className="col-start-2 row-start-1 inline-flex items-center gap-[10px] border-0 bg-transparent p-0 font-heading text-lg font-extrabold tracking-[-0.8px] text-ink sm:text-xl lg:hidden"
          aria-label="Go to home"
        >
          <span>
            Kindred<span className="text-[#8995ce]">Good</span>
          </span>
        </Link>
        <button
          className="col-start-1 row-start-1 justify-self-start border-0 bg-transparent text-ink lg:hidden"
          onClick={() => setMenu(!menu)}
          aria-label="Toggle menu"
          aria-expanded={menu}
        >
          {menu ? <X size={20} aria-hidden="true" /> : <Menu size={20} aria-hidden="true" />}
        </button>
      </div>

    </header >

  );
}
