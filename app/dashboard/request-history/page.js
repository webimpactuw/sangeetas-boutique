import DashboardPlaceholder from '@/app/components/dashboard/DashboardPlaceholder'
import DashboardShell from '@/app/components/dashboard/DashboardShell'
import { serializeAuthUser } from '@/app/lib/auth/user'
import { createClient } from '@/app/lib/supabase/server'

export const metadata = {
  title: "Request History | Sangeeta's Boutique",
}

export default async function RequestHistoryPage() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  const authUser = serializeAuthUser(user)

  return (
    <DashboardShell title="Request History" authUser={authUser}>
      <DashboardPlaceholder sectionName="Request history" />
    </DashboardShell>
  )
}
