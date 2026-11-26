
import { notFound } from "next/navigation";
import { JoinEventPeoples } from "@/components/joinTypes";
import ManageEventDetails from "@/components/manage-event-details";
import { EventItem } from "@/components/types";



export default async function ManageEventId({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await params;


    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/all-events`, {
        cache: "no-store",

    });
    const data = await res.json();
    const event = data.find((el: EventItem) => el._id === id);

    if (!event) {
        notFound();
    }

    const allRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/joined_people`, {
        cache: "no-store",
      

    });
    const allData = await allRes.json();
    const joinedPeople = allData.filter((el: JoinEventPeoples) => el.eventId === event._id);


    /* ekhane all event jasse kintu ekhane tar vitore to image nei tai sekhan theke image dekhano jacce na tai eta abar joined er arr ber kore pathate hobe */

    return <ManageEventDetails event={event} joinedPeople={joinedPeople} />;
}
