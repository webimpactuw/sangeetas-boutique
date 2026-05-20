import DashboardPlaceholder from '@/app/components/dashboard/DashboardPlaceholder'
import DashboardShell from '@/app/components/dashboard/DashboardShell'
import { serializeAuthUser } from '@/app/lib/auth/user'
import { createClient } from '@/app/lib/supabase/server'

export const metadata = {
  title: "Favorites | Sangeeta's Boutique",
}

export default async function FavoritesPage() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  const authUser = serializeAuthUser(user)

  return (
    <DashboardShell title="Favorites" authUser={authUser}>
      <DashboardPlaceholder sectionName="Favorites" />
    </DashboardShell>
  )
}
