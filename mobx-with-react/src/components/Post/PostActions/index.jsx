import { Link } from "react-router-dom";
import React from "react";
import styled from "styled-components";

const PostActions = props => {
  const post = props.post;
  const handleDelete = () => props.onDelete(post.id);

  if (props.canModify) {
    return (
      <div>
        <Span>
          <Link
            // 수정하러가야함. 새로운 link 현재는 없음 TODO
            to={`/editor/${post.id}`} style={{ textDecoration: "none" }} >
            수정 
          </Link>
          &nbsp;
          <Link to={`/editor/${post.id}`} style={{ textDecoration: "none" }} >
             삭제
          </Link>
        </Span>
      </div>
    );
  }

  return <Span />;
};

const Span = styled.div`
  text-align: right; /*float?*/
`

export default PostActions;
