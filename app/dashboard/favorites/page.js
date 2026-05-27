import FavoritesView from './FavoritesView'
import DashboardShell from '@/app/components/dashboard/DashboardShell'
import { resolveFavoriteProducts } from '@/app/lib/favorites'
import { getFavoriteProductIds } from '@/app/lib/favoritesDb'
import { allProducts } from '@/app/lib/products'
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

  const productIds = user ? await getFavoriteProductIds(user.id) : []
  const products = resolveFavoriteProducts(productIds, allProducts)

  return (
    <DashboardShell title="Favorites" authUser={authUser}>
      <FavoritesView products={products} />
    </DashboardShell>
  )
}
