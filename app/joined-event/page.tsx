import JoinEvent from "@/components/join-event";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

/* This page show the all upcoming events */
export default async function JoinPage() {
      const jwtToken = await auth.api.getToken({
    headers: await headers()
  })
  const token = jwtToken?.token
  console.log(token);
    const joinRes = await fetch("http://localhost:8000/joined_people",{
          headers: { "Content-Type": "application/json",
                authorization:`Bearer ${token}`
             },
    });
    const joinPeoples = await joinRes.json();

    return (
        <>

            <main id="events-page" className="container mx-auto min-h-[700px] max-w-7xl px-4 pb-20 pt-12 sm:px-6 lg:px-8 lg:pb-[110px] lg:pt-[70px] ">
                <div className="mb-[45px] text-center">
                    <span className="inline-flex items-center gap-[7px] text-xs font-extrabold tracking-[1.5px] text-[#6872ac]">
                        SHOW UP FOR YOUR COMMUNITY
                    </span>
                    <h1 className="my-[9px] text-[38px] tracking-[-2px] text-ink lg:text-[46px]">
                        Your Joined events
                    </h1>
                    <p className="text-muted-foreground">
                        Find a cause that speaks to you, then take the first step.
                    </p>
                </div>
                <JoinEvent alljoinedEvent={joinPeoples}></JoinEvent>
            </main>
        </>
    );
}
