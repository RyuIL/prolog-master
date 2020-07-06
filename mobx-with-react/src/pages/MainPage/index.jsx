import React, { Component } from "react";
import PostList from "../../components/PostList";
import NavBar from "../../components/NavBar";
import styled from "styled-components";
import TopBar from "../../components/TopBar";
import MobileNavBar from "../../components/MobileNavBar";
import CircularProgress from "@material-ui/core/CircularProgress";

class NowLoading extends Component {
  render() {
    return <CircularProgress />;
  }
}

class MainPage extends Component {
  state = {
    isLoading: false
  };

  render() {
    var NavTag = null;
    if (this.state.isLoading) {
      NavTag = <NowLoading />;
    } else {
      NavTag = <PostList></PostList>;
    }
    return (
      <MainPageLayout>
        <NavBar></NavBar>
        <Div>
          <TopBar></TopBar>
          <MobileNavBar></MobileNavBar>
          {NavTag}
        </Div>
      </MainPageLayout>
    );
  }
}

const MainPageLayout = styled.div`
  height: 100vh;
  display: grid;
  grid-template-columns: 290px;
  grid-template-areas: "nav content";
  @media (max-width: 768px) {
    grid-template-columns: 100vw;
  }
`;

const Div = styled.div`
  padding-bottom: 5%;
  display: grid;
  grid-template-rows: fit-content(9%) fit-content(9%) 82%;
`;

export default MainPage;
