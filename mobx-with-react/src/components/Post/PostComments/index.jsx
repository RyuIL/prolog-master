import React from "react";
import { Link } from "react-router-dom";

//Components
import CommentInput from "../CommentInput";
import CommentList from "../CommentList";

const PostComments = props => {
  if (props.currentUser) {
    return (
      <div>
        <CommentInput
          postId={props.postId}
          currentUser={props.currentUser}
        ></CommentInput>
        <CommentList
          postId={props.postId}
          comments={props.comments}
          currentUser={props.currentUser}
          onDelete={props.onDelete}
        ></CommentList>
      </div>
    );
  } else {
    return (
      <div>
        <p>
          <Link to="/login">Sign in</Link>
          &nbsp;or&nbsp;
          <Link to="/register">sign up</Link>
          &nbsp;to add comments on this post.
        </p>
        <CommentList
            comments={props.comments}
          postId={props.postId}
          comments={props.comments}
          currentUser={props.currentUser}
          onDelete={props.onDelete}
        ></CommentList>
      </div>
    );
  }
};

export default PostComments;
