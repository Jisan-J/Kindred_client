import { Skeleton } from "@/components/ui/skeleton"

/* Loading placeholder for event detail pages: banner image + article card + sidebar card */
export default function EventDetailsSkeleton() {
  return (
    <main className="container mx-auto min-h-[700px] max-w-7xl px-4 pt-12 pb-20 sm:px-6 lg:px-8 lg:pt-[70px] lg:pb-[110px]">
      <Skeleton className="h-[300px] w-full rounded-[25px] bg-[#e4e1ef] sm:h-[380px] lg:h-[440px]" />
      <div className="relative mx-3 mt-[-25px] grid max-w-5xl grid-cols-1 items-start gap-6 sm:mx-auto sm:mt-[-40px] lg:mt-[-55px] lg:grid-cols-[1fr_330px] lg:gap-[45px]">
        <article className="rounded-[20px] bg-white p-[28px_22px] shadow-[0_10px_40px_rgba(55,60,98,0.1)] sm:p-[38px_42px]">
          <div className="mb-[10px] flex items-center justify-between gap-3">
            <Skeleton className="h-[26px] w-[68px] rounded-[20px]" />
            <Skeleton className="h-4 w-20" />
          </div>
          <Skeleton className="my-[14px] h-8 w-4/5 sm:h-10" />
          <div className="mb-[30px] flex gap-[22px] border-b border-[#eceaf3] pb-[26px]">
            <Skeleton className="h-4 w-36" />
            <Skeleton className="h-4 w-32" />
          </div>
          <Skeleton className="mt-7 mb-3 h-4 w-44" />
          <div className="space-y-[10px]">
            <Skeleton className="h-3 w-full" />
            <Skeleton className="h-3 w-full" />
            <Skeleton className="h-3 w-[85%]" />
          </div>
        </article>
        <div className="rounded-[18px] border border-soft bg-mist p-[25px] lg:mt-[90px]">
          <div className="flex items-center gap-3">
            <Skeleton className="size-10 rounded-full" />
            <Skeleton className="size-10 rounded-full" />
            <Skeleton className="size-10 rounded-full" />
          </div>
          <Skeleton className="mt-4 h-4 w-32" />
          <div className="my-5 border-t border-[#d9d4ef]" />
          <div className="flex items-center gap-[10px]">
            <Skeleton className="size-[38px] rounded-[10px]" />
            <div className="space-y-[7px]">
              <Skeleton className="h-2.5 w-16" />
              <Skeleton className="h-3 w-28" />
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
