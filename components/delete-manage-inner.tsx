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
import { useRouter } from "next/navigation";
import { toast } from "./ui/toast";
import { authClient } from "@/lib/auth-client";

export function DeleteMngInnerBtn({ event }: { event?: EventItem }) {
    const router = useRouter()

    const handleDelete = async () => {
          const {data, error} = await authClient.token();
        const token = data?.token;
        
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/all-events`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                authorization:`Bearer ${token}`
            },
            body: JSON.stringify({ id: event?._id }),
        })

        if (res.ok) {
            router.refresh();
            toast.add({
                type: "success",
                title: "Deleted the event!",
            })

        }
        window.location.replace("/manage-events")


    };

    return (
        <AlertDialog>
            <AlertDialogTrigger
                render={<Button variant="destructive" className="bg-red-600/10 text-red-500 hover:bg-red-600/20 hover:text-red-800">Delete event</Button>}
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
                    <AlertDialogAction variant="destructive" onClick={handleDelete}>Delete</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}
