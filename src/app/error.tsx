'use client';

import { useEffect } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen bg-[#0d1117] flex items-center justify-center px-4">
      <div className="text-center">
        <p className="text-[#c9972c] font-semibold tracking-widest uppercase text-sm mb-3">
          Oops
        </p>
        <h1 className="font-display text-5xl md:text-6xl font-bold text-[#e6edf3] mb-4">
          Something Went Wrong
        </h1>
        <p className="text-gray-400 text-lg mb-8 max-w-md mx-auto">
          An unexpected error occurred. Please try again or come visit us in person.
        </p>
        <button
          onClick={reset}
          className="inline-block px-8 py-3 bg-[#c9972c] hover:bg-[#a87a20] text-white rounded-full font-semibold transition-all shadow-md hover:shadow-lg"
        >
          Try Again
        </button>
      </div>
    </div>
  );
}
