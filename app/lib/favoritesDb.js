import { createClient } from './supabase/server'
import { FAVORITES_TABLE } from './favorites'

/**
 * @param {string} userId
 * @returns {Promise<string[]>}
 */
export async function getFavoriteProductIds(userId) {
  if (!userId) return []

  const supabase = await createClient()
  const { data, error } = await supabase
    .from(FAVORITES_TABLE)
    .select('product_id')
    .eq('user_id', userId)
    .order('created_at', { ascending: false })

  if (error) {
    console.error('[favorites] list failed:', error.message)
    return []
  }

  return (data ?? []).map((row) => row.product_id)
}

/**
 * @param {string} userId
 * @param {string} productId
 * @returns {Promise<boolean>}
 */
export async function isProductFavorited(userId, productId) {
  if (!userId || !productId) return false

  const supabase = await createClient()
  const { data, error } = await supabase
    .from(FAVORITES_TABLE)
    .select('id')
    .eq('user_id', userId)
    .eq('product_id', productId)
    .maybeSingle()

  if (error) {
    console.error('[favorites] lookup failed:', error.message)
    return false
  }

  return Boolean(data)
}
