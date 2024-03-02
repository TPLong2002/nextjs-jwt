import axios from "@/services/Axios";
// import { revalidateTag } from "next/cache";
export const getGroup = async () => {
  const res = await axios.get(`/group/groups`, {
    withCredentials: true,
  });
  return res;
};
