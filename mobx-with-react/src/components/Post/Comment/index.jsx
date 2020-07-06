import { Link } from "react-router-dom";
import React from "react";

const Comment = props => {
  const comment = props.comment;
  const show =
    props.currentUser && props.currentUser.username === comment.author.username;
  return (
    <div>
      <div className="card-block">
        <p className="card-text">{comment.body}</p>
      </div>
      <div className="card-footer">
        <Link to={`/@${comment.author.username}`} className="comment-author">
          <img
            src={comment.author.image}
            className="comment-author-img"
            alt=""
          />
        </Link>
        &nbsp;
        <Link to={`/@${comment.author.username}`} className="comment-author">
          {comment.author.username}
        </Link>
        <span className="date-posted">
          <p>comment.created_at</p>
        </span>
      </div>
    </div>
  );
};

export default Comment;
