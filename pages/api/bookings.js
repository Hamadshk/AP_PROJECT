import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI; // Store in .env.local
const client = new MongoClient(uri);

export default async function handler(req, res) {
  if (req.method === 'GET') {

  const session = await getSession({ req });
  if (!session) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const userId = session.user.id; // Get user ID from session


  const client = await MongoClient.connect(process.env.MONGODB_URI);
  const db = client.db('moviehouse'); // Replace with your database name
  const bookings = await db.collection('bookings').find({ userId }).toArray();
  client.close();

  // Serialize bookings to convert ObjectId to string
  const serializedBookings = bookings.map((booking) => ({
    ...booking,
    _id: booking._id.toString(),
  }));

  res.status(200).json(serializedBookings);
}
}