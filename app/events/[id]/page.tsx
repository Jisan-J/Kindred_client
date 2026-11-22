import { notFound } from "next/navigation";

import type { EventItem } from "@/components/types";
import EventDetails from "@/components/event-details";


export default async function SingleEventDetails({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const res = await fetch(`http://localhost:8000/all-events/${encodeURIComponent(id)}`, {
    cache: "no-store",
  });

  if (res.status === 400 || res.status === 404) {
    notFound();
  }

  const event: EventItem = await res.json();

  return <EventDetails event={event} />;
}
