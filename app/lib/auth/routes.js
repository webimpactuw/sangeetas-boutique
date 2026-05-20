/** Routes that require a Supabase session */
export const PROTECTED_PREFIX = '/dashboard'

/** Post-login destination and auth-only landing */
export const DEFAULT_AUTH_REDIRECT = '/dashboard'

/** Public auth pages — signed-in users are redirected away */
export const AUTH_ROUTES = ['/login', '/signup', '/forgot-password']

export const DASHBOARD_LINKS = [
  { href: '/dashboard/purchase-history', label: 'Purchase History' },
  { href: '/dashboard/request-history', label: 'Request History' },
  { href: '/dashboard/manage-account', label: 'Manage Account' },
  { href: '/dashboard/favorites', label: 'Favorites' },
]
