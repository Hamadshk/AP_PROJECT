import { MongoClient } from 'mongodb';

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method not allowed' });
    }

    try {
        const { name, email, password } = req.body;

        const client = await MongoClient.connect(process.env.MONGODB_URI);
        const db = client.db('moviehouse');

        const existingUser = await db.collection('users').findOne({ email });
        if (existingUser) {
            client.close();
            return res.status(422).json({ message: 'User already exists' });
        }

        const result = await db.collection('users').insertOne({
            name,
            email,
            password: password,
            role: 'user',
            createdAt: new Date(),
        });

        client.close();
        res.status(201).json({ message: 'User created successfully', result });
    } catch (error) {
        res.status(500).json({ message: 'Something went wrong' });
    }
}