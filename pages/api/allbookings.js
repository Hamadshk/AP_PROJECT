import { getSession } from 'next-auth/react';
import { MongoClient } from 'mongodb';

// Reuse MongoDB client
let client;
let clientPromise;

if (!process.env.MONGODB_URI) {
  throw new Error('Please add MONGODB_URI to .env.local');
}

if (process.env.NODE_ENV === 'development') {
  if (!global._mongoClientPromise) {
    client = new MongoClient(process.env.MONGODB_URI);
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise;
} else {
  client = new MongoClient(process.env.MONGODB_URI);
  clientPromise = client.connect();
}

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const session = await getSession({ req });
  if (!session || session.user.role !== 'admin') {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  try {
    const client = await clientPromise;
    const db = client.db('moviehouse');
    const bookings = await db.collection('bookings').find().toArray();

    console.log('Raw bookings:', bookings); // Debug raw data

    // Convert ObjectId and handle createdAt
    const serializedBookings = bookings.map((booking) => {
      let createdAt;
      if (booking.createdAt instanceof Date) {
        createdAt = booking.createdAt.toISOString();
      } else if (typeof booking.createdAt === 'string') {
        createdAt = new Date(booking.createdAt).toISOString();
      } else {
        console.warn('Invalid createdAt for booking:', booking._id, booking.createdAt);
        createdAt = null; // Or set a default value
      }

      return {
        _id: booking._id.toString(),
        date: booking.date,
        slot: booking.slot,
        userId: booking.userId,
        createdAt,
      };
    });

    return res.status(200).json(serializedBookings);
  } catch (error) {
    console.error('Error fetching bookings:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
}