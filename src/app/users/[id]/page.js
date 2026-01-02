"use client";
export const dynamic = "force-dynamic";

import React from "react";
import {
  Card,
  CardContent,
  Typography,
  Button,
  CircularProgress,
} from "@mui/material";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function SingleUserPage({ params }) {
  // ✅ REQUIRED in Next.js 16
  const { id } = React.use(params);

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      setLoading(true);

      const res = await fetch(`https://dummyjson.com/users/${id}`, {
        cache: "no-store",
      });
      const data = await res.json();

      setUser(data);
      setLoading(false);
    };

    fetchUser();
  }, [id]);

  if (loading) {
    return (
      <div style={{ display: "flex", justifyContent: "center", marginTop: 40 }}>
        <CircularProgress />
      </div>
    );
  }

  if (!user) {
    return <p>User not found</p>;
  }

  return (
    <Card sx={{ maxWidth: 600, mx: "auto", mt: 5 }}>
      <CardContent>
        <Typography variant="h5" gutterBottom>
          {user.firstName} {user.lastName}
        </Typography>

        <Typography>Email: {user.email}</Typography>
        <Typography>Gender: {user.gender}</Typography>
        <Typography>Phone: {user.phone}</Typography>
        <Typography>Age: {user.age}</Typography>
        <Typography>Company: {user.company?.name}</Typography>
        <Typography>
          Address: {user.address?.city}, {user.address?.state}
        </Typography>

        <Button
          component={Link}
          href="/users"
          variant="contained"
          sx={{ mt: 3 }}
        >
          Back to Users
        </Button>
      </CardContent>
    </Card>
  );
}
