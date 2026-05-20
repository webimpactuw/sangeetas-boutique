import AuthDrawer from './AuthDrawer'
import HomePageContent from '@/app/components/HomePageContent'

/**
 * Renders storefront content behind an auth drawer (sign-in, sign-up, reset password).
 */
export default function AuthPageShell({ children, closeHref = '/' }) {
  return (
    <>
      <HomePageContent />
      <AuthDrawer closeHref={closeHref}>{children}</AuthDrawer>
    </>
  )
}
