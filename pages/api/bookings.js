import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI; // Store in .env.local
const client = new MongoClient(uri);

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const { date, slot, userId } = req.body; // userId optional, if authenticated

      await client.connect();
      const database = client.db('moviehouse');
      const bookings = database.collection('bookings');

      // Check for existing booking
      const existingBooking = await bookings.findOne({ date, slot });
      if (existingBooking) {
        return res.status(400).json({ error: 'Slot already booked' });
      }

      // Save new booking
      const booking = {
        date,
        slot,
        userId: userId || 'anonymous', // Handle unauthenticated users
        createdAt: new Date(),
      };
      await bookings.insertOne(booking);

      res.status(201).json({ message: 'Booking confirmed', booking });
    } catch (error) {
      console.error('Error saving booking:', error);
      res.status(500).json({ error: 'Failed to save booking' });
    } finally {
      await client.close();
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}