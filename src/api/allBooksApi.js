import axios from "axios";


function allBooksApi(user) {
  return axios
    .get(`${import.meta.env.VITE_SERVER_URL}/books/?email=${user.email}`, {
      headers: {
        Authorization: `Bearer ${user.accessToken}`,
      },
    })
    .then((res) => res.data)
    .catch((err) => {
      console.error(err);
      throw new Error(err);
    });
}

export default allBooksApi