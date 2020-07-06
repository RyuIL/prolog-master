import React, { Component } from "react";
import axios from "axios";
import ReactDOM from "react-dom";
import styled from "styled-components";
import GitHubLogin from "react-github-login2";
import agent from "../../../agent";

import { inject, observer } from "mobx-react";

require("dotenv").config();

@inject("authStore")
@observer
class GHLogin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: "",
      name: "",
      provider: ""
    };
  }

  render() {
    const onSuccess = res => {
      //console.log(res);
    };
    const onFailure = res => {
      //console.log("err " + res);
    };
    return (
      <Container>
        <Github
          buttonText="Github 로그인"
          onSuccess={onSuccess}
          onFailure={onFailure}
          onClick='disabled'
        />
      </Container>
    );
  }
}

export const Github = styled(GitHubLogin)`
  height: 100% !important;
  color: black !important;
  border: 0;
  outline: 0;
  box-shadow: none !important;
  background-color: #00ff0000 !important;
`;

const Container = styled.div`
  line-height: 4rem;
  width: 100%;
  height: 4rem;
  background-color: #e6e6e6;
  display: inline-block;
  margin-top: 3rem;
  color: white;
  cursor: pointer;
`;

export default GHLogin;
