import ManageEvent from "@/components/manage-event";
import { EventItem } from "@/components/types";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

/* This page show the all upcoming events */
export default async function ManagePage() {
    const res = await fetch("http://localhost:8000/all-events", {
    });
    const resEvents = await res.json();
    const session = await auth.api.getSession({
        headers: await headers(),
    });

    const userEmail = session?.user?.email;
    const allEvents = resEvents.filter((el: EventItem) => el.createdBy.email === userEmail);
    
    /* kaj baki akhono ekhane manage er back  id thik korchi */
    return (
        <>

            <main id="events-page" className="container mx-auto min-h-[700px] max-w-7xl px-4 pb-20 pt-12 sm:px-6 lg:px-8 lg:pb-[110px] lg:pt-[70px] ">
                <div className="mb-[45px] text-center">
                    <span className="inline-flex items-center gap-[7px] text-xs font-extrabold tracking-[1.5px] text-[#6872ac]">
                        SHOW UP FOR YOUR COMMUNITY
                    </span>
                    <h1 className="my-[9px] text-[38px] tracking-[-2px] text-ink lg:text-[46px]">
                        Manage your created events
                    </h1>
                    <p className="text-muted-foreground">
                        Find a cause that speaks to you, then take the first step.
                    </p>
                </div>
                <ManageEvent allEvents={allEvents}></ManageEvent>
            </main>
        </>
    );
}
