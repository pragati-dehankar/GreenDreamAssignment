"use client";
export const dynamic = "force-dynamic";

import {
  Card,
  CardContent,
  Typography,
  Button,
  Grid,
  CircularProgress,
} from "@mui/material";
import Link from "next/link";
import React, { useEffect, useState } from "react";

export default function SingleProductPage({ params }) {
  const { id } = React.use(params);

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`https://dummyjson.com/products/${id}`, { cache: "no-store" })
      .then((res) => res.json())
      .then((data) => {
        setProduct(data);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <CircularProgress />;

  return (
    <Card sx={{ maxWidth: 900, mx: "auto", mt: 4 }}>
      <CardContent>
        <Typography variant="h5" gutterBottom>
          {product.title}
        </Typography>

        {/* Images */}
        <Grid container spacing={2} mb={2}>
          {product.images.map((img) => (
            <Grid item xs={6} md={4} key={img}>
              <img
                src={img}
                alt={product.title}
                style={{ width: "100%", borderRadius: 8 }}
              />
            </Grid>
          ))}
        </Grid>

        <Typography>{product.description}</Typography>
        <Typography mt={1}>Price: ₹ {product.price}</Typography>
        <Typography>Brand: {product.brand}</Typography>
        <Typography>Category: {product.category}</Typography>
        <Typography>Rating: ⭐ {product.rating}</Typography>
        <Typography>Stock: {product.stock}</Typography>

        <Button
          component={Link}
          href="/products"
          variant="contained"
          sx={{ mt: 3 }}
        >
          Back to Products
        </Button>
      </CardContent>
    </Card>
  );
}
