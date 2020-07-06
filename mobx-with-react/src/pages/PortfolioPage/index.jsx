import React, { Component } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { inject, observer } from "mobx-react";
import About from "./About";
import Skills from "../../components/Portfolio/Skills";
import Project from "./Project";
import Contact from "./Contact";

@inject("portfolioStore", "authStore")
@observer
class PortfolioPage extends Component {
  componentDidMount() {
    const id = this.props.match.params.msrl;
    this.props.portfolioStore.getPortfolioData(id);
  }

  render() {
    const { greeting, email, repository } = this.props.portfolioStore.values;
    const id = this.props.match.params.msrl;
    const currentId = this.props.authStore.authenticatedUserId();
    let isCurrentUser = false;
    if (currentId) {
      if (currentId === id) {
        isCurrentUser = true;
      }
    }

    return (
      <PortfolioLayout>
        <Link to={"/"} style={{ textDecoration: "none" }}>
          <MLogo>Prolog;</MLogo>
        </Link>
        <About greeting={greeting}></About>
        <Skills isCurrentUser={isCurrentUser}></Skills>
        <Project userid={id} isCurrentUser={isCurrentUser}></Project>
        <Contact email={email} repository={repository}></Contact>
      </PortfolioLayout>
    );
  }
}

const PortfolioLayout = styled.div`
  height: 100%;
  width: 100%;
  display: grid;
  grid-template-rows: auto;
  grid-template-areas: "title" "about" "skills" "project" "contact";
`;

const MLogo = styled.div`
  grid-area: logo;
  padding-left: 1.5rem;
  align-items: end;
  cursor: pointer;
  color: black;
  font-size: 2rem;
  line-height: 2rem;
  font-family: Inconsolata;
  padding-top: 1rem;
`;

export default PortfolioPage;
