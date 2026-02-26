import React from "react";
import Link from 'next/link';

export default function HomePage() {
  return (
    <main className="relative min-h-screen bg-gradient-to-b overflow-hidden from-slate-50 via-white to-slate-100 text-slate-900">
      {/* Blurred gradient splodges at extremities */}
      <div
        className="pointer-events-none absolute -left-32 -top-32 h-100 w-100 rounded-full bg-gradient-to-br from-sky-200/40 to-indigo-300/30 blur-3xl"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full bg-gradient-to-bl from-indigo-200/40 to-sky-300/30 blur-3xl"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -bottom-32 -left-32 h-96 w-96 rounded-full bg-gradient-to-tr from-sky-100/50 to-indigo-200/30 blur-3xl"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -bottom-32 -right-32 h-96 w-96 rounded-full bg-gradient-to-tl from-indigo-100/50 to-sky-200/30 blur-3xl"
        aria-hidden
      />
      <div className="mx-auto flex min-h-screen max-w-5xl flex-col px-6 py-10 md:px-10 lg:px-12">

        {/* Hero section */}
        <section className="flex flex-1 flex-col items-s justify-center gap-10">
          <div className="space-y-6">
            <p className="inline-flex items-center rounded-full bg-slate-900/5 px-3 py-1 text-xs font-medium text-slate-700 ring-1 ring-slate-200">
              Purpose-built for internship hunters
            </p>

            <div className="space-y-4">
              <h1 className="text-balance text-4xl font-semibold tracking-tight text-slate-900 sm:text-5xl lg:text-8xl">
                Let an AI agent{" "}
                <span className="bg-gradient-to-r from-sky-500 to-indigo-500 bg-clip-text text-transparent">
                  find companies
                </span>{" "}
                to reach out to.
              </h1>

              <p className="max-w-xl text-pretty text-sm leading-relaxed text-slate-600 sm:text-base">
                Internship Outreach Agent scans opportunities, surfaces relevant companies, and
                 so you can spend less time searching and increase your chance of success</p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
              <Link href="/get-started" className="inline-flex items-center justify-center rounded-full bg-slate-900 px-6 py-2.5 text-sm font-medium text-white shadow-sm transition hover:bg-slate-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-900 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-50">
                Get started
              </Link>
            </div>
          </div>

          {/* Simple feature highlight block */}
          <div className="grid w-full gap-4 rounded-2xl border border-slate-200 bg-white/80 p-4 shadow-sm backdrop-blur-sm sm:grid-cols-3 sm:gap-5 sm:p-5">
            <div className="space-y-1">
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                Smart company matching
              </p>
              <p className="text-xs text-slate-600 sm:text-sm">
                Get a curated list of companies that align with your skills, interests, and
                location.
              </p>
            </div>
            <div className="space-y-1">
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                Outreach ready
              </p>
              <p className="text-xs text-slate-600 sm:text-sm">
                See key company details so you can personalize messages without digging for info.
              </p>
            </div>
            <div className="space-y-1">
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                Stay organized
              </p>
              <p className="text-xs text-slate-600 sm:text-sm">
                Track who you&apos;ve contacted and who to follow up with in one simple view.
              </p>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="mt-8 flex items-center justify-between border-t border-slate-200 pt-4 text-xs text-slate-500">
          <span>© {new Date().getFullYear()} Internship Outreach Agent</span>
          <span className="hidden sm:inline">Built to help you land your next internship.</span>
        </footer>
      </div>
    </main>
  );
}

