import React, { Component } from "react";
import { toJS } from "mobx";
import KakaoLogin from "react-kakao-login";
import styled from "styled-components";

import { inject, observer } from "mobx-react";
require("dotenv").config();

@inject("authStore")
@observer
class KLogin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: "",
      name: "",
      provider: ""
    };
  }
  // Kakao Login
  responseKakao = res => {
    this.setState({
      id: res.profile.id,
      name: res.profile.properties.nickname,
      provider: "kakao"
    });

    this.props.authStore.setAccessToken(res.response.access_token);
    this.props.authStore.setRefreshToken(res.response.refresh_token);
    this.props.authStore.setProvider("kakao");
    this.props.authStore
      .login()
      .then(() => {
        const jwt = this.props.authStore.token;
        this.props.authStore.setProfileimg(
          this.props.authStore.user_detail.picture
        );
        this.props.authStore.setName(this.props.authStore.user_detail.name);
        this.props.authStore.setEmail(this.props.authStore.user_detail.email);
        window.location.replace("http://i02a410.p.ssafy.io/");
      })
      .catch(err => {
        console.log("실패", err);
      });
  };

  // Login Fail
  responseFail = err => {
    console.error(err);
  };

  render() {
    return (
      <Container>
        <Kakao
          jsKey={process.env.REACT_APP_KAKAO}
          buttonText="Kakao 로그인"
          onSuccess={this.responseKakao}
          onFailure={this.responseFail}
          getProfile="true"
        />
      </Container>
    );
  }
}

export const Kakao = styled(KakaoLogin)`
  height: 100% !important;
  border: 0 !important;
  outline: 0 !important;
  box-shadow: none !important;
  color: black !important;
  background-color: #00ff0000 !important;
  cursor: pointer;
`;

const Container = styled.div`
  line-height: 4rem;
  width: 100%;
  height: 4rem;
  background-color: #ffff00;
  display: inline-block;
  margin-top: 3rem;
  cursor: pointer;
`;

export default KLogin;
