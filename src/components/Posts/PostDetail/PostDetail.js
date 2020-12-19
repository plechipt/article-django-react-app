import { useLazyQuery } from "@apollo/react-hooks";
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { POST_FIND_QUERY } from "../../Api/post/post";
import SubPostDetail from "./SubPostDetail";

const PostDetail = () => {
  const { id } = useParams();

  const [findPost, { data: detailData }] = useLazyQuery(POST_FIND_QUERY);

  // If id is number -> fetch post
  useEffect(() => {
    const id_is_number = !isNaN(id);

    if (id_is_number === true) {
      findPost({ variables: { id: id } });
    }
  }, [id, findPost]);

  return (
    <div className="post-detail">
      {detailData && detailData.findPost.title ? (
        <SubPostDetail id={id} detailData={detailData} />
      ) : null}
    </div>
  );
};

export default PostDetail;
