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
    const joinedEvents = allEvents.flatMap((item) => {
        const joinPerson = joinPeoples.find(
            (joinEl) => item._id === joinEl.eventId && userEmail === joinEl.email,
        );

        return joinPerson ? [{ event: item, joinPerson }] : [];
    });
    return (

        <>{joinedEvents.length > 0 ?
            <div className={cn("grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3", "gap-y-[30px]")}>
                {joinedEvents.map(({ event, joinPerson }) => (
                    <JoinEventCard key={event._id} event={event} joinPerson={joinPerson} />
                ))}
            </div> :
            <div className="text-center">
                <Link href={'/events'} ><Button className={"bg-violet-950 text-gray-50 px-4 py-0.5 rounded-lg"}>Join Event</Button></Link>
                <h2 className="my-2">You not joined any event</h2>
            </div>
        }
        </>
    );
}
