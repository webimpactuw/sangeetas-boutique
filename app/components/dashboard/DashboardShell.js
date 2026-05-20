import Link from 'next/link'
import UserAvatar from '@/app/components/auth/UserAvatar'
import { DASHBOARD_LINKS } from '@/app/lib/auth/routes'

/**
 * Sub-page shell for dashboard sections (placeholder content).
 */
export default function DashboardShell({ title, children, authUser }) {
  return (
    <main className="bg-white py-12 md:py-20 px-6 md:px-16">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-4 mb-6">
          {authUser ? <UserAvatar initial={authUser.initial} size="md" /> : null}
          <h1 className="font-cardo font-bold text-navy text-3xl md:text-5xl">{title}</h1>
        </div>

        <Link
          href="/dashboard"
          className="inline-block font-cardo text-navy text-lg underline underline-offset-4 mb-10 hover:opacity-80"
        >
          ← My Dashboard
        </Link>

        <nav className="mb-10 flex flex-wrap gap-4 font-cardo text-navy text-base md:text-lg">
          {DASHBOARD_LINKS.map((item) => (
            <Link key={item.href} href={item.href} className="hover:underline underline-offset-4">
              {item.label}
            </Link>
          ))}
        </nav>

        {children}
      </div>
    </main>
  )
}
