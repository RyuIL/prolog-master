import React from "react";
import styled from "styled-components";
import AuthForm from "../../components/Auth/AuthForm";

const LogInPage = () => {
  return (
    <LoginLayout>
      <LeftDiv>
        <Logo>Prolog;</Logo>
        <TextBox>
          개발자들은 대체 글을 어디서 써야 할까....?
          <br />
          마크다운, 코드 하이라이팅 등... 개발자들의 취향저격하는 글쓰기
          플랫폼이 바로 여기에, 고민하지 말고 지금 시작하자.
        </TextBox>
      </LeftDiv>
      <RightDiv>
        <AuthForm />
      </RightDiv>
    </LoginLayout>
  );
};

const LoginLayout = styled.div`
  height: 100vh;
  display: grid;
  grid-template-columns: 50% 50%;
  grid-template-areas: "nav content";

  @media (max-width: 768px) {
    display: grid;
    grid-template-columns: 100% !important;
    grid-template-rows: 100% !important;
    grid-template-areas: "content";
  }

  @media (max-width: 1024px) {
    display: grid;
    grid-template-columns: auto;
    grid-template-rows: 30% 70%;
    grid-template-areas:
      "nav"
      "content";
  }
`;

const LeftDiv = styled.div`
  height: 100%;
  background-color: #1a3365;
  float: left;

  @media (max-width: 768px) {
    display: none;
  }

  @media (max-width: 1024px) {
    height: 100%;
  }
`;

const Logo = styled.div`
  padding: 0 2rem;
  margin-top: 30%;
  margin-left: 5%;
  margin-bottom: 1.75rem;
  font-size: 2rem;
  line-height: 2rem;
  font-family: Inconsolata;
  color: white;
  display: block;
  position: relative;

  @media (max-width: 1024px) {
    margin-top: 3rem;
  }
`;

const TextBox = styled.div`
  color: white;
  width: 70%;
  height: 20rem;
  margin-right: 15%;
  margin-left: 13%;
  font-size: 1.3rem;
`;

const RightDiv = styled.div`
  height: 100%;
  background-color: #ebf0fa;
  float: left;
  text-align: center;

  @media (max-width: 768px) {
    width: 100vw;
    height: 100%;
  }

  @media (max-width: 1024px) {
    width: 100vw;
    height: 100%;
  }
`;

export default LogInPage;
