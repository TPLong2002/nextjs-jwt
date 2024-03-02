"use server";
import axios from "axios";
import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";

export const createUser = async (data: any) => {
  const res = await axios.post(
    `https://nodejs-jwt-x0mb.onrender.com/api/v1/user/add`,
    data,
    {
      headers: {
        "x-access-token": `${cookies().get("token")?.value}`,
      },
    }
  );
  revalidateTag("collection");
  return res.data;
};

export const deleteUser = async (id: any) => {
  const res = await axios.delete(
    `https://nodejs-jwt-x0mb.onrender.com/api/v1/user/delete`,
    {
      data: { id },
      withCredentials: true,
      headers: {
        "x-access-token": `${cookies().get("token")?.value}`,
      },
    }
  );
  revalidateTag("collection");
};
export const editUser = async (user: any) => {
  const res = await axios.post(
    `https://nodejs-jwt-x0mb.onrender.com/api/v1/user/update`,
    user,
    {
      withCredentials: true,
      headers: {
        "x-access-token": `${cookies().get("token")?.value}`,
      },
    }
  );
  revalidateTag("collection");
  return res.data;
};
export const getUser = async (id: number) => {
  const user = await axios.get(
    `https://nodejs-jwt-x0mb.onrender.com/api/v1/user/id?id=${id}`,
    {
      withCredentials: true,
      headers: {
        "x-access-token": `${cookies().get("token")?.value}`,
      },
    }
  );

  return user.data;
};
