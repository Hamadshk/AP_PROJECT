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