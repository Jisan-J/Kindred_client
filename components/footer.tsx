import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-[#353a64] px-4 pb-5 pt-12 text-white sm:px-6 lg:px-8 lg:pt-[65px]">
      <div className="container mx-auto grid max-w-7xl grid-cols-2 gap-8 pb-10 sm:grid-cols-3 sm:gap-10 lg:grid-cols-4 lg:gap-[70px] lg:pb-[55px]">
        <div className="col-span-2 sm:col-span-1">
          <Link
            href="/"
            className="inline-flex items-center gap-[10px] border-0 bg-transparent p-0 font-heading text-lg font-extrabold tracking-[-0.8px] text-white sm:text-xl"
            aria-label="Go to home"
          >
            <span>
              Kindred<span className="text-[#8995ce]">Good</span>
            </span>
          </Link>
          <p className="my-5 max-w-[280px] text-[13px] leading-[1.7] text-[#b9bdd6]">
            Helping good people find each other—and make their communities stronger, together.
          </p>
          <div className="flex gap-2">
            <button className="size-[34px] rounded-full border border-[#696e96] bg-transparent text-[11px] text-white">
              ig
            </button>
            <button className="size-[34px] rounded-full border border-[#696e96] bg-transparent text-[11px] text-white">
              f
            </button>
            <button className="size-[34px] rounded-full border border-[#696e96] bg-transparent text-[11px] text-white">
              in
            </button>
          </div>
        </div>
        <div>
          <h4 className="mb-5 text-xs tracking-[1px] text-[#d7daf0] uppercase">Explore</h4>
          <Link
            href="/events"
            className="block border-0 bg-transparent py-1.5 text-[13px] text-[#aeb3cf] hover:text-white"
          >
            Upcoming events
          </Link>
          <Link
            href="/#impact"
            className="block border-0 bg-transparent py-1.5 text-[13px] text-[#aeb3cf] hover:text-white"
          >
            Our impact
          </Link>
          <button className="block border-0 bg-transparent py-1.5 text-[13px] text-[#aeb3cf] hover:text-white">
            Community stories
          </button>
        </div>
        <div>
          <h4 className="mb-5 text-xs tracking-[1px] text-[#d7daf0] uppercase">Get involved</h4>
          <Link
            href="/dashboard/create"
            className="block border-0 bg-transparent py-1.5 text-[13px] text-[#aeb3cf] hover:text-white"
          >
            Create an event
          </Link>
          <Link
            href="/dashboard/joined"
            className="block border-0 bg-transparent py-1.5 text-[13px] text-[#aeb3cf] hover:text-white"
          >
            Joined events
          </Link>
          <button className="block border-0 bg-transparent py-1.5 text-[13px] text-[#aeb3cf] hover:text-white">
            Partner with us
          </button>
        </div>
        <div className="hidden lg:block">
          <h4 className="mb-5 text-xs tracking-[1px] text-[#d7daf0] uppercase">Here to help</h4>
          <button className="block border-0 bg-transparent py-1.5 text-[13px] text-[#aeb3cf] hover:text-white">
            About us
          </button>
          <button className="block border-0 bg-transparent py-1.5 text-[13px] text-[#aeb3cf] hover:text-white">
            Contact
          </button>
          <button className="block border-0 bg-transparent py-1.5 text-[13px] text-[#aeb3cf] hover:text-white">
            FAQs
          </button>
        </div>
      </div>
      <div className="container mx-auto flex flex-col gap-4 border-t border-[#555a80] pt-5 text-[11px] text-[#8f94b4] sm:flex-row sm:justify-between">
        <span>© 2025 KindredGood. Made with care in Dhaka.</span>
        <div>
          <button className="mr-[15px] border-0 bg-transparent text-[#8f94b4] sm:ml-5 sm:mr-0">
            Privacy
          </button>
          <button className="mr-[15px] border-0 bg-transparent text-[#8f94b4] sm:ml-5 sm:mr-0">
            Terms
          </button>
        </div>
      </div>
    </footer>
  );
}
