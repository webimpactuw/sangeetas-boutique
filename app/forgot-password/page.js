import AuthPageShell from '@/app/components/auth/AuthPageShell'
import ForgotPasswordForm from '@/app/components/auth/ForgotPasswordForm'

export const metadata = {
  title: "Reset Password | Sangeeta's Boutique",
}

export default function ForgotPasswordPage() {
  return (
    <AuthPageShell closeHref="/login">
      <ForgotPasswordForm />
    </AuthPageShell>
  )
}
