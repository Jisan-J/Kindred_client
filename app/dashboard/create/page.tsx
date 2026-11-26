
"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/toast";
import { authClient } from "@/lib/auth-client";

export default function CreateEvent() {
    const { data: session } = authClient.useSession();
    const userName = session?.user.name;
    const userEmail = session?.user.email;
    const userImage = session?.user.image;


    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const myFormData = new FormData(e.currentTarget);
        /* here is spread the all object data then create createdBy for finding which created this event */
        const eventFormObj = {
            ...Object.fromEntries(myFormData.entries()),
            createdBy: {
                name: userName,
                email: userEmail,
                image: userImage,
            },
        };

        const {data, error} = await authClient.token();
        const token = data?.token;
        
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/all-events`, {
            method: "POST",
            headers: { "Content-Type": "application/json",
                authorization:`Bearer ${token}`
             },
            body: JSON.stringify(eventFormObj),
        })
        if (res.ok) {
            toast.add({
                type: "success",
                title: "Created an event!",
            })
        }
        window.location.replace("/manage-events");
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

                        <select
                            name="type"
                            required
                            className="w-full rounded-md border bg-background px-3 py-2 text-sm"
                        >
                            <option value="" disabled>
                                Select event type
                            </option>
                            <option value="Donation">Donation</option>
                            <option value="Environment">Environment</option>
                            <option value="Education">Education</option>
                            <option value="Community">Community</option>
                            <option value="Health">Health</option>
                            <option value="Animal Welfare">Animal Welfare</option>
                        </select>
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
                            <Input name="date" type="date"
                                min={new Date().toISOString().split("T")[0]}
                                required />
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
