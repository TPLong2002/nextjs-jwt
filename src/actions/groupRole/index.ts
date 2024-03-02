import axios from "@/services/Axios";
export const updateGroupRole = async (data: any) => {
  const res = await axios.post(`/grouprole/grouproles`, data, {
    withCredentials: true,
  });
  return res;
};
