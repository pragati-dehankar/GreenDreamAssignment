import Link from "next/link";
import {
  Container,
  Card,
  CardContent,
  Typography,
  Button,
  Stack,
  Divider,
  Box,
} from "@mui/material";

export default function HomePage() {
  return (
    <Container maxWidth="sm" sx={{ mt: 10, mb: 6 }}>
      {/* Main Navigation Card */}
      <Card>
        <CardContent>
          <Typography variant="h4" textAlign="center" gutterBottom>
            Products Application
          </Typography>

          <Typography
            variant="body1"
            textAlign="center"
            color="text.secondary"
            mb={3}
          >
            Please click below links to use the app
          </Typography>

          <Stack spacing={2}>
            <Link href="/dashboard" style={{ textDecoration: "none" }}>
              <Button variant="contained" fullWidth>
                Dashboard
              </Button>
            </Link>

            <Link href="/users" style={{ textDecoration: "none" }}>
              <Button variant="outlined" fullWidth>
                Users
              </Button>
            </Link>

            <Link href="/products" style={{ textDecoration: "none" }}>
              <Button variant="outlined" fullWidth>
                Products
              </Button>
            </Link>

            <Link href="/login" style={{ textDecoration: "none" }}>
              <Button variant="text" fullWidth>
                Login
              </Button>
            </Link>
          </Stack>
        </CardContent>
      </Card>

      {/* Dummy Login Credentials Card */}
      <Card sx={{ mt: 4 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom textAlign="center">
            Dummy Login Credentials
          </Typography>

          <Divider sx={{ mb: 2 }} />

          <Box>

            <Typography fontWeight="bold">✅ User 1</Typography>
            <Typography variant="body2">
              Username: <b>michaelw</b>
            </Typography>
            <Typography variant="body2" mb={2}>
              Password: <b>michaelwpass</b>
            </Typography>
             <Typography fontWeight="bold">✅ User 2</Typography>
            <Typography variant="body2">
              Username: <b>emilys</b>
            </Typography>
            <Typography variant="body2" mb={2}>
              Password: <b>emilyspass</b>
            </Typography>

            <Typography fontWeight="bold">✅ User 3</Typography>
            <Typography variant="body2">
              Username: <b>jamesd</b>
            </Typography>
            <Typography variant="body2">
              Password: <b>jamesdpass</b>
            </Typography>
          </Box>
        </CardContent>
      </Card>
    </Container>
  );
}
