'use client';
import { cn } from "@/lib/utils";
import Link from "next/link";
import { Button } from "./ui/button";
import { useSession } from "@/lib/auth-client";
import JoinEventCard from "./join-event-card";
import { JoinEventPeoples } from "./joinTypes";



/* This page is all event card design  */
export default function JoinEvent({  alljoinedEvent }: {  alljoinedEvent: JoinEventPeoples[] }) {


    const { data: session } = useSession();
    const userEmail = session?.user?.email;
    const joinedEvents = alljoinedEvent.filter((item) => item.joinerEmail === userEmail);
    return (

        <>{joinedEvents.length > 0 ?
            <>
                <p className="mb-6 text-center text-sm text-muted-foreground">
                    You&apos;ve joined {joinedEvents.length} {joinedEvents.length === 1 ? "event" : "events"}.
                </p>
                <div className={cn("grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3", "gap-y-[30px]")}>
                    {joinedEvents.map(( event:JoinEventPeoples ) => (
                        <JoinEventCard key={event._id} event={event}  />
                    ))}
                </div>
            </> :
            <div className="text-center">
                <Link href={'/events'} ><Button className={"bg-violet-950 text-gray-50 px-4 py-0.5 rounded-lg"}>Join Event</Button></Link>
                <h2 className="my-2">You not joined any event</h2>
            </div>
        }
        </>
    );
}
