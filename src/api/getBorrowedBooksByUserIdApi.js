import axios from "axios";

function getBorrowedBooksByUserIdApi(userId) {
  return axios
    .get(
      `${import.meta.env.VITE_SERVER_URL}/book/borrowed-books/${userId}`,
      borrowBookData
    )
    .then((res) => res.data)
    .catch((err) => {
      console.error(err);
      throw new Error(err);
    });
}

export default getBorrowedBooksByUserIdApi;
