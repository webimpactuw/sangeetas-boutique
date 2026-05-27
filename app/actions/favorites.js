'use server'

import { revalidatePath } from 'next/cache'
import { createClient } from '@/app/lib/supabase/server'
import { FAVORITES_TABLE, isValidFavoriteProductId } from '@/app/lib/favorites'

/**
 * @returns {Promise<{ ok: true, favorited: boolean } | { ok: false, error: string }>}
 */
export async function toggleFavorite(productId) {
  if (!isValidFavoriteProductId(productId)) {
    return { ok: false, error: 'Invalid product' }
  }

  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return { ok: false, error: 'Sign in to save favorites' }
  }

  const { data: existing, error: lookupError } = await supabase
    .from(FAVORITES_TABLE)
    .select('id')
    .eq('user_id', user.id)
    .eq('product_id', productId)
    .maybeSingle()

  if (lookupError) {
    console.error('[favorites] toggle lookup:', lookupError.message)
    return {
      ok: false,
      error:
        lookupError.code === '42P01'
          ? 'Favorites are not set up yet. Run supabase/migrations/20260519000000_favorites.sql in Supabase.'
          : 'Could not update favorites',
    }
  }

  if (existing) {
    const { error: deleteError } = await supabase
      .from(FAVORITES_TABLE)
      .delete()
      .eq('user_id', user.id)
      .eq('product_id', productId)

    if (deleteError) {
      console.error('[favorites] delete:', deleteError.message)
      return { ok: false, error: 'Could not remove favorite' }
    }

    revalidatePath('/dashboard/favorites')
    revalidatePath('/apparel')
    revalidatePath('/accessories')
    revalidatePath(`/products/${productId}`)
    return { ok: true, favorited: false }
  }

  const { error: insertError } = await supabase.from(FAVORITES_TABLE).insert({
    user_id: user.id,
    product_id: productId,
  })

  if (insertError) {
    console.error('[favorites] insert:', insertError.message)
    if (insertError.code === '23505') {
      return { ok: true, favorited: true }
    }
    return {
      ok: false,
      error:
        insertError.code === '42P01'
          ? 'Favorites are not set up yet. Run supabase/migrations/20260519000000_favorites.sql in Supabase.'
          : 'Could not save favorite',
    }
  }

  revalidatePath('/dashboard/favorites')
  revalidatePath('/apparel')
  revalidatePath('/accessories')
  revalidatePath(`/products/${productId}`)
  return { ok: true, favorited: true }
}
