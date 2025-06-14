import axios from "axios";

function addBookApi(bookData) {
  return axios
    .post(`${import.meta.env.VITE_SERVER_URL}/book/add-book`,bookData)
    .then((res) => res.data)
    .catch((err) => {
      console.error(err);
      throw new Error(err);
    });
}

export default addBookApi;
