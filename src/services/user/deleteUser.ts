import axios from "axios";
function DeleteUser(id: number) {
  return axios.delete(
    `https://nodejs-jwt-x0mb.onrender.com/api/v1/user/delete`,
    {
      data: { id },
    }
  );
}

export default DeleteUser;
