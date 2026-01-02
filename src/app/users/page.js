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
import { useUsersStore } from "@/store/usersStore";

const LIMIT = 10;

export default function UsersPage() {
  const {
    users,
    total,
    page,
    loading,
    fetchUsers,
  } = useUsersStore();

  // UI-only state (allowed)
  const [searchText, setSearchText] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetchUsers({ page, search: searchQuery });
  }, [page, searchQuery]);

  return (
    <Paper sx={{ p: 3 }}>
      <h2>Users List</h2>

      <TextField
        label="Search users"
        fullWidth
        margin="normal"
        value={searchText}
        onChange={(e) => {
          setSearchText(e.target.value);
          setSearchQuery(e.target.value);
          fetchUsers({ page: 1, search: e.target.value });
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
                            setSearchQuery(user.firstName);
                            fetchUsers({ page: 1, search: user.firstName });
                          }}
                        >
                          {user.firstName} {user.lastName}
                        </span>
                      </TableCell>

                      <TableCell>{user.email}</TableCell>
                      <TableCell>{user.gender}</TableCell>
                      <TableCell>{user.phone}</TableCell>
                      <TableCell>{user.company?.name}</TableCell>

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

          {!searchQuery && (
            <Pagination
              sx={{ mt: 2 }}
              count={Math.ceil(total / LIMIT)}
              page={page}
              onChange={(e, value) =>
                fetchUsers({ page: value, search: "" })
              }
            />
          )}
        </>
      )}
    </Paper>
  );
}
