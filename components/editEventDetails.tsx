'use client';
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Field, FieldGroup } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "./ui/textarea"
import { Pencil } from "lucide-react"
import { EventItem } from "./types";
import { redirect } from "next/navigation";
import { toast } from "./ui/toast";
import { authClient } from "@/lib/auth-client";

export default function EditEventDetail({ event }: { event: EventItem }) {

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const myFormData = new FormData(e.currentTarget);
        const eventFormObj = Object.fromEntries(myFormData.entries());
        eventFormObj.id = event._id;
        const { data, error } = await authClient.token();
        const token = data?.token;

        const res = await fetch("http://localhost:8000/all-events", {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                authorization: `Bearer ${token}`

            },
            body: JSON.stringify(eventFormObj),

        })
        if (res.ok) {
            toast.add({
                type: "success",
                title: "Updated the event!",
            })
        }
        redirect(`/manage-events`);
    };
    return (
        <Dialog>
            <DialogTrigger render={<Button type="button" variant="outline" className=" rounded-[20px] bg-[rgba(244,238,255,0.94)]"><Pencil size={'12px'}></Pencil> Edit</Button>} />
            <DialogContent className=" sm:max-w-xl  rounded-[20px] bg-[rgba(244,238,255,0.94)] ">
                <form onSubmit={handleSubmit}>
                    <DialogHeader>
                        <DialogTitle>Edit Event</DialogTitle>
                        <DialogDescription>
                            Make changes to your Event here. Click save when you&apos;re
                            done.
                        </DialogDescription>
                    </DialogHeader>
                    <FieldGroup >
                        <Field>
                            <Label htmlFor="title-1">Event Name</Label>
                            <Input id="title-1" name="title" defaultValue={event.title} />
                        </Field>
                        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                            <Field>
                                <Label htmlFor="date-1">Date</Label>
                                <Input id="date-1" name="date" type="date" defaultValue={event.date} />
                            </Field>
                            <Field>
                                <Label htmlFor="location-1">Location</Label>
                                <Input id="location-1" name="location" defaultValue={event.location} />
                            </Field>
                        </div>
                        <Field>
                            <Label htmlFor="image-1">Image</Label>
                            <Input id="image-1" name="image" type="url" defaultValue={event.image} />
                        </Field>
                        <Field>
                            <Label htmlFor="description-1">Event Description</Label>
                            <Textarea
                                defaultValue={event.description}
                                id="description-1"
                                name="description"
                                rows={5}
                                required
                            />
                        </Field>
                    </FieldGroup>
                    <DialogFooter>
                        <DialogClose render={<Button type="button" variant="outline">Cancel</Button>} />
                        <DialogClose render={<Button type="submit">Save changes</Button>} />

                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}
