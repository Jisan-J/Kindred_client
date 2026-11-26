import { notFound } from "next/navigation";

import JoinCardtDetails from "@/components/join-event-card-details";



export default async function JoinEventDetails({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;


  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/joined_people/${encodeURIComponent(id)}`, {
    cache: "no-store",
  });
  
  
  
  if (res.status === 400 || res.status === 404) {
    notFound();
  }
  
  const event = await res.json();

  return <JoinCardtDetails event={event} />;
}
