import React, { useState , useEffect } from "react";
import BookList from "./BookList.js";
import Pagination from "./components/Pagination";
// import { Pagination } from "antd";
// import "antd/dist/antd.css";
import { getBooks } from "../../services/api/books.js";

function Books() {
  const [bookList, setBookList] = useState([]);
  const [loading, setStatus] = useState(true);
  const [error, catchError] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(10);


  useEffect(() => {

    getBooks()
        .then((response) => {
            setBookList(response.data);
            setStatus(false);
        })
        .catch((reject) => {
          catchError(reject);
          throw new Error(reject)
        });

  }, []);

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = bookList.slice(indexOfFirstPost, indexOfLastPost);

  const paginate = (pageNumber) => {
      setCurrentPage(pageNumber)
  }


  return (
    <div className="books-page-conteiner">
      {
        loading ? 
            <div>
            <h1>Loading...</h1>
            </div>
        :
            <>
                <BookList 
                    bookList={currentPosts} 
                    loading={loading} 
                    error={error} 
                />
                <Pagination 
                    postsPerPage={postsPerPage} 
                    totalPosts={bookList.length} 
                    paginate={paginate}
                />
            </>
      }
    </div>
  );
}

export default Books;


{/* <BookList 
    bookList={currentPosts} 
    loading={loading} 
    error={error} 
/>
<Pagination 
    postsPerPage={postsPerPage} 
    totalPosts={bookList.length} 
    paginate={paginate}
/>
{loading && (
    <div>
        <h1>Loading...</h1>
    </div>
)} */}