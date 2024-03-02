import axios from "./Axios";

const Register = async (info: any) => {
  return axios.post("/register", info);
};
export default Register;
