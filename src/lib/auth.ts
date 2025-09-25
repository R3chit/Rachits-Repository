import { NextAuthOptions } from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import { SupabaseAdapter } from '@next-auth/supabase-adapter'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export const authOptions: NextAuthOptions = {
  adapter: SupabaseAdapter({
    url: process.env.NEXT_PUBLIC_SUPABASE_URL!,
    secret: process.env.SUPABASE_SERVICE_ROLE_KEY!,
  }),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
      // Check if user email is in whitelist
      const whitelistEmails = process.env.WHITELIST_EMAILS?.split(',') || []
      const userEmail = user.email?.toLowerCase()
      
      if (!userEmail || !whitelistEmails.includes(userEmail)) {
        return false
      }

      // Check if user exists in database, if not create them
      const { data: existingUser } = await supabase
        .from('users')
        .select('*')
        .eq('email', userEmail)
        .single()

      if (!existingUser) {
        await supabase
          .from('users')
          .insert({
            email: userEmail,
            name: user.name,
            image: user.image,
            role: 'user',
            created_at: new Date().toISOString(),
          })
      }

      return true
    },
    async session({ session, user }) {
      if (session?.user?.email) {
        const { data: userData } = await supabase
          .from('users')
          .select('role, id')
          .eq('email', session.user.email)
          .single()

        if (userData) {
          session.user.id = userData.id
          session.user.role = userData.role
        }
      }
      return session
    },
  },
  pages: {
    signIn: '/auth/signin',
    error: '/auth/error',
  },
  session: {
    strategy: 'jwt',
  },
}
