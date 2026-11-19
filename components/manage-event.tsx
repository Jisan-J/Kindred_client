'use client';
import { cn } from "@/lib/utils";
import Link from "next/link";
import type { EventItem } from "./types";
import { Button } from "./ui/button";
import { useSession } from "@/lib/auth-client";
import ManageEventCard from "./manage-event-card";



/* This page is all event card design  */
export default function ManageEvent({ allEvents }: { allEvents: EventItem[] }) {
        const { data: session } = useSession();
    const userId = session?.user.id;
      const event = allEvents.filter((item:EventItem) => item.createdBy === userId);
    return (

        <>{event.length > 0 ?
            <div className={cn("grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3", "gap-y-[30px]")}>
                {event?.map((event: EventItem, idx: number) => <ManageEventCard key={idx} event={event} />)}
            </div> :
            <div className="text-center">
                <Link href={'/dashboard/create'} ><Button className={"bg-violet-950 text-gray-50 px-4 py-0.5 rounded-lg"}>Create Event</Button></Link>
                <h2 className="my-2">You have no event</h2>
            </div>
        }
        </>
    );
}
