import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { Icon } from "./shared";
import Image from "next/image";
import { EventItem } from "./types";
import EventCard from "./event-card";

export async function HomePage() {
    const res = await fetch("http://localhost:8000/all-events", {
  });

  const events = await res.json();
  return (
    <>
      {/* Hero section */}
      <section className="relative flex min-h-[620px] items-center overflow-hidden bg-[linear-gradient(140deg,#faf8ff_0%,#f4eeff_78%,#eeeaff_100%)] before:absolute before:inset-0 before:bg-[radial-gradient(#8f97c2_1px,transparent_1px)] before:bg-[length:24px_24px] before:opacity-25 before:content-[''] before:[mask-image:linear-gradient(90deg,black,transparent_44%)]">
        <div className="container relative z-[2] mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-10 px-4 py-12 pb-16 sm:px-6 sm:py-14 lg:grid-cols-[1fr_1fr] lg:gap-[72px] lg:px-8 lg:py-[70px] lg:pb-20">
          <div>
            <h1 className="my-[22px] max-w-[590px] text-[42px] leading-[1.06] font-extrabold tracking-[-2px] text-ink sm:text-[50px] lg:text-[58px] lg:tracking-[-3px]">
              Good things happen when we{" "}
              <span className="font-[Georgia,serif] font-normal text-[#7784c0]">show up.</span>
            </h1>
            <p className="max-w-[540px] text-base leading-[1.7] text-[#656b88] sm:text-lg">
              Find meaningful ways to serve your community, meet people who care, and turn a few
              hours into something that lasts.
            </p>
            <div className="my-8 flex flex-col items-stretch gap-3 sm:flex-row">
              <Button
                asChild
                className="inline-flex items-center justify-center gap-[10px] rounded-xl bg-ink px-[22px] py-[15px] text-sm font-bold text-white shadow-[0_8px_18px_rgba(66,72,116,0.18)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#343a64] hover:shadow-[0_11px_25px_rgba(66,72,116,0.24)]"
              >
                <Link href="/events">
                  Explore events <Icon name="arrow" size={18} />
                </Link>
              </Button>
              <Button
                asChild
                className={cn(
                  "inline-flex items-center justify-center gap-[10px] rounded-xl bg-ink px-[22px] py-[15px] text-sm font-bold text-white shadow-[0_8px_18px_rgba(66,72,116,0.18)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#343a64] hover:shadow-[0_11px_25px_rgba(66,72,116,0.24)]",
                  "border border-[#d9d7e8] bg-white text-ink shadow-none hover:bg-mist",
                )}
              >
                <Link href="/dashboard/create">
                  <Icon name="plus" size={18} /> Create an event
                </Link>
              </Button>
            </div>

          </div>
          <div className="relative mx-auto w-full max-w-[600px] px-2 py-3 sm:px-[10px] sm:py-[14px] sm:pr-[22px]">
            <div className="h-[370px] rotate-[1.5deg] overflow-hidden rounded-[80px_24px] border-[8px] border-white/80 shadow-[0_30px_70px_rgba(66,72,116,0.22)] sm:h-[480px] sm:rounded-[120px_28px_120px_28px]">
              <Image className="size-full object-cover"
                src="https://images.unsplash.com/photo-1694286068561-3233c946e9be?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D"
                alt="Hero image"
                width={500}
                height={500}
              />
            </div>
            <div
              className={cn(
                "absolute flex items-center gap-3 rounded-2xl border border-white bg-white/95 p-[14px] shadow-[0_14px_40px_rgba(50,56,98,0.18)]",
                "bottom-[25px] left-[-4px] sm:bottom-[58px] sm:left-[-30px]",
              )}
            >
              <span className="grid size-[42px] shrink-0 place-items-center rounded-xl bg-mist text-ink">
                <Icon name="calendar" />
              </span>
              <div>
                <small className="block text-[9px] tracking-[1px] text-[#9298b2]">NEXT EVENT</small>
                <strong className="my-0.5 block font-heading text-[13px] font-bold text-ink">
                  Plantation Drive
                </strong>
                <p className="m-0 text-[10px] text-[#858aa0]">Friday · Dhanmondi</p>
              </div>
            </div>
            <div
              className={cn(
                "absolute flex items-center gap-3 rounded-2xl border border-white bg-white/95 p-[14px] shadow-[0_14px_40px_rgba(50,56,98,0.18)]",
                "right-0 top-[35px] sm:right-[-15px] sm:top-[55px]",
              )}
            >
              <span className="grid size-[42px] shrink-0 place-items-center rounded-xl bg-mist text-ink">
                <Icon name="heart" />
              </span>
              <div>
                <strong
                  className={cn(
                    "my-0.5 block font-heading text-[13px] font-bold text-ink",
                    "text-lg",
                  )}
                >
                  1,284
                </strong>
                <p className="m-0 text-[10px] text-[#858aa0]">lives touched this month</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Event host, lives, hours, community summery section */}
      <section className="container mx-auto grid max-w-7xl grid-cols-2 items-center gap-5 border-b border-[#eceaf6] bg-white px-4 py-6 sm:flex sm:flex-wrap sm:justify-between sm:px-6 lg:flex-nowrap lg:px-8 lg:py-[27px]">
        <p className="m-0 hidden max-w-[100px] text-xs text-[#9296aa] lg:block">
          Together, our community has created
        </p>
        <div className="flex items-center gap-[10px]">
          <strong className="font-heading text-[23px] font-extrabold text-ink">186</strong>
          <span className="text-xs text-[#7c8098]">Events hosted</span>
        </div>
        <i className="hidden h-7 w-px bg-[#e8e6f1] lg:block" />
        <div className="flex items-center gap-[10px]">
          <strong className="font-heading text-[23px] font-extrabold text-ink">4,820</strong>
          <span className="text-xs text-[#7c8098]">Volunteer hours</span>
        </div>
        <i className="hidden h-7 w-px bg-[#e8e6f1] lg:block" />
        <div className="flex items-center gap-[10px]">
          <strong className="font-heading text-[23px] font-extrabold text-ink">32</strong>
          <span className="text-xs text-[#7c8098]">Communities reached</span>
        </div>
        <i className="hidden h-7 w-px bg-[#e8e6f1] lg:block" />
        <div className="flex items-center gap-[10px]">
          <strong className="font-heading text-[23px] font-extrabold text-ink">12k+</strong>
          <span className="text-xs text-[#7c8098]">Lives impacted</span>
        </div>
      </section>

      {/* Upcoming events section */}

      <section className="container mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <div className="mb-9 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <span className="inline-flex items-center gap-[7px] text-xs font-extrabold tracking-[1.5px] text-[#6872ac]">
              UPCOMING NEAR YOU
            </span>
            <h2 className="my-[10px] mb-2 text-[31px] leading-[1.18] tracking-[-1.7px] text-ink lg:text-[38px]">
              Find your next way to help.
            </h2>
            <p className="m-0 text-muted-foreground">
              Every event is an invitation to make your corner of the world a little brighter.
            </p>
          </div>
          <Link
            href="/events"
            className={cn(
              "inline-flex items-center gap-2 border-0 border-b border-[#b9bdd8] bg-transparent px-0 py-1.5 font-bold text-ink",
              "mt-5 sm:mt-0",
            )}
          >
            View all events <Icon name="arrow" size={18} />
          </Link>
        </div>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
          {events.slice(0, 3).map((event:EventItem, idx:number) => <EventCard key={idx} event={event} />)}
        </div>
      </section>

      {/* Three steps to meaningful impact section.*/}
      <section className="relative bg-mist" id="impact">
        <div className={cn("container mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24")}>
          <div className="mx-auto mb-[60px] max-w-[630px] text-center">
            <span className="inline-flex items-center gap-[7px] text-xs font-extrabold tracking-[1.5px] text-[#6872ac]">
              MAKING GOOD SIMPLE
            </span>
            <h2 className="my-[10px] mb-2 text-[31px] leading-[1.18] tracking-[-1.7px] text-ink lg:text-[38px]">
              Three steps to meaningful impact.
            </h2>
            <p className="m-0 text-muted-foreground">
              No complicated process. Just people, purpose, and a place to begin.
            </p>
          </div>
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-[1fr_90px_1fr_90px_1fr] lg:gap-0">
            <div className="relative text-center">

              <div className="relative mx-auto mb-5 grid size-[66px] place-items-center rounded-[20px] bg-white text-ink shadow-[0_12px_28px_rgba(66,72,116,0.11)]">
                <Icon name="search" size={28} />
              </div>
              <h3 className="mb-2 text-ink">Discover</h3>
              <p className="mx-auto max-w-[220px] text-[13px] leading-[1.6] text-[#777c94]">
                Explore causes and events happening right in your neighborhood.
              </p>
            </div>
            <div className="mt-[-50px] hidden h-px border-t-2 border-dashed border-[#c9c5e6] lg:block" />
            <div className="relative text-center">

              <div className="relative mx-auto mb-5 grid size-[66px] place-items-center rounded-[20px] bg-white text-ink shadow-[0_12px_28px_rgba(66,72,116,0.11)]">
                <Icon name="heart" size={28} />
              </div>
              <h3 className="mb-2 text-ink">Join in</h3>
              <p className="mx-auto max-w-[220px] text-[13px] leading-[1.6] text-[#777c94]">
                Save your spot in one click and meet people who care like you do.
              </p>
            </div>
            <div className="mt-[-50px] hidden h-px border-t-2 border-dashed border-[#c9c5e6] lg:block" />
            <div className="relative text-center">

              <div className="relative mx-auto mb-5 grid size-[66px] place-items-center rounded-[20px] bg-white text-ink shadow-[0_12px_28px_rgba(66,72,116,0.11)]">
                <Icon name="spark" size={28} />
              </div>
              <h3 className="mb-2 text-ink">Make it count</h3>
              <p className="mx-auto max-w-[220px] text-[13px] leading-[1.6] text-[#777c94]">
                Show up, lend a hand, and see the difference you helped create.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* company key feture section */}
      <section
        className={cn(
          "container mx-auto grid max-w-7xl grid-cols-1 items-center gap-10 px-4 py-16 sm:px-6 lg:px-8 lg:py-24 xl:grid-cols-[1.05fr_0.95fr] xl:gap-[90px]",
        )}
      >
        <div className="relative grid grid-cols-2 grid-rows-[160px_160px] gap-[14px] sm:grid-rows-[210px_210px]">
          <Image className="self-end rounded-tl-4xl"
            src="https://images.unsplash.com/photo-1694286068561-3233c946e9be?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D"
            alt="Hero image"
            width={400}
            height={400}
          />
          <Image className=" self-end"
            src="https://images.unsplash.com/photo-1659718282962-452648b6eba6?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D"
            alt="Hero image"
            width={220}
            height={220}
          />
          <Image className="justify-self-end"
            src="https://images.unsplash.com/photo-1761039808159-f02b58f07032?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D"
            alt="Hero image"
            width={220}
            height={220}
          />
          <Image className="rounded-br-4xl"
            src="https://images.unsplash.com/photo-1757143092485-0e63d2de3ca3?q=80&w=1168&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D"
            alt="Hero image"
            width={400}
            height={400}
          />


        </div>
        <div>
          <span className="inline-flex items-center gap-[7px] text-xs font-extrabold tracking-[1.5px] text-[#6872ac]">
            WHY KINDREDGOOD
          </span>
          <h2 className="my-[10px] mb-2 text-[31px] leading-[1.18] tracking-[-1.7px] text-ink lg:text-[38px]">
            Community is not a place.
            <br />
            <em className="font-[Georgia,serif] font-normal text-[#7784c0]">
              It’s something we practice.
            </em>
          </h2>
          <p className="text-[15px] leading-[1.75] text-[#70758e]">
            We believe everyone has something meaningful to give—time, energy, a skill, or simply a
            willingness to care. KindredGood makes it easier to find each other and put that care
            into action.
          </p>
          <ul className="my-5 list-none py-[5px]">
            <li className="my-3 flex items-center gap-[10px] text-sm text-[#555b78]">
              <span className="grid size-6 place-items-center rounded-full bg-mist text-ink">
                <Icon name="check" size={16} />
              </span>
              Local events, created by real neighbors
            </li>
            <li className="my-3 flex items-center gap-[10px] text-sm text-[#555b78]">
              <span className="grid size-6 place-items-center rounded-full bg-mist text-ink">
                <Icon name="check" size={16} />
              </span>
              Simple, transparent, and always welcoming
            </li>
            <li className="my-3 flex items-center gap-[10px] text-sm text-[#555b78]">
              <span className="grid size-6 place-items-center rounded-full bg-mist text-ink">
                <Icon name="check" size={16} />
              </span>
              Your impact, remembered and celebrated
            </li>
          </ul>
        </div>
      </section>

      {/* Newsletter section */}
      <section className="container relative mx-auto mb-[72px] grid max-w-6xl grid-cols-1 items-center gap-5 overflow-hidden rounded-3xl bg-[linear-gradient(120deg,var(--soft),var(--mist))] px-6 py-8 after:absolute after:right-[-110px] after:top-[-120px] after:size-[220px] after:rounded-full after:border-[40px] after:border-white/25 after:content-[''] md:grid-cols-[54px_1fr] md:gap-[22px] md:[&>form]:col-span-2 xl:mb-[100px] xl:grid-cols-[60px_1fr_1.1fr] xl:px-[55px] xl:py-12 xl:[&>form]:col-span-1">
        <div className="mb-[18px] grid size-[54px] place-items-center rounded-2xl bg-white text-ink md:mb-0">
          <Icon name="mail" size={28} />
        </div>
        <div>
          <span className="inline-flex items-center gap-[7px] text-xs font-extrabold tracking-[1.5px] text-[#6872ac]">
            A LITTLE GOOD IN YOUR INBOX
          </span>
          <h2 className="my-[5px] text-[28px] text-ink">Newsletter.</h2>
          <p className="m-0 text-xs text-[#6f7490]">
            New events, community stories, and simple ways to help—sent thoughtfully, never too
            often.
          </p>
        </div>


        <div>
          <form
            className="mt-5 flex flex-col gap-2 rounded-[13px] p-0 md:col-span-2 md:flex-row md:gap-0 md:bg-white md:p-1.5  xl:col-span-1">
            <Input
              className=" flex-1 rounded-[10px] border-0 bg-white px-[14px] py-[14px] text-[13px] text-foreground shadow-none outline-none focus-visible:ring-0 md:rounded-none md:py-0"
              type="email"
              placeholder="Your email address"
              aria-label="Your email address"
            />
            <Button className="inline-flex items-center justify-center gap-[10px] rounded-xl bg-ink px-[22px] py-[15px] text-sm font-bold text-white shadow-[0_8px_18px_rgba(66,72,116,0.18)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#343a64] hover:shadow-[0_11px_25px_rgba(66,72,116,0.24)]">
              Subscribe<Icon name="arrow" size={17} />
            </Button>
          </form>
        </div>
      </section>
    </>
  );
}
