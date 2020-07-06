import React, { Component } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { inject, observer } from "mobx-react";
import InfiniteScroll from "react-infinite-scroll-component";
import Loader from "react-loader-spinner";
import ProjectList from "./ProjectList";
import { EditP } from "../../styles/iconStyle.js";

@inject("postStore")
@observer
class Project extends Component {
  state = {
    hasMoreItems: true
  };

  componentDidMount() {
    const { postStore } = this.props;


    postStore.loadPosts(this.props.userid);
  }

  render() {
    const { items, hasMoreItems } = this.state;
    const isCurrentUser = this.props.isCurrentUser;
    return (
      <InfiniteLayout
        dataLength={this.props.postStore.returnItems.length}
        next={this.fetchMoreData}
        hasMore={hasMoreItems}
        loader={
          <div style={{ textAlign: "center" }}>
            <Loader
              type="ThreeDots"
              color="#1A3365"
              height={100}
              width={100}
              timeout={1500} //3 secs
            />
          </div>
        }
        endMessage={<h4></h4>}
      >
        <ProTitle>
          Project{isCurrentUser ? <EditP onClick={this.handleClick} /> : <></>}
        </ProTitle>
        <ProjectLayout>
          {this.props.postStore.returnItems.map((item, index) => (
            <ProjectList key={index} post={item} />
          ))}
        </ProjectLayout>
      </InfiniteLayout>
    );
  }
}

export const InfiniteLayout = styled(InfiniteScroll)`
  /* background-color: #e3e3e3; */
`;

const ProjectLayout = styled.div`
  padding: 5%;
  width: auto;
  margin-left: 5rem;
  grid-template-columns: 100%;
  grid-template-rows: repeat(auto-fit, 1fr);

  @media (max-width: 768px) {
    margin-left: 0;
    margin-right: 0;
    width: 100%;
  }
`;

const ProTitle = styled.div`
  text-align: center;
  font-size: 2.4rem;
`;

export default Project;
