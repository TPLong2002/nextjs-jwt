import axios from "axios";
import { cache } from "react";
// interface Data {
//   id: number;
//   username: string;
//   email: string;
//   address: string;
//   gender: number;
//   phone: number;
//   Group: {
//     id: number;
//     name: string;
//     description: string;
//   };
// }
const GetUser = cache(async (page: number, limit: number) => {
  const res = await axios.get(
    `https://nodejs-jwt-x0mb.onrender.com/api/v1/user/show?page=${page}&limit=${limit}`
  );
  return res;
});

export default GetUser;
