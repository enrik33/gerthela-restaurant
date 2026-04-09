import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#0d1117] flex items-center justify-center px-4">
      <div className="text-center">
        <p className="text-[#c9972c] font-semibold tracking-widest uppercase text-sm mb-3">
          404
        </p>
        <h1 className="font-display text-5xl md:text-6xl font-bold text-[#e6edf3] mb-4">
          Page Not Found
        </h1>
        <p className="text-gray-400 text-lg mb-8 max-w-md mx-auto">
          The page you&apos;re looking for doesn&apos;t exist. Let&apos;s get you back to the table.
        </p>
        <Link
          href="/"
          className="inline-block px-8 py-3 bg-[#c9972c] hover:bg-[#a87a20] text-white rounded-full font-semibold transition-all shadow-md hover:shadow-lg"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
}
