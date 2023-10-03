import Skeleton from "react-loading-skeleton";

export default function Loading() {
  return <Skeleton height={100} className="my-2" count={3} />;
}
