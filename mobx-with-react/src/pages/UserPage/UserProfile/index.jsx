import React, { Component } from "react";
import styled from "styled-components";
import { inject, observer } from "mobx-react";
import { Pencil } from "styled-icons/boxicons-regular/Pencil";
import { Github } from "styled-icons/boxicons-logos/Github";

require("dotenv").config();

export const PencilIncon = styled(Pencil)`
  width: 1rem;
  cursor: pointer;
  float: rigth;
  opacity: 50%;
`;

export const GithubIcon = styled(Github)`
  width: 2rem;
  cursor: pointer;
  float: left;
  padding-top: 0.5rem;
`;

@inject("userStore", "authStore")
@observer
class UserProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      profileimg: "",
      name: "",
      email: "",
      intro: ""
    };
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange = e => {
    const nextState = {};
    nextState[e.target.name] = e.target.value;
    this.setState(nextState);
  };

  render() {
    this.props.userStore.getUser();

    return (
      <UserProfileLayout>
        <Img>
          {this.props.userStore.user.picture ? (
            <ProfileImg src={this.props.userStore.user.picture}></ProfileImg>
          ) : (
            <DefaultImage src="https://image.flaticon.com/icons/svg/747/747376.svg"></DefaultImage>
          )}
        </Img>
        <UserInfo>
          <UpdateName>
            <UserName>Name: {this.props.userStore.user.name}</UserName>
          </UpdateName>
          <UpdateEmail>
            <UserEmail>Email: {this.props.userStore.user.email}</UserEmail>
          </UpdateEmail>
          <UpdateIntro>
            <UserIntro>Intro: {this.props.userStore.user.greeting}</UserIntro>
          </UpdateIntro>
        </UserInfo>
      </UserProfileLayout>
    );
  }
}

const Img = styled.div``;

const UserProfileLayout = styled.div`
  display: flex;
  height: 50%;

  @media (max-width: 1024px) {
  }

  @media (max-width: 768px) {
    display: grid;
    flex-direction: column;
    justify-content: center;
  }
`;

const ProfileImg = styled.img`
  display: flex;
  justify-content: center;
  text-align: center;
  width: 10rem;
  height: 10rem;
  object-fit: cover;
  border-radius: 50%;
`;

const DefaultImage = styled.img`
  display: flex;
  justify-content: center;
  text-align: center;
  width: 10rem;
  height: 10rem;
  object-fit: cover;
  border-radius: 50%;
`;

const UserInfo = styled.div`
  margin-left: 2rem;
  width: 100%-2rem;
  height: 100%-2rem;
`;

const UserName = styled.div`
  padding-top: 0.5rem;
  float: left;
`;

const UserEmail = styled.div`
  padding-top: 0.5rem;
  float: left;
`;

const UserIntro = styled.div`
  padding-top: 0.5rem;
  float: left;
`;
const UpdateName = styled.div`
  padding-top: 0.5rem;
  display: flex;
  align-items: center;
`;
const UpdateEmail = styled.div`
  padding-top: 0.5rem;
  display: flex;
  align-items: center;
`;
const UpdateIntro = styled.div`
  padding-top: 0.5rem;
  display: flex;
  align-items: center;
`;

const InputEmail = styled.textarea`
  padding-top: 0.5rem;
  resize: none;
  height: 1rem;
`;

const InputIntro = styled.textarea`
  padding-top: 0.5rem;
  resize: none;
  height: 1rem;
`;

export default UserProfile;
