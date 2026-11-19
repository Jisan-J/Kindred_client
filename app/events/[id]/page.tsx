import { notFound } from "next/navigation";

import { EventItem } from "@/components/types";
import EventDetails from "@/components/event-details";


export default async function SingleEventDetails({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const res = await fetch("http://localhost:8000/all-events", {
  });
  const events = await res.json();
  const event = events.find((item:EventItem) => item._id === id);

  if (!event) {
    notFound();
  }

  return <EventDetails event={event} />;
}
