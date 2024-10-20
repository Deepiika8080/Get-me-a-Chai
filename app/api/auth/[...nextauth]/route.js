import NextAuth from 'next-auth'
import GitHubProvider from "next-auth/providers/github";
import mongoose from 'mongoose';
import User from '@/app/models/User';
import connectDB from '@/db/connectDb';

const authoptions = NextAuth({
  providers: [
    // OAuth authentication providers...
    GitHubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
      scope: 'user:email',
      profile(profile) {
        return {
          id: profile.id,
          name: profile.name || profile.login,
          email: profile.email,
        }
      }
    }),

  ],
  callbacks: {
    async signIn({ user, account, profile, email }) {
      if (account.provider == 'github') {
       
        await connectDB(); // Ensure database is connected
        console.log('Profile received from GitHub:', profile);

        // Extract email from profile if not provided directly
        const userEmail = email || profile.email;
        console.log('Email extracted:', userEmail);
        if (!userEmail) {
          throw new Error('Email not provided by GitHub');
        }
         
        const userData = {
          name:user.name,
          email:userEmail,
          username:userEmail.split('@')[0],
        }

        saveUser(userData);
        return true;
      }
        return false;
   
    },
    async session({ session, token, user }) {
      await connectDB(); // Ensure database is connected
      console.log('Session user email:', session.user.email);
      const dbUser = await User.findOne({ email: session.user.email })
      if (dbUser) {
        session.user.name = dbUser.username;
      } else {
        console.log('User not found in database');
      }
      return session;
    },
  },
});

const saveUser = async (userData) => {
      try {
        let user = await User.findOne({email:userData.email});

      if(!user) {
        user = new User(userData);
      }else {
         // Update existing user
      user.name = userData.name;
      user.username = userData.username;
      user.updatedAt = Date.now();
      }
      let saveduser = await user.save();
      // console.log(saveduser);
      }catch(error) {
        console.error('Error saving user:', error);
      }
}

export { authoptions as GET, authoptions as POST }
