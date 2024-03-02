import axios from "./Axios";

const Login = async (valueLogin: string, password: string) => {
  return axios.post(
    "/login",
    {
      valueLogin,
      password,
    },
    { withCredentials: true }
  );
};
export default Login;
