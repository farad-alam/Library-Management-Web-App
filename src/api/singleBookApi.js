import axios from "axios";

function singleBookApi(book_id) {
  return axios
    .get(`${import.meta.env.VITE_SERVER_URL}/book/${book_id}`)
    .then((res) => res.data)
    .catch((err) => {
      console.error(err);
      throw new Error(err);
    });
}

export default singleBookApi;
