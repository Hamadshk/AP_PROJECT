import { getServerSession } from 'next-auth';
import { MongoClient, ObjectId } from 'mongodb';

export default async function handler(req, res) {


  const client = await MongoClient.connect(process.env.MONGODB_URI);
  const db = client.db('moviehouse');

  try {
    if (req.method === 'GET') {
      const { userId } = req.query;
      const bookings = await db.collection('bookings').find({ userId }).toArray();

      const serializedBookings = bookings.map((booking) => ({
        ...booking,
        _id: booking._id.toString(),
      }));

      return res.status(200).json(serializedBookings);
    }

    if (req.method === 'DELETE') {
      try {
        const { bookingId } = req.query;
        let resp = await db.collection('bookings').deleteOne({ _id: new ObjectId(bookingId) });
        console.log('Delete response:', resp);
        return res.status(200).json({ message: 'Booking deleted successfully' });
      } catch (error) {
        console.error('Error deleting booking:', error);
        return res.status(500).json({ error: 'Failed to delete booking' });
      }
    }

    return res.status(405).json({ error: 'Method not allowed' });
  } catch (error) {
    return res.status(500).json({ error: 'Internal server error' });
  } finally {
    await client.close();
  }
}