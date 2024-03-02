"use client";
import Table from "./Table";
import axios from "@/services/Axios";
import { useState, useEffect, use } from "react";
const UserPage = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    axios.get("/user/show").then((res) => {
      setData(res.data);
    });
  }, []);
  return (
    <>
      <Table data={data} />
    </>
  );
};
export default UserPage;
