'use client';
import Link from "next/link";
import { CalendarDays, MapPin } from "lucide-react";
import Image from "next/image";
import { authClient, useSession } from "@/lib/auth-client";
import { JoinEventPeoples } from "./joinTypes";
import { useEffect, useState } from "react";
import { DeleteJoinBtnInner } from "./delete-join-inner";

/* this is event details page */
export default function JoinCardtDetails({ event }: { event: JoinEventPeoples }) {
  const { data: session } = useSession();
  const userEmail = session?.user?.email;


  /* how much people joined */
  /*   const [joined, setJoined] = useState<JoinEventPeoples[]>([]); */

  const [joined, setJoined] = useState<JoinEventPeoples[]>([]);

  useEffect(() => {
    const fetchJoinedPeople = async () => {
        const {data, error} = await authClient.token();
        const token = data?.token;
        
      const res = await fetch("http://localhost:8000/joined_people",{
          headers: { "Content-Type": "application/json",
                authorization:`Bearer ${token}`
             },
      });

      const result = await res.json();

      const joinedInfo = result.filter(
        (el: JoinEventPeoples) => el.eventId === event.eventId
      );

      setJoined(joinedInfo);
    };

    fetchJoinedPeople();
  }, [event.eventId]);






  return (
    <main className="container mx-auto min-h-[700px] max-w-7xl px-4 pb-20 pt-12 sm:px-6 lg:px-8 lg:pb-[110px] lg:pt-[70px]">

      <div className="relative h-[300px] overflow-hidden rounded-[25px] sm:h-[380px] lg:h-[440px]">
        <img className="size-full object-cover" src={event.image} alt="" />
        <div className="absolute inset-0 bg-[linear-gradient(0deg,rgba(39,43,75,0.35),transparent_60%)]" />
      </div>
      <div className="relative mx-3 mt-[-25px] grid max-w-5xl grid-cols-1 items-start gap-6 sm:mx-auto sm:mt-[-40px] lg:mt-[-55px] lg:grid-cols-[1fr_330px] lg:gap-[45px]">
        <article
          id="event-details"
          className="scroll-mt-24 rounded-[20px] bg-white p-[28px_22px] shadow-[0_10px_40px_rgba(55,60,98,0.1)] sm:p-[38px_42px]"
        >
          <div className="mb-[10px] flex items-center justify-between gap-3 ">

            <span className="inline-flex rounded-[20px] bg-[rgba(244,238,255,0.94)] px-[11px] py-[7px] text-[10px] font-extrabold tracking-[0.6px] text-ink uppercase">
              {event?.type}
            </span>
            <Link
              href={`/joined-event#joined-event-${event._id}`}
              className="mb-[18px] border-0 bg-transparent text-ink "
            >
              ← Back
            </Link>
            {/*             <EditEventDetail event={event}></EditEventDetail>
 */}          </div>
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
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-1 [&>*+*]:-ml-5">
                  {joined.slice(-3).map((person, ind) => {
                    const image = person.joinerImage;

                    return image ? (
                      <Image
                        key={person._id ?? ind}
                        className="size-10 rounded-full border-[3px] border-white bg-ink object-cover object-center"
                        src={image}
                        height={50}
                        width={50}
                        alt="Participant"
                      />
                    ) : null;
                  })}
                  {
                    joined?.length > 3 && <span className="size-10 rounded-full border-[3px] border-transparent text-ink bg-transparent flex items-center justify-end"
                    >+{joined?.length - 3}</span>}
                </div>
              </div>
              <strong className="text-[13px] text-ink">{joined?.length} people are going</strong>
            </div>

            <div className=" w-full text-right">

              <DeleteJoinBtnInner joinPerson={event} />

            </div>

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
