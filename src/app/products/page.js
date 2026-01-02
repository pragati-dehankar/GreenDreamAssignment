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
  Button,
} from "@mui/material";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useProductsStore } from "@/store/productsStore";

const LIMIT = 10;

export default function ProductsPage() {
  const {
    products,
    categories,
    total,
    page,
    loading,
    fetchProducts,
    fetchCategories,
  } = useProductsStore();

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");

  useEffect(() => {
    fetchCategories();
    fetchProducts({ page: 1 });
  }, []);

  useEffect(() => {
    fetchProducts({ page, search, category });
  }, [page, search, category]);

  return (
    <Box p={3}>
      <Typography variant="h5" mb={3} textAlign="center">
        Products List
      </Typography>

      <Grid container spacing={2} mb={4} justifyContent="center">
        <Grid item xs={12} sm={6} md={4}>
          <TextField
            label="Search products"
            fullWidth
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setCategory("");
              fetchProducts({ page: 1, search: e.target.value });
            }}
          />
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <Select
            fullWidth
            displayEmpty
            value={category}
            onChange={(e) => {
              setCategory(e.target.value);
              setSearch("");
              fetchProducts({ page: 1, category: e.target.value });
            }}
          >
            <MenuItem value="">All Categories</MenuItem>
            {categories.map((cat) => (
              <MenuItem key={cat.slug} value={cat.slug}>
                {cat.name}
              </MenuItem>
            ))}
          </Select>
        </Grid>
      </Grid>

      {loading ? (
        <Box display="flex" justifyContent="center">
          <CircularProgress />
        </Box>
      ) : (
        <>
          <Grid container spacing={4} justifyContent="center">
            {products.map((product) => (
              <Grid item key={product.id} xs={12} sm={6} md={4} lg={3}>
                <Card
                  sx={{
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    textAlign: "center",
                  }}
                >
                  <CardMedia
                    component="img"
                    height="180"
                    image={product.thumbnail}
                    alt={product.title}
                  />

                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography fontWeight="bold">
                      {product.title}
                    </Typography>

                    <Typography color="primary" fontWeight="bold">
                      ₹ {product.price}
                    </Typography>

                    <Typography variant="body2">
                      {product.category}
                    </Typography>

                    <Typography variant="body2">
                      ⭐ {product.rating}
                    </Typography>
                  </CardContent>

                  <Box pb={2}>
                    <Button
                      component={Link}
                      href={`/products/${product.id}`}
                      variant="contained"
                      size="small"
                    >
                      View Details
                    </Button>
                  </Box>
                </Card>
              </Grid>
            ))}
          </Grid>

          {!search && !category && (
            <Box mt={5} display="flex" justifyContent="center">
              <Pagination
                count={Math.ceil(total / LIMIT)}
                page={page}
                onChange={(e, value) =>
                  fetchProducts({ page: value })
                }
              />
            </Box>
          )}
        </>
      )}
    </Box>
  );
}
