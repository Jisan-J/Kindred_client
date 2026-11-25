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
import { JoinEventPeoples } from "./joinTypes";
import { useRouter } from "next/navigation";
import { toast } from "./ui/toast";
import { authClient } from "@/lib/auth-client";

export function DeleteJoinBtn({ joinPerson }: { joinPerson: JoinEventPeoples }) {

    const router = useRouter()
    const handleRemove = async () => {
          const {data, error} = await authClient.token();
        const token = data?.token;
        
        try {
            const res = await fetch("http://localhost:8000/joined_people", {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    authorization:`Bearer ${token}`
                },
                body: JSON.stringify({ id: joinPerson._id }),
            });

            if (!res.ok) {
                throw new Error(`Delete request failed with status ${res.status}`);
            }

            toast.add({
                type: "success",
                title: "Removed the event!",
            })
            router.refresh()
        } catch (error) {
            console.error("Failed to remove joined event", error);
            toast.add({
                type: "error",
                title: "Could not remove the event. Please try again.",
            });
        }
        
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
                    <AlertDialogTitle>Remove event?</AlertDialogTitle>
                    <AlertDialogDescription>
                        This will remove the event from your joined events.
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
