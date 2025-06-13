import axios from "axios";

function updateBookApi(book_id, updates) {
  return axios
    .put(`${import.meta.env.VITE_SERVER_URL}/update/${book_id}`, updates)
    .then((res) => res.data)
    .catch((err) => {
      console.error(err);
      throw new Error(err);
    });
}

export default updateBookApi;
