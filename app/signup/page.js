import AuthPageShell from '@/app/components/auth/AuthPageShell'
import SignupForm from '@/app/components/auth/SignupForm'

export const metadata = {
  title: "Sign Up | Sangeeta's Boutique",
}

export default function SignupPage() {
  return (
    <AuthPageShell closeHref="/">
      <SignupForm />
    </AuthPageShell>
  )
}
