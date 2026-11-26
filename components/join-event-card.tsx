import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { ArrowRight, MapPin, Users } from "lucide-react";
import Image from "next/image";
import { DeleteJoinBtn } from "./delete-join";
import { JoinEventPeoples } from "./joinTypes";


/* This page is all event card design  */
export default function JoinEventCard({ event }: { event: JoinEventPeoples}) {
  return (
    <Card
      asChild
      className={cn(
        "overflow-hidden rounded-[18px] border border-[#e9e7f2] bg-white shadow-[0_12px_36px_rgba(65,71,112,0.07)] transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_20px_45px_rgba(65,71,112,0.14)]",
        "group gap-0 p-0",
      )}
    >
      <article id={`joined-event-${event._id}`} className="scroll-smooth">
        <div className="relative h-[215px] overflow-hidden">
          <Image
            className="size-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
            src={event.image}
            height={220}
            width={220}
            alt="Photo"
          />
          <span
            className={cn(
              "inline-flex rounded-[20px] bg-[rgba(244,238,255,0.94)] px-[11px] py-[7px] text-[10px] font-extrabold tracking-[0.6px] text-ink uppercase",
              "absolute left-[14px] top-[14px]",
            )}
          >
            {event?.type}
          </span>
          <div className="absolute bottom-[14px] right-[14px] flex h-14 w-[50px] flex-col items-center justify-center rounded-[11px] bg-white shadow-[0_7px_18px_rgba(30,34,65,0.2)]">
            <strong className="font-heading text-xl leading-none font-extrabold text-ink">
              {event?.day}
            </strong>
            <span className="mt-[3px] text-[9px] font-bold text-[#858ba9]">{event?.month}</span>
          </div>
        </div>
        <div className="p-[22px]">
          <h3 className="mb-[9px] text-lg tracking-[-0.3px] text-ink">{event?.title}</h3>
          <p className="min-h-10 text-[13px] leading-[1.55] text-[#777c93]">{event?.description.slice(0, 100)}...</p>
          <div className="my-[17px] flex flex-wrap gap-x-[15px] gap-y-2 border-t border-[#efedf5] pt-[15px]">
            <span className="flex items-center gap-[5px] text-[11px] text-[#7a7f97]">
              <MapPin className="text-[#8e98ce]" size={17} aria-hidden="true" />
              {event?.location}
            </span>
            
          </div>
          <div className="flex justify-between"><Link
            href={`/joined-event/${event._id}#event-details`}
            className="inline-flex items-center gap-2 border-0 border-b border-[#b9bdd8] bg-transparent px-0 py-1.5 font-bold text-ink"
          >
            View event <ArrowRight size={17} aria-hidden="true" />
          </Link>
            <DeleteJoinBtn joinPerson={event} />
          </div>
        </div>
      </article>
    </Card>
  );
}
