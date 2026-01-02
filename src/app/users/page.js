"use client";
export const dynamic = "force-dynamic";

import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  Pagination,
  CircularProgress,
  Button,
} from "@mui/material";
import Link from "next/link";
import { useEffect, useState } from "react";

const LIMIT = 10;

export default function UsersPage() {
  const [users, setUsers] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);

  // UI text vs API query (IMPORTANT FIX)
  const [searchText, setSearchText] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const [loading, setLoading] = useState(false);

  const fetchUsers = async () => {
    setLoading(true);
    const skip = (page - 1) * LIMIT;

    const url = searchQuery
      ? `https://dummyjson.com/users/search?q=${searchQuery}`
      : `https://dummyjson.com/users?limit=${LIMIT}&skip=${skip}`;

    const res = await fetch(url);
    const data = await res.json();

    setUsers(data.users || []);
    setTotal(data.total || 0);
    setLoading(false);
  };

  useEffect(() => {
    fetchUsers();
  }, [page, searchQuery]);

  return (
    <Paper sx={{ p: 3 }}>
      <h2>Users List</h2>

      {/* Search */}
      <TextField
        label="Search users"
        fullWidth
        margin="normal"
        value={searchText}
        onChange={(e) => {
          setSearchText(e.target.value);
          setSearchQuery(e.target.value);
          setPage(1);
        }}
      />

      {loading ? (
        <CircularProgress />
      ) : (
        <>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Gender</TableCell>
                  <TableCell>Phone</TableCell>
                  <TableCell>Company</TableCell>
                  <TableCell align="center">Action</TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {users.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} align="center">
                      No users found
                    </TableCell>
                  </TableRow>
                ) : (
                  users.map((user) => (
                    <TableRow key={user.id} hover>
                      {/* Click name → fills search safely */}
                      <TableCell>
                        <span
                          style={{
                            cursor: "pointer",
                            color: "#1976d2",
                            textDecoration: "underline",
                          }}
                          onClick={() => {
                            setSearchText(
                              `${user.firstName} ${user.lastName}`
                            );
                            setSearchQuery(user.firstName); // API-safe
                            setPage(1);
                          }}
                        >
                          {user.firstName} {user.lastName}
                        </span>
                      </TableCell>

                      <TableCell>{user.email}</TableCell>
                      <TableCell>{user.gender}</TableCell>
                      <TableCell>{user.phone}</TableCell>
                      <TableCell>{user.company?.name}</TableCell>

                      {/* Navigation button */}
                      <TableCell align="center">
                        <Button
                          component={Link}
                          href={`/users/${user.id}`}
                          size="small"
                          variant="outlined"
                        >
                          View
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </TableContainer>

          {/* Pagination only when NOT searching */}
          {!searchQuery && (
            <Pagination
              sx={{ mt: 2 }}
              count={Math.ceil(total / LIMIT)}
              page={page}
              onChange={(e, value) => setPage(value)}
            />
          )}
        </>
      )}
    </Paper>
  );
}
