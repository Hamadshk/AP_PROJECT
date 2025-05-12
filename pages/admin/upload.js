import React, { useState } from 'react';
import { Container, Typography, TextField, Button, Box } from '@mui/material';
import Header from '@/components/Header';

const Upload = () => {
  const [formData, setFormData] = useState({
    productName: '',
    productQuality: '',
    productImageUrl: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch('/api/upload', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || 'Failed to add product');
    }
    setFormData({
      productName: '',
      productQuality: '',
      productImageUrl: '',
    });
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
        bgcolor: '#f5f5f5',
      }}
    >
      <Header />
      <Container
        maxWidth="sm"
        sx={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          py: 4,
        }}
      >
        <Box
          sx={{
            bgcolor: 'white',
            borderRadius: 2,
            boxShadow: 3,
            p: 4,
            width: '100%',
          }}
        >
          <Typography
            variant="h5"
            component="h2"
            align="center"
            gutterBottom
            sx={{ fontWeight: 'medium' }}
          >
            Upload Product
          </Typography>
          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              label="Product Name"
              id="productName"
              name="productName"
              value={formData.productName}
              onChange={handleChange}
              placeholder="Enter product name"
              required
              margin="normal"
              variant="outlined"
            />
            <TextField
              fullWidth
              label="Product Quality"
              id="productQuality"
              name="productQuality"
              value={formData.productQuality}
              onChange={handleChange}
              placeholder="High, Medium, Low"
              required
              margin="normal"
              variant="outlined"
            />
            <TextField
              fullWidth
              label="Product Image URL"
              id="productImageUrl"
              name="productImageUrl"
              type="url"
              value={formData.productImageUrl}
              onChange={handleChange}
              placeholder="https://example.com/image.jpg"
              required
              margin="normal"
              variant="outlined"
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              sx={{ mt: 3, py: 1.5, borderRadius: 1 }}
            >
              Upload
            </Button>
          </form>
        </Box>
      </Container>
    </Box>
  );
};

export default Upload;