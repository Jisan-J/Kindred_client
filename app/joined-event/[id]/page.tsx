import { notFound } from "next/navigation";

import JoinCardtDetails from "@/components/join-event-card-details";
import { JoinEventPeoples } from "@/components/joinTypes";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";


export default async function JoinEventDetails({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const jwtToken = await auth.api.getToken({
    headers: await headers()
  })
  const token = jwtToken?.token
  console.log(token);
  

  const res = await fetch(`http://localhost:8000/joined_people/${encodeURIComponent(id)}`, {
    cache: "no-store",
    headers: {
      authorization: `Bearer ${token}`
    }
  });

  if (res.status === 400 || res.status === 404) {
    notFound();
  }

  const event: JoinEventPeoples = await res.json();

  return <JoinCardtDetails event={event} />;
}
