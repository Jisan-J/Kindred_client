'use client';
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { ArrowRight, CalendarDays, MapPin } from "lucide-react";
import { EventItem } from "./types";
import EditEventDetail from "./editEventDetails";
import Image from "next/image";
import { useSession } from "@/lib/auth-client";

/* this is event details page */
export default function EventDetails({ event, }: { event: EventItem }) {
  const { data: session } = useSession();
  const userEmail = session?.user?.email;

  const handleJoin = async () => {
    const joinedData = {
      email: userEmail,
      eventId: event._id,
    };

    const res = await fetch("http://localhost:8000/joined_people", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(joinedData),
    });

    const data = await res.json();

    if (data.message === "Already joined this event") {
    alert("You already joined this event!");
  } else {
    alert("Successfully joined the event!");
  }
  };

  return (
    <main className="container mx-auto min-h-[700px] max-w-7xl px-4 pb-20 pt-12 sm:px-6 lg:px-8 lg:pb-[110px] lg:pt-[70px]">
      <Link
        href="/events"
        className="mb-[18px] border-0 bg-transparent text-[#717793]"
      >
        ← Back to events
      </Link>
      <div className="relative h-[300px] overflow-hidden rounded-[25px] sm:h-[380px] lg:h-[440px]">
        <img className="size-full object-cover" src={event.image} alt="" />
        <div className="absolute inset-0 bg-[linear-gradient(0deg,rgba(39,43,75,0.35),transparent_60%)]" />
      </div>
      <div className="relative mx-3 mt-[-25px] grid max-w-5xl grid-cols-1 items-start gap-6 sm:mx-auto sm:mt-[-40px] lg:mt-[-55px] lg:grid-cols-[1fr_330px] lg:gap-[45px]">
        <article className="rounded-[20px] bg-white p-[28px_22px] shadow-[0_10px_40px_rgba(55,60,98,0.1)] sm:p-[38px_42px]">
          <div className="mb-[10px] flex items-center justify-between gap-3 ">

            <span className="inline-flex rounded-[20px] bg-[rgba(244,238,255,0.94)] px-[11px] py-[7px] text-[10px] font-extrabold tracking-[0.6px] text-ink uppercase">
              {event?.type}
            </span>
            <EditEventDetail event={event}></EditEventDetail>
          </div>
          <h1 className="my-[14px] text-[29px] tracking-[-1.5px] text-ink sm:text-4xl">
            {event?.title}
          </h1>
          <div className="mb-[30px] flex flex-col gap-3 border-b border-[#eceaf3] pb-[26px] text-[13px] text-[#747991] sm:flex-row sm:gap-[22px]">
            <span className="flex items-center gap-2">
              <CalendarDays size={20} aria-hidden="true" />
              {event?.date}
            </span>
            <span className="flex items-center gap-2">
              <MapPin size={20} aria-hidden="true" />
              {event?.location}
            </span>
          </div>
          <h3 className="mt-7 text-ink">About this event</h3>
          <p className="text-sm leading-[1.75] text-[#70758c]">
            {event?.description} Together, we&apos;ll make a visible, lasting difference while building
            connections with people across our community.
          </p>

        </article>
        <aside>
          <div className="rounded-[18px] border border-soft bg-mist p-[25px] lg:mt-[90px]">
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center [&>*+*]:-ml-2">
                <span >
                  {
                    event.createdBy.image ?
                      <Image className="grid size-[34px] place-items-center rounded-full border-[3px] border-white bg-ink text-[9px] text-white"
                        src={event?.createdBy?.image}
                        height={100}
                        width={100}
                        alt={event?.createdBy?.name}
                      ></Image> : event?.createdBy?.name.charAt(1)
                  }

                </span>
                <span className="grid size-[34px] place-items-center rounded-full border-[3px] border-white bg-ink text-[9px] text-white" />
                <span className="grid size-[34px] place-items-center rounded-full border-[3px] border-white bg-ink text-[9px] text-white" />
              </div>
              <strong className="text-[13px] text-ink">{event?.people} people are going</strong>
            </div>

            <Button onClick={handleJoin}
              className={cn(
                "inline-flex items-center justify-center gap-[10px] rounded-xl bg-ink px-[22px] py-[15px] text-sm font-bold text-white shadow-[0_8px_18px_rgba(66,72,116,0.18)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#343a64] hover:shadow-[0_11px_25px_rgba(66,72,116,0.24)]",
                "my-[22px] mb-[10px] w-full",
              )}
            >
              Join this event <ArrowRight size={18} aria-hidden="true" />
            </Button>


            <small className="block text-center text-[10px] text-[#80859c]">
              Free to join · Takes less than a minute
            </small>
            <hr className="my-5 border-0 border-t border-[#d9d4ef]" />
            <div className="flex items-center gap-[10px]">
              <span className="grid size-[38px] place-items-center rounded-[10px] bg-ink text-[10px] text-white">
                {
                  event.createdBy.image ?
                    <Image
                      src={event?.createdBy?.image}
                      height={100}
                      width={100}
                      alt={event?.createdBy?.name}
                    ></Image> : event?.createdBy?.name.charAt(1)
                }
              </span>
              <div>
                <small className="block text-[8px] tracking-[1px] text-[#8b90aa]">HOSTED BY</small>
                <strong className="mt-[3px] block text-[11px] text-ink">
                  {event?.createdBy?.name}
                </strong>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </main>
  );
}
