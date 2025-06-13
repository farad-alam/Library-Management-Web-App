import axios from "axios";


function allBooksApi() {
    return axios.get(`${import.meta.env.VITE_SERVER_URL}/books/`)
    .then(res => res.data )
    .catch(err =>{
        console.error(err)
        throw new Error (err)
    })
  
}

export default allBooksApi