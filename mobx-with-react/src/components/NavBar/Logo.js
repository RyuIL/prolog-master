import React, { Component } from "react";
import styled from "styled-components";
import { withRouter } from "react-router-dom";

@withRouter
class Logo extends Component {
  render() {
    const LogoClick = () => {
      this.props.history.push("/");
      window.location.reload();
    };
    return <LogoLayout onClick={LogoClick}>Prolog;</LogoLayout>;
  }
}

const LogoLayout = styled.div`
  padding: 0 2rem;
  margin-top: 1.75rem;
  margin-bottom: 1.75rem;
  font-size: 2rem;
  line-height: 2rem;
  font-family: Inconsolata;
  color: white;
  display: block;
  position: relative;
  cursor: pointer;
`;

export default Logo;
