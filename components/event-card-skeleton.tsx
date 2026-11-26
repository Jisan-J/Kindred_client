import { Card } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { cn } from "@/lib/utils"

/* Loading placeholder shaped like EventCard / JoinEventCard / ManageEventCard */
export function EventCardSkeleton() {
  return (
    <Card
      className={cn(
        "overflow-hidden rounded-[18px] border border-[#e9e7f2] bg-white shadow-[0_12px_36px_rgba(65,71,112,0.07)]",
        "gap-0 p-0"
      )}
    >
      {/* Cover image, type badge and date box */}
      <div className="relative h-[215px] overflow-hidden bg-[#e4e1ef]">
        <Skeleton className="absolute top-[14px] left-[14px] h-[26px] w-[68px] rounded-[20px] bg-white/75" />
        <Skeleton className="absolute right-[14px] bottom-[14px] h-14 w-[50px] rounded-[11px] bg-white/85" />
      </div>
      <div className="p-[22px]">
        <Skeleton className="mb-[9px] h-[19px] w-3/4" />
        <div className="min-h-10 space-y-[7px]">
          <Skeleton className="h-3 w-full" />
          <Skeleton className="h-3 w-[85%]" />
        </div>
        <div className="my-[17px] border-t border-[#efedf5] pt-[15px]">
          <Skeleton className="h-4 w-28" />
        </div>
        <Skeleton className="h-[17px] w-28 rounded-none" />
      </div>
    </Card>
  )
}

export function EventCardSkeletonGrid({ count = 6 }: { count?: number }) {
  return (
    <div
      className={cn(
        "grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3",
        "gap-y-[30px]"
      )}
    >
      {Array.from({ length: count }, (_, idx) => (
        <EventCardSkeleton key={idx} />
      ))}
    </div>
  )
}

/* Whole card-grid page: heading (and optional search bar) + card skeletons */
export function CardGridPageSkeleton({
  count = 6,
  withSearch = false,
}: {
  count?: number
  withSearch?: boolean
}) {
  return (
    <main className="container mx-auto min-h-[700px] max-w-7xl px-4 pt-12 pb-20 sm:px-6 lg:px-8 lg:pt-[70px] lg:pb-[110px]">
      <div className="mb-[45px] text-center">
        <Skeleton className="mx-auto h-3 w-[230px] max-w-full" />
        <Skeleton className="mx-auto my-[9px] h-9 w-[320px] max-w-full sm:h-[46px] sm:w-[400px]" />
        <Skeleton className="mx-auto h-4 w-[280px] max-w-full" />
      </div>
      {withSearch ? (
        <Skeleton className="mb-[30px] h-[42px] w-full rounded-[11px] md:w-72" />
      ) : null}
      <EventCardSkeletonGrid count={count} />
    </main>
  )
}
