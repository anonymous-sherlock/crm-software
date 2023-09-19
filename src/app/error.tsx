"use client";

type Props = {
  error: Error & { digest?: string };
  reset: VoidFunction;
};

export default function HomePageError({ error, reset }: Props): JSX.Element {
  return <div 
  className="bg-indigo-950 text-lime-700 text-3xl">{error.message && error.message}</div>;
}
