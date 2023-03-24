
import React, { useState, useEffect } from 'react';
import Pagination from './components/Pagination';
import Posts from './components/Posts';

import axios from 'axios';

function App() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [postPerPage] = useState(10)

  useEffect(()=> {
    const fetchPosts = async () => {
      setLoading(true)
      const res = await axios.get("https://jsonplaceholder.typicode.com/posts");
      setPosts(res.data);
      setLoading(false);
    }
    fetchPosts();
  },[]);

  // console.log(posts)

  const indexOfLastPost = currentPage * postPerPage;
  const indexOfFirstPost = indexOfLastPost - postPerPage;
  const currentPost = posts.slice(indexOfFirstPost, indexOfLastPost)

  const paginate = pageNumber => setCurrentPage(pageNumber)

  return (
    <div className="Container mt-5">
      <h1 className='text-primary mb-4 p-4'>React Pagination</h1>
      <Posts loading={loading} posts={currentPost} />
      <Pagination totalPosts={posts.length} postPerPage={postPerPage} paginate={paginate} />
      
    </div>
  );
}

export default App
