import Link from 'next/link'
import DashboardAccordion from '@/app/components/dashboard/DashboardAccordion'
import UserAvatar from '@/app/components/auth/UserAvatar'
import { createClient } from '@/app/lib/supabase/server'
import { serializeAuthUser } from '@/app/lib/auth/user'

export const metadata = {
  title: "My Dashboard | Sangeeta's Boutique",
}

export default async function DashboardPage() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  const authUser = serializeAuthUser(user)

  return (
    <main className="bg-white py-10 md:py-16 px-6 md:px-16">
      <div className="max-w-3xl mx-auto">
        <header className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-6 md:mb-8">
          {authUser ? <UserAvatar initial={authUser.initial} size="md" /> : null}
          <h1 className="font-cardo font-bold text-navy text-3xl md:text-4xl text-center leading-tight">
            My Dashboard
          </h1>
        </header>

        <hr className="border-[#828282] mb-6 md:mb-8" />

        <DashboardAccordion />

        <p className="text-center mt-8 md:mt-10">
          <Link
            href="/"
            className="font-cardo text-navy text-base md:text-lg underline underline-offset-4 hover:opacity-80"
          >
            Back to shop
          </Link>
        </p>
      </div>
    </main>
  )
}
