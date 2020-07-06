import React from "react";
import { Link, withRouter } from "react-router-dom";
import styled from "styled-components";
import { inject, observer } from "mobx-react";

import GLogin from "./GLogin";
import KLogin from "./KLogin";

@inject("authStore")
@withRouter
@observer
class AuthForm extends React.Component {
  componentWillUnmount() {
    this.props.authStore.reset();
  }

  handleSubmitForm = e => {
    e.preventDefault();
    this.props.authStore
      .login()
      .then(() => this.props.history.push("/"), window.location.reload());
  };

  render() {
    const { values } = this.props.authStore;
    return (
      <LineBox>
        <Container>Github 로그인</Container>
        <GLogin></GLogin>
        <KLogin></KLogin>
        <hr />
        <Link to={"/"} style={{ textDecoration: "none" }}>
          <Guest>로그인 하지 않고 둘러보기</Guest>
        </Link>
      </LineBox>
    );
  }
}

const Container = styled.div`
  line-height: 4rem;
  width: 100%;
  height: 4rem;
  background-color: #e6e6e6;
  display: inline-block;
  margin-top: 3rem;
  color: black;
  cursor: pointer;
`;

const LineBox = styled.div`
  padding-left: 7%;
  padding-right: 7%;
  margin-top: 25%;
  width: 50%;
  height: 27rem;
  display: inline-block;
  background-color: white;
  text-align: center;

  @media (max-width: 768px) {
    margin-top: 20% !important;
  }
  @media (max-width: 1024px) {
    margin-top: 5%;
  }
`;

const Guest = styled.div`
  float: right;
  margin-top: 3%;
  margin-right: 1rem;
  cursor: pointer;
`;

export default AuthForm;
