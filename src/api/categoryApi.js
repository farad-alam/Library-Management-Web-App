import axios from "axios";

function categoryApi() {
  return axios
    .get(`${import.meta.env.VITE_SERVER_URL}/categories`)
    .then((res) => res.data)
    .catch((err) => {
      console.error(err);
      throw new Error(err);
    });
}

export default categoryApi;
