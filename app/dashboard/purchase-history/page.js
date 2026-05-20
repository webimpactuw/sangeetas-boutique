import DashboardPlaceholder from '@/app/components/dashboard/DashboardPlaceholder'
import DashboardShell from '@/app/components/dashboard/DashboardShell'
import { serializeAuthUser } from '@/app/lib/auth/user'
import { createClient } from '@/app/lib/supabase/server'

export const metadata = {
  title: "Purchase History | Sangeeta's Boutique",
}

export default async function PurchaseHistoryPage() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  const authUser = serializeAuthUser(user)

  return (
    <DashboardShell title="Purchase History" authUser={authUser}>
      <DashboardPlaceholder sectionName="Purchase history" />
    </DashboardShell>
  )
}
