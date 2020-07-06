import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const LoginButton = () => {
    return (
        <LoginButtonLayout>
            Login
        </LoginButtonLayout>
    );
}

const LoginButtonLayout = styled.div`
  border-style: solid;
  border-width: 1.5px;
  width: 5rem;
  height: 2rem;
  float: right;
  margin-right: 5%;
  border-color: black;
  color: black;
  display: flex;
  justify-content: center;
  align-items: center;
  @media (max-width: 768px) {
   margin-right: 50%;
  }

  @media (min-width: 768px) and (max-width: 1024px) {
    margin-left: -10rem;
  }
`;

export default LoginButton;