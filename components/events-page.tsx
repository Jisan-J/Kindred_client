

import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { Search } from "lucide-react";
import { EventItem } from "./types";
import EventCard from "./event-card";

/* This page show the all upcoming events */
export default async function EventsPage() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/all-events`, {
  });
  const events = await res.json();

  
  return (
    <>
    <main id="events-page" className="container mx-auto min-h-[700px] max-w-7xl px-4 pb-20 pt-12 sm:px-6 lg:px-8 lg:pb-[110px] lg:pt-[70px] ">
      <div className="mb-[45px] text-center">
        <span className="inline-flex items-center gap-[7px] text-xs font-extrabold tracking-[1.5px] text-[#6872ac]">
          SHOW UP FOR YOUR COMMUNITY
        </span>
        <h1 className="my-[9px] text-[38px] tracking-[-2px] text-ink lg:text-[46px]">
          Upcoming events
        </h1>
        <p className="text-muted-foreground">
          Find a cause that speaks to you, then take the first step.
        </p>
      </div>
      <div className="mb-[30px] flex flex-col items-stretch justify-between gap-5 md:flex-row md:items-center md:gap-[25px]">
        <div className="flex w-full items-center gap-[10px] rounded-[11px] border border-[#e2dfed] px-[15px] py-[11px] text-[#9197b3] md:w-72">
          <Search size={18} aria-hidden="true" />
          <Input
            className="w-full border-0 bg-transparent text-[13px] shadow-none outline-none focus-visible:ring-0"
            placeholder="Search events or locations"
          />
        </div>
      
      </div>
      <div className={cn("grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3", "gap-y-[30px]")}>
        {events.map((event:EventItem, idx:number) => <EventCard key={idx} event={event} />)}
      </div>
    </main>
    </>
  );
}
