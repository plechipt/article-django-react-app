import { useLazyQuery } from "@apollo/react-hooks";
import React, { useEffect, useState } from "react";
import { Form } from "semantic-ui-react";
import { POST_FILTER_QUERY } from "../../Api/post";
import "../Posts.css";
import MapPosts from "./MapPosts";

const Posts = () => {
  const [searchInput, setSearchInput] = useState("");
  const [filterPost, { data: filteredData }] = useLazyQuery(POST_FILTER_QUERY, {
    fetchPolicy: "cache-and-network",
  });

  // Filter posts by user search bar input
  useEffect(() => {
    filterPost({ variables: { title: searchInput } });
  }, [searchInput, filterPost]);

  return (
    <div>
      <div className="mb-5 search-bar-container">
        <Form>
          <Form.Field>
            <input
              onChange={(event) => setSearchInput(event.target.value)}
              value={searchInput}
              placeholder="Search..."
              maxLength="100"
            />
          </Form.Field>
        </Form>
      </div>
      {filteredData ? (
        <>
          {/*If user has fillen search bar -> shows filteredPosts*/}
          <MapPosts filteredData={filteredData} searchInput={searchInput} />
        </>
      ) : null}
    </div>
  );
};

export default Posts;
