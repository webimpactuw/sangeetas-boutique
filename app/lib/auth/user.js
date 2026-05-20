/** Serializable user for client components (navbar, drawers, etc.) */
export function serializeAuthUser(user) {
  if (!user) return null

  const firstName = user.user_metadata?.first_name
  const email = user.email ?? ''
  const displayName =
    (typeof firstName === 'string' && firstName.trim()) ||
    (email ? email.split('@')[0] : 'Guest')
  const initial = displayName.charAt(0).toUpperCase() || '?'

  return {
    id: user.id,
    email: email || null,
    displayName,
    initial,
  }
}
