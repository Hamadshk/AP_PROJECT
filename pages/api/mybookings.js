import { getServerSession } from 'next-auth';
import { MongoClient } from 'mongodb';

export default async function handler(req, res) {
  if (req.method === 'GET') {
  const {userId}=req.query;


  const client = await MongoClient.connect(process.env.MONGODB_URI);
  const db = client.db('moviehouse'); 
  const bookings = await db.collection('bookings').find({ userId }).toArray();
  client.close();

  const serializedBookings = bookings.map((booking) => ({
    ...booking,
    _id: booking._id.toString(),
  }));

  res.status(200).json(serializedBookings);
  }
}