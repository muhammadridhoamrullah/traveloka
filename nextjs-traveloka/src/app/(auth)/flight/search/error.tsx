"use client";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="bg-blue-950 w-full min-h-screen pt-36 px-20 pb-5 flex flex-col justify-center items-center text-white">
      <h2 className="text-2xl font-bold mb-4">Something went wrong!</h2>
      <p className="mb-4">{error.message}</p>
      <button
        onClick={reset}
        className="bg-blue-600 px-4 py-2 rounded hover:bg-blue-700"
      >
        Try again
      </button>
    </div>
  );
}
