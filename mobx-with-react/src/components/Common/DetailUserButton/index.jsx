import React, { Component } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { inject, observer } from "mobx-react";

@inject("userStore", "authStore")
@observer
class DetailUserButton extends Component {
  render() {
    const check = this.props.authStore.token;
    const Logout = () => {
      console.log("logout 발생");
      this.props.authStore.logout();
    };
    return (
      <Img>
        {check ? (
          <>
            <ProfileImg src={this.props.authStore.user_info}></ProfileImg>
            <SelectMenus className="menubar">
              <Link to={"/write"} style={{ textDecoration: "none" }}>
                <SelectMenu>Post</SelectMenu>
              </Link>
              <Link to={"/portfolio"} style={{ textDecoration: "none" }}>
                <SelectMenu>Portfolio</SelectMenu>
              </Link>
              <Link to={"/mypage"} style={{ textDecoration: "none" }}>
                <SelectMenu>MyPage</SelectMenu>
              </Link>
              <SelectMenu onClick={Logout}>Logout</SelectMenu>
            </SelectMenus>
          </>
        ) : (
          <LINKS to={"/login"} style={{ textDecoration: "none" }}>
            <LoginButton>Login</LoginButton>
          </LINKS>
        )}
      </Img>
    );
  }
}

export const LINKS = styled(Link)``;

const LoginButton = styled.div`
  border-style: solid;
  border-width: 1.5px;
  width: 5rem;
  height: 2rem;
  float: right;
  margin-right: 2rem;
  border-color: white;
  margin-top: 0.5rem;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const SelectMenus = styled.div`
  display: none;
  position: relative;
  background-color: #f1f1f1;
  min-width: 100px;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  z-index: 1;
  &:hover .menubar {
    display: block;
  }
  margin-right: 50rem;
  margin-top: 3.2rem;
  @media (max-width: 768px) {
    right: 3rem;
  }

  @media (min-width: 768px) and (max-width: 1024px) {
    left: -150px;
    top: 0%;
  }
`;
const SelectMenu = styled.a`
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
  margin-right: 3rem;
  z-index: 2;
  &:hover .menubar {
    display: block;
  }
  @media (max-width: 768px) {
    margin-right: 10%;
  }

  @media (min-width: 768px) and (max-width: 1024px) {
    margin-right: 1rem;
  }
`;

export default DetailUserButton;
