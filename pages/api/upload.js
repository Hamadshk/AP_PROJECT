// pages/api/upload.js
import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI; // Store in .env.local
const client = new MongoClient(uri);

export default async function handler(req, res) {
    if (req.method === 'POST') {
        try {
            const { productName, productQuality, productImageUrl } = req.body;

            // Validate input
            if (!productName || !productQuality || !productImageUrl) {
                return res.status(400).json({ error: 'Missing required fields' });
            }

            await client.connect();
            const database = client.db('moviehouse');
            const products = database.collection('products');

            // Check for existing product
            const existingProduct = await products.findOne({ productName });
            if (existingProduct) {
                return res.status(400).json({ error: 'Product with this name already exists' });
            }

            // Save new product
            const product = {
                productName,
                productQuality,
                productImageUrl,
                createdAt: new Date(),
            };
            await products.insertOne(product);

            res.status(201).json({ message: 'Product added successfully', product });
        } catch (error) {
            console.error('Error saving product:', error);
            res.status(500).json({ error: 'Failed to save product' });
        } finally {
            await client.close();
        }
    } else if (req.method === 'GET') {
        try {
            await client.connect();
            const database = client.db('moviehouse');
            const products = database.collection('products');

            // Retrieve all products
            const productList = await products.find({}).toArray();

            res.status(200).json({ message: 'Products retrieved successfully', products: productList });
        } catch (error) {
            console.error('Error retrieving products:', error);
            res.status(500).json({ error: 'Failed to retrieve products' });
        } finally {
            await client.close();
        }
    } else {
        res.setHeader('Allow', ['POST', 'GET']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}