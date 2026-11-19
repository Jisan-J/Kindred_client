
"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { authClient } from "@/lib/auth-client";
import { redirect } from "next/navigation";

export default function CreateEvent() {
    const { data: session } = authClient.useSession();
    const userId = session?.user.id;


    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const myFormData = new FormData(e.currentTarget);
        const eventFormObj = Object.fromEntries(myFormData.entries());
        eventFormObj.createdBy = userId as string

        const res = await fetch("http://localhost:8000/all-events", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(eventFormObj),
        })
        const data = await res.json();
        redirect("/manage-events");
    };

    return (
        <div className="min-h-screen bg-[#f0f5f1] px-4 py-12">
            <div className="mx-auto max-w-2xl rounded-xl border-2 border-gray-300 bg-white p-6 shadow-sm sm:p-8">

                <div className="mb-8">
                    <h1 className="text-2xl font-bold text-[#626baf]">
                        Create an Event
                    </h1>
                    <p className="mt-2 text-sm text-gray-500">
                        Create a community event and bring people together.
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">

                    <div className="space-y-2">
                        <label className="text-sm font-medium">Event Title</label>
                        <Input
                            name="title"
                            placeholder="Winter Clothes Distribution"
                            required
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium">Event Type</label>
                        <Input
                            name="type"
                            placeholder="Donation / Environment / Education"
                            required
                        />
                    </div>

                    <div className="grid gap-5 sm:grid-cols-2">

                        <div className="space-y-2">
                            <label className="text-sm font-medium">Location</label>
                            <Input
                                name="location"
                                placeholder="Mirpur 10, Dhaka"
                                required
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium">Event Date</label>
                            <Input name="date" type="date" required />
                        </div>

                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium">Event Image URL</label>
                        <Input
                            name="image"
                            type="url"
                            placeholder="https://example.com/image.jpg"
                            required
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium">Event Description</label>
                        <Textarea
                            name="description"
                            placeholder="Describe your event and its purpose..."
                            rows={5}
                            required
                        />
                    </div>

                    <Button
                        type="submit"
                        className="w-full bg-[#343a64] hover:bg-[#21243f]"
                    >
                        Create Event
                    </Button>

                </form>
            </div>
        </div>
    );
}
