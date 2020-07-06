import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const PostCard = ({ post }) => {
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
  } = post;

  return (
    <CardMainLayOut>
      <OutL>
        <Link to={"/post/" + postCode} style={{ textDecoration: "none" }}>
          {coverImage ? (
            <CardImage src={coverImage}></CardImage>
          ) : (
            <DefaultImage color={coverColor}></DefaultImage>
          )}
        </Link>
      </OutL>
      <OutT>
        <CardTitle>{title}</CardTitle>
        <Link to={"/mypage/" + user.msrl} style={{ textDecoration: "none" }}>
          {user.picture ? (
            <ProfileImage src={user.picture}></ProfileImage>
          ) : (
            <DefaultProfile color={coverColor}></DefaultProfile>
          )}
        </Link>
      </OutT>
    </CardMainLayOut>
  );
};
const ProfileImage = styled.img`
  width: 3rem;
  height: 3rem;
  object-fit: cover;
  border-radius: 50%;
  cursor: pointer;
  float: right;
  z-index: 2;
`;

const DefaultProfile = styled.div`
  width: 3rem;
  height: 3rem;
  object-fit: cover;
  border-radius: 50%;
  cursor: pointer;
  float: right;
  margin-right: 5%;
  z-index: 2;
  background-color: ${props => props.color};
`;

const CardMainLayOut = styled.div`
  color: #fff;
  background-color: #f0f0f0;
  margin: 10px;
  width: auto;
  max-width: 100%;
`;

const OutL = styled.div`
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
  /* padding: 0.1rem; */
  position: relative;
  width: 100%;
  height: 0;
  overflow: hidden;
  padding-bottom: 56.26%;
  top: 0;
  left: 0;
`;

const CardImage = styled.img`
  position: absolute;
  object-fit: cover;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  :hover {
    filter: brightness(70%);
  }
`;

const DefaultImage = styled.div`
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: ${props => props.color};
  z-index: 1;
  :hover {
    filter: brightness(70%);
  }
`;

const CardTitle = styled.h2`
  color: black;
  z-index: 2;
  position: relative;
  font-family: Inconsolas;
  font-size: 20px;
  float: left;
`;

const OutT = styled.div`
  padding-left: 5%;
  padding-right: 5%;
  padding-top: 3%;
  padding-bottom: 3%;
  font-family: Inconsolata;
`;

export default PostCard;
