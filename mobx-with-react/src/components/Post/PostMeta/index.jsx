import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { observer } from "mobx-react";

import PostActions from "../PostActions";

const PostMeta = observer(props => {
  const {
    createDate,
    updateDate,
    postCode,
    user,
    title,
    coverColor,
    tagList,
    body,
    postLike,
    postView,
    coverImage,
    postPrev,
    postNext,
    pinPost,
    pinProject
  } = props.post;

  return (
    <PostMetaLayout>
      <PRO>
        <Link to={`/@${user.username}`}>
          <IMG
            src="data:image/png;base64,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"
            alt=""
          />
        </Link>

        <DIV className="info">
          <Link to={`/@${user.username}`} className="author">
            <h3>{user}</h3>
          </Link>
        </DIV>
      </PRO>
      <h1>제목제목 : {title}</h1>
      <p>{updateDate}</p>
      <hr />
      <PostActions
        canModify={props.canModify}
        post={props.post}
        onDelete={props.onDelete}
      />
    </PostMetaLayout>
  );
});

const IMG = styled.img`
  width: 100%;
  height: 100%;
`;

const DIV = styled.div`
  display: inline-block;
  padding-left: 0.5rem;
  margin-top: auto;
  margin-bottom: auto;
`;

const PRO = styled.div`
  display: grid;
  grid-template-columns: 15%;
  grid-template-areas: "img content";
`;

export default PostMeta;

const PostMetaLayout = styled.div``;
