// import { getSession } from 'next-auth/react';
// import { MongoClient } from 'mongodb';

// const uri = process.env.MONGODB_URI; // Store in .env.local
// const client = new MongoClient(uri);

// if (!process.env.MONGODB_URI) {
//   throw new Error('Please add MONGODB_URI to .env.local');
// }

// export default async function handler(req, res) {
//   if (req.method !== 'GET') {
//     return res.status(405).json({ message: 'Method not allowed' });
//   }

//   const session = await getSession({ req });
//   if (!session || session.user.role !== 'admin') {
//     return res.status(401).json({ message: 'Unauthorized' });
//   }

//   try {
//     await client.connect();
//     const database = client.db('moviehouse');

//     const bookings = await database.collection('bookings').find().toArray();

//     console.log('Raw bookings:', bookings); // Debug raw data

//     // Convert ObjectId and handle createdAt
//     const serializedBookings = bookings.map((booking) => {
//       let createdAt;
//       if (booking.createdAt instanceof Date) {
//         createdAt = booking.createdAt.toISOString();
//       } else if (typeof booking.createdAt === 'string') {
//         createdAt = new Date(booking.createdAt).toISOString();
//       } else {
//         console.warn('Invalid createdAt for booking:', booking._id, booking.createdAt);
//         createdAt = null; // Or set a default value
//       }

//       return {
//         _id: booking._id.toString(),
//         date: booking.date,
//         slot: booking.slot,
//         userId: booking.userId,
//         createdAt,
//       };
//     });

//     return res.status(200).json(serializedBookings);
//   } catch (error) {
//     console.error('Error fetching bookings:', error);
//     return res.status(500).json({ message: 'Internal server error' });
//   }
// }
import { getSession } from 'next-auth/react';
import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri);

export default async function handler(req, res) {
  if (req.method === 'GET') {
  const session = await getSession({ req });
  if (!session || session.user.role !== 'admin') {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  await client.connect();
  const db = client.db('moviehouse');
  const bookings = await db.collection('bookings').find().toArray();
  client.close();

  const serializedBookings = bookings.map((booking) => ({
    _id: booking._id.toString(),
    date: booking.date,
    slot: booking.slot,
    userId: booking.userId,
    createdAt: booking.createdAt,
  }));

  res.status(200).json(serializedBookings);
}
}