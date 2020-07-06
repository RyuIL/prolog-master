import React, { Component } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { inject, observer } from "mobx-react";
import LoginButton from "../LoginButton";
import jwtDecode from "jwt-decode";

@inject("userStore", "authStore")
@observer
class UserButton extends Component {
  render() {
    const Logout = () => {
      this.props.authStore.logout();
    };

    let userid = 0;
    let portfolioLink = `/portfolio/${userid}`;
    let mypageLink = `/mypage/${userid}`;
    const check = this.props.authStore.token;

    if (check) {
      userid = jwtDecode(check).sub;
      portfolioLink = `/portfolio/${userid}`;
      mypageLink = `/mypage/${userid}`;
    }
    return (
      <Img>
        {check ? (
          <>
            <ProfileImg src={this.props.authStore.user_info}></ProfileImg>
            <SelectMenus className="menubar">
              <Link to={"/write"} style={{ textDecoration: "none" }}>
                <SelectMenu>Post</SelectMenu>
              </Link>
              <Link to={portfolioLink} style={{ textDecoration: "none" }}>
                <SelectMenu>Portfolio</SelectMenu>
              </Link>
              <Link
                to={
                  "/mypage/" +
                  jwtDecode(window.sessionStorage.getItem("jwt")).sub
                }
                style={{ textDecoration: "none" }}
              >
                <SelectMenu>MyPage</SelectMenu>
              </Link>
              <SelectMenu onClick={Logout}>Logout</SelectMenu>
            </SelectMenus>
          </>
        ) : (
          <LINKS to={"/login"} style={{ textDecoration: "none" }}>
            <LoginButton></LoginButton>
          </LINKS>
        )}
      </Img>
    );
  }
}
const SelectMenus = styled.div`
  display: none;
  position: absolute;
  background-color: #f1f1f1;
  min-width: 90px;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  z-index: 3;
  &:hover .menubar {
    display: block;
  }
  margin-right: 3rem;
  margin-top: 3rem;
  @media (max-width: 768px) {
    left: -3rem;
  }

  @media (min-width: 768px) and (max-width: 1024px) {
    left: -3rem;
  }
`;
const SelectMenu = styled.div`
  color: black;
  padding: 10px 12px;
  text-decoration: none;
  display: block;
  text-align: left;

  cursor: pointer;
  :hover {
    background-color: #b0b0b0;
  }
`;
const Img = styled.div`
  position: relative;
  display: inline-block;
  grid-area: test;

  padding-top: 1rem;
  margin-left: 85%;
  &:hover .menubar {
    display: block;
  }
  @media (max-width: 768px) {
    padding-left: 0;
  }

  @media (min-width: 768px) and (max-width: 1024px) {
    padding-left: 10%;
  }
`;

const ProfileImg = styled.img`
  width: 3rem;
  height: 3rem;
  object-fit: cover;
  border-radius: 50%;
  cursor: pointer;
  float: right;
  margin-right: 5%;
  z-index: 2;
  &:hover .menubar {
    display: block;
  }
  @media (max-width: 768px) {
    margin-right: 10%;
  }

  @media (min-width: 768px) and (max-width: 1024px) {
    margin-left: -10rem;
  }
`;

export const LINKS = styled(Link)``;

export default UserButton;
