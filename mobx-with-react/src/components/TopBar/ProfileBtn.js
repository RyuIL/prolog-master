import React from "react";
import styled from "styled-components";
import { Profile } from "styled-icons/icomoon/Profile";
import { Link } from "react-router-dom";

export const ProfileIcon = styled(Profile)`
  width: 40px;
  float: right;
  cursor: pointer;
  padding-top: 0.7rem;
  padding-right: 1rem;
  color: black;
  :hover {
    opacity: 0.5;
  }
`;

const ProfileBtn = () => {
  return (
    <Link to={"/mypage"} style={{ textDecoration: "none" }}>
      <ProfileIcon></ProfileIcon>
    </Link>
  );
};

export default ProfileBtn;
