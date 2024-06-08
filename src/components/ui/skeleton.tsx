import { cn } from "@/utils/cn";

function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("animate-pulse rounded-md bg-black/70", className)}
      {...props}
    />
  );
}

export { Skeleton };
