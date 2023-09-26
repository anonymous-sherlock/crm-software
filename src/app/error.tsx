"use client";

type Props = {
  error: Error & { digest?: string };
  reset: VoidFunction;
};

export default function HomePageError({ error, reset }: Props): JSX.Element {
  return (
    <div className="bg-indigo-950 text-lime-600 text-3xl h-screen text flex items-center justify-center">
      {error.message && error.message}
    </div>
  );
}
