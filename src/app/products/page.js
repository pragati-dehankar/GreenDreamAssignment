"use client";
export const dynamic = "force-dynamic";

import {
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  Select,
  MenuItem,
  TextField,
  Pagination,
  CircularProgress,
  Box,
} from "@mui/material";
import Link from "next/link";
import { useEffect, useState } from "react";

const LIMIT = 10;

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState("");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);

  // Fetch categories
  useEffect(() => {
    fetch("https://dummyjson.com/products/categories")
      .then((res) => res.json())
      .then(setCategories);
  }, []);

  // Fetch products
  const fetchProducts = async () => {
    setLoading(true);
    const skip = (page - 1) * LIMIT;

    let url = `https://dummyjson.com/products?limit=${LIMIT}&skip=${skip}`;

    if (search) {
      url = `https://dummyjson.com/products/search?q=${search}`;
    }

    if (category) {
      url = `https://dummyjson.com/products/category/${category}`;
    }

    const res = await fetch(url);
    const data = await res.json();

    setProducts(data.products || []);
    setTotal(data.total || 0);
    setLoading(false);
  };

  useEffect(() => {
    fetchProducts();
  }, [page, search, category]);

  return (
    <Box p={3}>
      <Typography variant="h5" mb={2}>
        Products List
      </Typography>

      {/* Filters */}
      <Grid container spacing={2} mb={3}>
        <Grid item xs={12} md={4}>
          <TextField
            label="Search products"
            fullWidth
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setCategory("");
              setPage(1);
            }}
          />
        </Grid>

        <Grid item xs={12} md={4}>
          <Select
            fullWidth
            displayEmpty
            value={category}
            onChange={(e) => {
              setCategory(e.target.value);
              setSearch("");
              setPage(1);
            }}
          >
            <MenuItem value="">All Categories</MenuItem>
            {categories.map((cat) => (
              <MenuItem key={cat} value={cat}>
                {cat}
              </MenuItem>
            ))}
          </Select>
        </Grid>
      </Grid>

      {/* Products Grid */}
      {loading ? (
        <CircularProgress />
      ) : (
        <>
          <Grid container spacing={3}>
            {products.map((product) => (
              <Grid item xs={12} sm={6} md={4} key={product.id}>
                <Card>
                  <CardMedia
                    component="img"
                    height="160"
                    image={product.thumbnail}
                    alt={product.title}
                  />
                  <CardContent>
                    <Typography fontWeight="bold">
                      {product.title}
                    </Typography>
                    <Typography>₹ {product.price}</Typography>
                    <Typography variant="body2">
                      Category: {product.category}
                    </Typography>
                    <Typography variant="body2">
                      Rating: ⭐ {product.rating}
                    </Typography>

                    <Link href={`/products/${product.id}`}>
                      View Details →
                    </Link>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>

          {/* Pagination */}
          {!search && !category && (
            <Pagination
              sx={{ mt: 4 }}
              count={Math.ceil(total / LIMIT)}
              page={page}
              onChange={(e, value) => setPage(value)}
            />
          )}
        </>
      )}
    </Box>
  );
}
