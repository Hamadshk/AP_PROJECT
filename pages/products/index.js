// pages/products.jsx
'use client';

import { useEffect, useState } from "react";
import Header from "@/components/Header";

const Products = () => {
    const [products, setProducts] = useState([]);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch("/api/upload");
                const data = await response.json();
                if (!response.ok) {
                    throw new Error(data.error || "Failed to fetch products");
                }
                setProducts(data.products);
            } catch (err) {
                setError(err.message);
            }
        };
        fetchProducts();
    }, []);

    return (

        <div>
            <Header />
            <h2>Product List</h2>
            {error && <p>{error}</p>}
            {products.length === 0 && !error && <p>No products found</p>}
            {products.map((product) => (
                <div key={product._id} style={{ border: "1px solid #ccc", padding: "10px", margin: "10px", width: "fit-content" }}>
                    <h3>{product.productName}</h3>
                    <p>Quality: {product.productQuality}</p>

                    <img style={{ width: "200px", height: "200px" }} src={product.productImageUrl} alt={product.productName} />
                </div>
            ))}
        </div>
    );
};

export default Products;