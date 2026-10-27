import React from 'react';
import Link from 'next/link';

export default function NotFound() {
  return (
    <html lang="en">
      <body className="bg-[#071324] text-white flex items-center justify-center min-h-screen font-sans">
        <div className="text-center p-8 max-w-md mx-auto">
          <div className="w-16 h-16 rounded-full bg-[#0F2852] border border-[#D4AF37]/50 flex items-center justify-center text-[#D4AF37] mx-auto mb-4 font-bold text-2xl">
            404
          </div>
          <h1 className="text-2xl font-bold mb-2">Page Not Found</h1>
          <p className="text-sm text-slate-400 mb-6">
            The page you are looking for does not exist or has been moved.
          </p>
          <Link
            href="/ar"
            className="inline-block px-6 py-3 rounded-xl bg-[#D4AF37] hover:bg-[#FCE08B] text-[#0A1A33] font-bold text-sm transition-all"
          >
            Istanora VIP Transfer
          </Link>
        </div>
      </body>
    </html>
  );
}
