import { Skeleton } from "@/components/ui/Skeleton";

export default function Loading() {
  return (
    <div className="container-wide section-padding">
      <Skeleton className="mx-auto mb-8 h-12 max-w-lg" />
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <Skeleton key={i} className="h-40 w-full" />
        ))}
      </div>
    </div>
  );
}
