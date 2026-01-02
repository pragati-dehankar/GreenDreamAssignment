"use client";
// export const dynamic = "force-dynamic";

import { Container, TextField, Button, Box } from "@mui/material";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await signIn("credentials", {
  username: e.target.username.value,
  password: e.target.password.value,
  redirect: false,
});

console.log("SIGN IN RESULT:", res);


    if (!res?.error) router.push("/dashboard");
  };

  return (
    <Container maxWidth="sm">
      <Box component="form" onSubmit={handleSubmit} mt={10}>
        <TextField name="username" label="Username" fullWidth margin="normal" />
        <TextField
          name="password"
          type="password"
          label="Password"
          fullWidth
        />
        <Button type="submit" variant="contained" fullWidth sx={{ mt: 2 }}>
          Login
        </Button>
      </Box>
    </Container>
  );
}
