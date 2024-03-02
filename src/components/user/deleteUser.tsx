import React, { useState } from "react";
import { deleteUser } from "@/actions/user";

import { Button, Modal } from "antd";
interface IProps {
  id: number;
  open: boolean;
  setOpen: (open: boolean) => void;
}
const App = (props: any) => {
  const { open, setOpen, id } = props;
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [modalText, setModalText] = useState("Content of the modal");
  const handleOk = () => {
    deleteUser(id).then((res) => {
      setModalText("The modal will be closed after two seconds");
      setConfirmLoading(true);
      setTimeout(() => {
        setOpen(false);
        setConfirmLoading(false);
      }, 100);
    });
  };

  const handleCancel = () => {
    console.log("Clicked cancel button");
    setOpen(false);
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
        <p>{modalText}</p>
      </Modal>
    </>
  );
};

export default App;
