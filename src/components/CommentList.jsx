import React from "react";
import Comments from "./Comments";
 
const CommentList = ({ comments }) => {
  return comments.map((comment) => (
    <div>
      <Comments key={comment.id} comment={comment} />
      <div className="ml-4 border border-l-black dark:border-gray-600">
        <CommentList comments={comment.replies} />
      </div>
    </div>
  ));
};

export default CommentList;
