import Header from "@/components/Header"
import { useState } from "react";
const upload = () => {
    const [formData, setFormData] = useState({
        productName: "",
        productQuality: "",
        productImageUrl: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    async function handleSubmit(e) {
        e.preventDefault();
        const response = await fetch("/api/upload", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error || "Failed to add product");
        }
        setFormData({
            productName: "",
            productQuality: "",
            productImageUrl: "",
        });
    };
    return (
        <div className="">
            <Header />
            <div className="">
                <form onSubmit={handleSubmit} className="">
                    <h2 >Upload Product</h2>

                    <div >
                        <label htmlFor="productName" className="">
                            Product Name
                        </label>
                        <input
                            type="text"
                            id="productName"
                            name="productName"
                            value={formData.productName}
                            onChange={handleChange}
                            className=""
                            placeholder="Enter product name"
                            required
                        />
                    </div>

                    <div >
                        <label htmlFor="productQuality" className="">
                            Product Quality
                        </label>
                        <input
                            type="text"
                            id="productQuality"
                            name="productQuality"
                            value={formData.productQuality}
                            onChange={handleChange}
                            className=""
                            placeholder="High, Medium, Low"
                            required
                        />
                    </div>

                    <div>
                        <label htmlFor="productImageUrl">
                            Product Image URL
                        </label>
                        <input
                            type="url"
                            id="productImageUrl"
                            name="productImageUrl"
                            value={formData.productImageUrl}
                            onChange={handleChange}
                            placeholder="url of the image"
                            required
                        />
                    </div>

                    <button type="submit" >
                        Upload
                    </button>
                </form>
            </div>
        </div >
    )
}

export default upload