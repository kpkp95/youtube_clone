import React from "react";
import { COMMENT_DATA } from "../utils/constant";
import CommentList from "./CommentList";
const CommentsContainer = () => {
  return (
    <div className="m-5 mt-0 pt-0 p-2">
      <h1 className="text-xl font-bold">Comments: </h1>
      <CommentList comments={COMMENT_DATA} />
    </div>
  );
};

export default CommentsContainer;
