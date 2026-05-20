import { Suspense } from 'react'
import AuthPageShell from '@/app/components/auth/AuthPageShell'
import LoginForm from '@/app/components/auth/LoginForm'

export const metadata = {
  title: "Sign In | Sangeeta's Boutique",
}

export default function LoginPage() {
  return (
    <AuthPageShell closeHref="/">
      <Suspense fallback={<p className="font-cardo text-navy text-base md:text-lg">Loading…</p>}>
        <LoginForm />
      </Suspense>
    </AuthPageShell>
  )
}
