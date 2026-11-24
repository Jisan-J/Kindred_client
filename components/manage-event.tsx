import { cn } from "@/lib/utils";
import Link from "next/link";
import type { EventItem } from "./types";
import { Button } from "./ui/button";
import ManageEventCard from "./manage-event-card";



/* This page is all event card design  */
export default function ManageEvent({ allEvents }: { allEvents: EventItem[] }) {
   
    return (

        <>{allEvents.length > 0 ?
            <div className={cn("grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3", "gap-y-[30px]")}>
                {allEvents?.map((event: EventItem, idx: number) => <ManageEventCard key={idx} event={event} />)}
            </div> :
            <div className="text-center">
                <Link href={'/dashboard/create'} ><Button className={"bg-violet-950 text-gray-50 px-4 py-0.5 rounded-lg"}>Create Event</Button></Link>
                <h2 className="my-2">You have no event</h2>
            </div>
        }
        </>
    );
}
