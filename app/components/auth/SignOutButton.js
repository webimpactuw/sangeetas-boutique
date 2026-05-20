import { signOut } from '@/app/actions/auth'

export default function SignOutButton({ className = '' }) {
  return (
    <form action={signOut}>
      <button
        type="submit"
        className={
          className ||
          'font-cardo text-navy underline underline-offset-4 hover:text-navy/80 transition-colors'
        }
      >
        Sign out
      </button>
    </form>
  )
}
