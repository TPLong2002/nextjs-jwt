import axios from "./Axios";

const Logout = async () => {
  return axios.get("/logout", {
    withCredentials: true,
  });
};
export default Logout;
