'use client';
import { Trash2Icon } from "lucide-react"

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogMedia,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import { EventItem } from "./types"
import { JoinEventPeoples } from "./joinTypes";
import { redirect } from "next/navigation";

export function DeleteJoinBtn({ event, joinPeoples }: { event?: EventItem, joinPeoples:JoinEventPeoples[]}) {

    const fel= joinPeoples.find((el)=>event?._id===el.eventId)
    const handleRemove = async () => {
        const mainRes = await fetch("http://localhost:8000/joined_people", {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ id: fel?._id}),
        })

        const mainResData = await mainRes.json();
        console.log(mainResData);
        redirect("/joined-event")
    };

    return (
        <AlertDialog>
            <AlertDialogTrigger
                render={<Button variant="destructive" className="bg-red-600/10 text-red-500 hover:bg-red-600/20 hover:text-red-800">Remove event</Button>}
            />
            <AlertDialogContent size="sm">
                <AlertDialogHeader>
                    <AlertDialogMedia className="bg-destructive/10 text-destructive dark:bg-destructive/20 dark:text-destructive">
                        <Trash2Icon />
                    </AlertDialogMedia>
                    <AlertDialogTitle>Delete chat?</AlertDialogTitle>
                    <AlertDialogDescription>
                        This will permanently delete this chat conversation. View{" "}
                        <a href="#">Settings</a> delete any memories saved during this chat.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel variant="outline">Cancel</AlertDialogCancel>
                    <AlertDialogAction variant="destructive" onClick={handleRemove}>Remove</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}
