
import { JoinEventPeoples } from "@/components/joinTypes";
import ManageEventDetails from "@/components/manage-event-details";
import { EventItem } from "@/components/types";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";


export default async function ManageEventId({
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

    const res = await fetch(`http://localhost:8000/all-events`, {
        headers: {
            authorization: `Bearer ${token}`
        }
    });
    const data = await res.json();
    const event = data.find((el: EventItem) => el._id === id);


    const allRes = await fetch("http://localhost:8000/joined_people", {
        headers: {
            authorization: `Bearer ${token}`
        }
    });
    const allData = await allRes.json();
    const joinedPeople = allData.filter((el: JoinEventPeoples) => el.eventId === event._id);


    /* ekhane all event jasse kintu ekhane tar vitore to image nei tai sekhan theke image dekhano jacce na tai eta abar joined er arr ber kore pathate hobe */

    return <ManageEventDetails event={event} joinedPeople={joinedPeople} />;
}
