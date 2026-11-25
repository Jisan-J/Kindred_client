import { notFound } from "next/navigation";

import type { EventItem } from "@/components/types";
import EventDetails from "@/components/event-details";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";


export default async function SingleEventDetails({
  params,
}: {
  params: Promise<{ id: string }>;
}) {

  const jwtToken = await auth.api.getToken({
    headers: await headers()
  })
  const token = jwtToken?.token
  console.log(token);
  const { id } = await params;
  const res = await fetch(`http://localhost:8000/all-events/${encodeURIComponent(id)}`, {
    cache: "no-store",
    headers: {
      authorization: `Bearer ${token}`
    },
  });

  if (res.status === 400 || res.status === 404) {
    notFound();
  }

  const event: EventItem = await res.json();

  return <EventDetails event={event} />;
}
