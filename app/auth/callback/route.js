import { NextResponse } from 'next/server'
import { DEFAULT_AUTH_REDIRECT } from '@/app/lib/auth/routes'
import { createClient } from '@/app/lib/supabase/server'

export async function GET(request) {
  const { searchParams, origin } = new URL(request.url)
  const code = searchParams.get('code')
  const next = searchParams.get('next') ?? searchParams.get('redirectTo') ?? DEFAULT_AUTH_REDIRECT

  if (code) {
    const supabase = await createClient()
    const { error } = await supabase.auth.exchangeCodeForSession(code)
    if (!error) {
      return NextResponse.redirect(`${origin}${next.startsWith('/') ? next : `/${next}`}`)
    }
  }

  return NextResponse.redirect(`${origin}/login?error=auth_callback`)
}
