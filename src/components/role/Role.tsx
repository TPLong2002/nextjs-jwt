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
import { Select } from "antd";

import AddRole from "./AddRole";
import { getRoles, delRoles, getRolesByGroup } from "@/actions/role";
import { getGroup } from "@/actions/group";
import { toast } from "react-toastify";
import { Checkbox } from "@mui/material";
import { updateGroupRole } from "@/actions/groupRole";

export default function BasicTable() {
  const [groups, setGroups] = React.useState([]);
  const [group, setGroup] = React.useState<number>();
  const [roles, setRoles] = React.useState<any>([
    { id: 0, url: "", description: "", checked: true },
    { id: 1, url: "", description: "", checked: true },
  ]);
  // const [rolesGroup, setRolesGroup] = React.useState<any>([
  //   { id: 1, url: "", description: "" },
  //   { id: 3, url: "", description: "" },
  // ]);
  const fetch = async () => {
    const [groups] = await Promise.all([getGroup()]);
    setGroups(groups.data);
    // setRoles(role.data.map((role: any) => ({ ...role, checked: false })));
    rolesGroupCheck(groups.data[0].id);
  };
  const rolesGroupCheck = async (value: number) => {
    const [roles, rolesGroup] = await Promise.all([
      getRoles(),
      getRolesByGroup(value),
    ]);
    const newRoles = [...roles.data];
    newRoles.map((role: any, index: number) => {
      const check = rolesGroup.data.some(
        (roleGroup: any) => roleGroup.id === role.id
      );
      if (check) {
        newRoles[index] = { ...role, checked: true };
      } else {
        newRoles[index] = { ...role, checked: false };
      }
    });
    setGroup(value);
    setRoles(newRoles);
  };

  React.useEffect(() => {
    fetch();
  }, []);
  const handleChange = async (value: any) => {
    console.log(value);
    await rolesGroupCheck(value);
  };
  const handleDelete = async (id: number) => {
    const res = (await delRoles(id)) as any;
    if (res) {
      toast.success(res.message);
      fetch();
    }
  };
  const onChange = (e: any, index: number) => {
    console.log(e.target.value);
    const newRoles = [...roles];
    newRoles[index] = { ...roles[index], checked: e.target.checked };
    updateGroupRole({
      groupId: group,
      roles: newRoles[index],
    });
    setRoles(newRoles);
  };
  return (
    <div className="container mx-auto pt-5">
      <div className="py-4 flex flex-row space-x-1">
        <Select
          value={group}
          style={{ width: 120 }}
          onChange={handleChange}
          options={groups.map((group: any) => ({
            value: group.id,
            label: group.name,
          }))}
        />
        <AddRole rerender={fetch} />
      </div>
      <div>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell></TableCell>
                <TableCell>URL</TableCell>
                <TableCell align="right">Description</TableCell>
                <TableCell align="right">actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {roles.map((role: any, index: number) => {
                return (
                  <TableRow
                    key={index}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell>
                      <Checkbox
                        value={role.id}
                        checked={role.checked}
                        onChange={(e) => onChange(e, index)}
                      />
                    </TableCell>

                    <TableCell component="th" scope="row">
                      {role.url}
                    </TableCell>
                    <TableCell align="right">{role.description}</TableCell>
                    <TableCell align="right">
                      <div>
                        <IconButton
                          onClick={() => handleDelete(role.id)}
                          aria-label="delete"
                          size="large"
                        >
                          <DeleteIcon fontSize="inherit" />
                        </IconButton>
                        <IconButton aria-label="delete" size="small">
                          Edit
                        </IconButton>
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
}
