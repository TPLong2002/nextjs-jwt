import React, { useEffect, useState } from "react";
import { Button, Modal } from "antd";
import { Input, Select } from "antd";
import { editUser, getUser } from "@/actions/user";
import { getGroup } from "@/actions/group";

interface IProps {
  id: number;
  open: boolean;
  setOpen: (open: boolean) => void;
}

const EditUser = (props: any) => {
  const { open, setOpen, id } = props;
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [groups, setGroups] = useState([]);
  const [group, setGroup] = useState({});
  const [userIf, setUserIf] = useState({
    username: "",
    email: "",
    address: "",
    password: "",
    gender: "",
    phone: "",
    groupId: "",
  });
  useEffect(() => {
    getUser(id).then((res) => {
      setUserIf(res.data);
    });
    getGroup().then((res) => {
      setGroups(res.data);
    });
  }, [id]);
  const handleOk = async () => {
    const res = await editUser(userIf);
    if (res.status === 200) {
      console.log(res.message);
    }
    setConfirmLoading(true);
    setTimeout(() => {
      setOpen(false);
      setConfirmLoading(false);
    }, 0);
  };

  const handleCancel = () => {
    console.log("Clicked cancel button");
    setOpen(false);
  };
  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setUserIf({ ...userIf, [name]: value });
  };
  const handleChangeSelect = (value: any) => {
    setUserIf({ ...userIf, groupId: value });
  };

  return (
    <>
      <Modal
        title="Title"
        open={open}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
      >
        <div className="flex flex-col space-y-1">
          <Input
            name="username"
            placeholder="Username"
            value={userIf.username}
            onChange={handleChange}
          />
          <Input
            name="email"
            placeholder="Email"
            value={userIf.email}
            onChange={handleChange}
          />
          <Input
            name="phone"
            placeholder="Phone"
            value={userIf.phone}
            onChange={handleChange}
          />
          <Input
            name="password"
            placeholder="Password"
            value={userIf.password}
            onChange={handleChange}
          />
          <Input
            name="address"
            placeholder="Address"
            value={userIf.address}
            onChange={handleChange}
          />
          <Input
            name="gender"
            placeholder="Gender"
            value={userIf.gender}
            onChange={handleChange}
          />
          <Input
            name="groupId"
            placeholder="GroupID"
            value={userIf.groupId}
            onChange={handleChange}
          />
          <Select
            value={userIf.groupId}
            style={{ width: 120 }}
            onChange={handleChangeSelect}
            options={groups.map((group: any) => {
              return { value: group.id, label: group.description };
            })}
          />
        </div>
      </Modal>
    </>
  );
};

export default EditUser;
