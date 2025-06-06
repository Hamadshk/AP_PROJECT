import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI; // Store in .env.local
const client = new MongoClient(uri);

const allSlots = [
  '9:00 AM - 10:00 AM',
  '10:00 AM - 11:00 AM',
  '11:00 AM - 12:00 PM',
  '12:00 PM - 1:00 PM',
  '1:00 PM - 2:00 PM',
  '2:00 PM - 3:00 PM',
  '3:00 PM - 4:00 PM',
  '4:00 PM - 5:00 PM',
];

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      await client.connect();
      const database = client.db('moviehouse');
      const bookings = database.collection('bookings');

      const { date } = req.query; // e.g., "2025-05-10"
      const bookedSlots = await bookings
        .find({ date })
        .project({ slot: 1, _id: 0 })
        .toArray();
      const bookedSlotNames = bookedSlots.map((booking) => booking.slot);

      const availableSlots = allSlots.filter((slot) => !bookedSlotNames.includes(slot));

      res.status(200).json(availableSlots);
    } catch (error) {
      console.error('Error fetching slots:', error);
      res.status(500).json({ error: 'Failed to fetch slots' });
    } finally {
      await client.close();
    }
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}