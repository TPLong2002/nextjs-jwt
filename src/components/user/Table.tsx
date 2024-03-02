"use client";

import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import CreateModal from "./createUser";
import EditUser from "./editUser";
import DeleteUser from "./deleteUser";
import Logout from "@/services/Logout";

import { useSearchParams } from "next/navigation";

import { useAppSelector, useAppDispatch } from "../../lib/hooks/reduxHooks";
import { logout } from "../../lib/features/auth/authSlice";
interface Data {
  id: number;
  username: string;
  email: string;
  address: string;
  gender: number;
  phone: number;
  Group: {
    id: number;
    name: string;
    description: string;
  };
}

export default function BasicTable({ data }: { data: Data[] }) {
  // dùng để lấy query params phân trang
  // const searchParams = useSearchParams();
  // console.log(searchParams.get("page"));

  const dispatch = useAppDispatch();

  const [open, setOpen] = React.useState(false);
  const [isUserUpdate, setIsUserUpdate] = React.useState(0);
  const [openDelete, setOpenDelete] = React.useState(false);
  const [isUserDelete, setIsUserDelete] = React.useState(0);
  const rows: Data[] = data;
  const handleDel = async (id: number) => {
    setOpenDelete(true);
    setIsUserDelete(id);
  };
  const handleEdit = (id: number) => {
    setIsUserUpdate(id);
    setOpen(true);
  };
  // const handleLogout = () => {
  //   localStorage.removeItem("token");
  //   Logout().then((res) => {
  //     dispatch(logout());
  //   });
  // };
  return (
    <>
      <div className="text-right">
        {/* <button onClick={handleLogout}>Logout</button>; */}
        <CreateModal />
        {open && <EditUser id={isUserUpdate} open={open} setOpen={setOpen} />}
        <DeleteUser
          id={isUserDelete}
          open={openDelete}
          setOpen={setOpenDelete}
        />
      </div>

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>username</TableCell>
              <TableCell align="right">email</TableCell>
              <TableCell align="right">address</TableCell>
              <TableCell align="right">gender</TableCell>
              <TableCell align="right">phone</TableCell>
              <TableCell align="right">Group</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows?.map((row) => (
              <TableRow
                key={row.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.username}
                </TableCell>
                <TableCell align="right">{row.email}</TableCell>
                <TableCell align="right">{row.address}</TableCell>
                <TableCell align="right">{row.gender}</TableCell>
                <TableCell align="right">{row.phone}</TableCell>
                <TableCell align="right">{row.Group?.description}</TableCell>
                <TableCell align="right">
                  <div>
                    <IconButton
                      aria-label="delete"
                      size="large"
                      onClick={() => handleDel(row.id)}
                    >
                      <DeleteIcon fontSize="inherit" />
                    </IconButton>
                    <IconButton
                      aria-label="delete"
                      size="small"
                      onClick={() => handleEdit(row.id)}
                    >
                      Edit
                    </IconButton>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
