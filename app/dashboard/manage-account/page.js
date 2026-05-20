import DashboardPlaceholder from '@/app/components/dashboard/DashboardPlaceholder'
import DashboardShell from '@/app/components/dashboard/DashboardShell'
import { serializeAuthUser } from '@/app/lib/auth/user'
import { createClient } from '@/app/lib/supabase/server'

export const metadata = {
  title: "Manage Account | Sangeeta's Boutique",
}

export default async function ManageAccountPage() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  const authUser = serializeAuthUser(user)

  return (
    <DashboardShell title="Manage Account" authUser={authUser}>
      <div className="space-y-6">
        <div className="font-cardo text-navy text-xl md:text-2xl border border-[#828282] p-6 bg-white">
          <p className="font-bold mb-2">Email</p>
          <p>{user?.email ?? '—'}</p>
        </div>
        <DashboardPlaceholder sectionName="Manage account" />
      </div>
    </DashboardShell>
  )
}
