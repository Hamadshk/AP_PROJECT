// import NextAuth from 'next-auth';
// import CredentialsProvider from 'next-auth/providers/credentials';
// import { MongoClient } from 'mongodb';

// // Reuse MongoDB client to avoid multiple connections
// let client;
// let clientPromise;

// if (!process.env.MONGODB_URI) {
//   throw new Error('Please add MONGODB_URI to .env.local');
// }

// if (process.env.NODE_ENV === 'development') {
//   // In development, use a global variable to preserve client across hot reloads
//   if (!global._mongoClientPromise) {
//     client = new MongoClient(process.env.MONGODB_URI);
//     global._mongoClientPromise = client.connect();
//   }
//   clientPromise = global._mongoClientPromise;
// } else {
//   // In production, create a new client
//   client = new MongoClient(process.env.MONGODB_URI);
//   clientPromise = client.connect();
// }

// export default NextAuth({
//   session: {
//     strategy: 'jwt',
//   },
//   providers: [
//     CredentialsProvider({
//       name: 'Credentials',
//       credentials: {
//         email: { label: 'Email', type: 'email' },
//         password: { label: 'Password', type: 'password' },
//       },
//       async authorize(credentials) {
//         const client = await clientPromise;
//         const db = client.db('moviehouse');
//         const admin = await db.collection('users').findOne({ email: credentials.email });

//         if (!admin) {
//           throw new Error('No admin found with this email');
//         }

//         if (admin.role !== 'admin') {
//           throw new Error('Not authorized as admin');
//         }

//         if (credentials.password !== admin.password) {
//           throw new Error('Invalid password');
//         }

//         return { email: admin.email, role: admin.role };
//       },
//     }),
//   ],
//   callbacks: {
//     async jwt({ token, user }) {
//       if (user) {
//         token.role = user.role;
//       }
//       return token;
//     },
//     async session({ session, token }) {
//       session.user.role = token.role;
//       return session;
//     },
//   },
//   secret: process.env.NEXTAUTH_SECRET,
// });
import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { MongoClient } from 'mongodb';

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials.email || !credentials.password) {
          console.error('Missing credentials:', credentials);
          return null;
        }
        const client = new MongoClient(process.env.MONGODB_URI);
        try {
          await client.connect();
          console.log('Connected to MongoDB for auth');
          const db = client.db('moviehouse');
          const user = await db.collection('users').findOne({
            email: credentials.email,
            password: credentials.password,
          });
          if (user) {
            console.log('Authenticated user:', user);
            return { id: user._id.toString(), email: user.email, role: user.role };
          }
          console.log('Authentication failed for:', credentials.email);
          return null;
        } catch (error) {
          console.error('Auth error:', error);
          return null;
        } finally {
          await client.close();
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role;
        console.log('JWT callback:', token);
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.role = token.role;
        console.log('Session callback:', session);
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: '/admin/login',
  },
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  jwt: {
    secret: process.env.NEXTAUTH_SECRET,
  },
  cookies: {
    sessionToken: {
      name: 'next-auth.session-token',
      options: {
        httpOnly: true,
        sameSite: 'lax',
        path: '/',
        secure: process.env.NODE_ENV === 'production',
      },
    },
  },
  debug: true,
  events: {
    async signIn(message) { console.log('SignIn event:', message); },
    async signOut(message) { console.log('SignOut event:', message); },
    async session(message) { console.log('Session event:', message); },
  },
});