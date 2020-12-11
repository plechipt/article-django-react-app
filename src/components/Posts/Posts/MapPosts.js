import React, { useState } from "react";
import CustomPagination from "./Pagination";
import Post from "./Post";

// Map all filtered posts
const MapPosts = ({ filteredData, searchInput }) => {
  const { filterPost: filteredPosts } = filteredData;

  // Define pages
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(5);

  // Get current posts
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost);

  // Change page
  const handlePaginationChange = (e, value) => {
    setCurrentPage(value.activePage);
  };

  return (
    <>
      {currentPosts.map(({ user: { username }, title, posted, id }) => {
        return (
          <Post
            key={id}
            id={id}
            username={username}
            title={title}
            posted={posted}
          />
        );
      })}
      {searchInput === "" ? (
        <CustomPagination
          postsPerPage={postsPerPage}
          totalPosts={filteredPosts.length}
          handlePaginationChange={handlePaginationChange}
        />
      ) : null}
    </>
  );
};

export default MapPosts;
