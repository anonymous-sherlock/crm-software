import Skeleton from "react-loading-skeleton";

export default function Loading() {
    // You can add any UI inside Loading, including a Skeleton.
    return <Skeleton count={3} className="h-4 w-[250px]" />
} 