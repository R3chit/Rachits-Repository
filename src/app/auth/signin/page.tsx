import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import { authOptions } from '@/lib/auth'
import SignInForm from '@/components/auth/SignInForm'

export default async function SignInPage() {
  const session = await getServerSession(authOptions)
  
  if (session) {
    redirect('/')
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-bold text-foreground">
            AI Investment Agent
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Sign in to access the Indian stock analysis platform
          </p>
        </div>
        <SignInForm />
      </div>
    </div>
  )
}
