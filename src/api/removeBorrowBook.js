import axios from "axios";

function removeBorrowBook(borrowBookCollectionId,bookId) {
  return axios
    .delete(
      `${
        import.meta.env.VITE_SERVER_URL
      }/book/remove/borrowed-book/${borrowBookCollectionId}?bookId=${bookId}`
    )
    .then((res) => res.data)
    .catch((err) => {
      console.error(err);
      throw new Error(err);
    });
}

export default removeBorrowBook;
