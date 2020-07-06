import React, { Component } from "react";
import styled from "styled-components";
import { inject, observer } from "mobx-react";

class About extends Component {
  constructor(props) {
    super(props);
  }
  
  render() {
    return (
        <AboutLayout>
          <AbTitle> About ME </AbTitle>
          {this.props.greeting ? (
            <AbContent>{this.props.greeting}</AbContent>
          ) : (
            <div style={{ textAlign: "center" }}>
              <h2>자신에 대해서 소개해주세요.</h2>
            </div>
          )}
        </AboutLayout>
    )
  }
}

const AboutLayout = styled.div`
  height: 100%;
  width: 100%;

  @media (max-width: 768px) {
    display: inline-block;
    width: auto;
    padding: 1%;
  }
`;

const AbTitle = styled.div`
  text-align: center;
  font-size: 2.4rem;
  margin-left: 6vw;
  margin-right: 6vw;
  box-sizing: border-box;
  align-self: center;
  margin-top: 5rem;

  @media (max-width: 768px) {
    width: auto;
  }
`;

const AbContent = styled.div`
  grid-area: "acontent";
  padding-right: 2%;
  width: 50rem;
  max-height: 30rem;
  overflow: hidden;

  max-width: 100%;
  margin-bottom: 4rem;
  margin-top: 4rem;
  padding: 1rem;
  margin-left: auto;
  margin-right: auto;

  @media (max-width: 768px) {
    display: inline-block;
    margin-top: 0;
    margin-right: 0;
    width: auto;
    padding: 1rem;
  }
`;

export default About;
