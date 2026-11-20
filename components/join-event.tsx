'use client';
import { cn } from "@/lib/utils";
import Link from "next/link";
import type { EventItem } from "./types";
import { Button } from "./ui/button";
import { useSession } from "@/lib/auth-client";
import JoinEventCard from "./join-event-card";
import { JoinEventPeoples } from "./joinTypes";



/* This page is all event card design  */
export default function JoinEvent({ allEvents, joinPeoples }: { allEvents: EventItem[], joinPeoples: JoinEventPeoples[] }) {


    const { data: session } = useSession();
    const userEmail = session?.user?.email;
    const event = allEvents.filter((item: EventItem) => {
        return joinPeoples.some((joinEl: JoinEventPeoples) => item._id === joinEl.eventId && userEmail === joinEl.email)

    });
    return (

        <>{event.length > 0 ?
            <div className={cn("grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3", "gap-y-[30px]")}>
                {event?.map((event: EventItem, idx: number) => <JoinEventCard key={idx} event={event} joinPeoples={joinPeoples}/>)}
            </div> :
            <div className="text-center">
                <Link href={'/events'} ><Button className={"bg-violet-950 text-gray-50 px-4 py-0.5 rounded-lg"}>Join Event</Button></Link>
                <h2 className="my-2">You not joined any event</h2>
            </div>
        }
        </>
    );
}
