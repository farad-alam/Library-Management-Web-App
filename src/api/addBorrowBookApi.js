import axios from "axios";

function addBorrowBookApi(borrowBookData) {
  return axios
    .post(
      `${import.meta.env.VITE_SERVER_URL}/book/add/borrowed-book`,
      borrowBookData
    )
    .then((res) => res.data)
    .catch((err) => {
      console.error(err);
      throw new Error(err);
    });
}

export default addBorrowBookApi;
