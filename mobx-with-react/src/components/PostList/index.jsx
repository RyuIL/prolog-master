import React, { Component } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import PostCard from "./PostCard";
import styled from "styled-components";
import { inject, observer } from "mobx-react";
import Loader from "react-loader-spinner";

@inject("postStore")
@observer
class PostList extends Component {
  componentDidMount() {
    this.props.postStore.loadPosts(-1);
  }

  state = {
    items: [],
    hasMoreItems: true
  };

  fetchMoreData = () => {
    if (this.state.items.length >= this.props.postStore.length) {
      this.setState({ hasMoreItems: false });
      return;
    }

    setTimeout(() => {
      this.props.postStore.getItems(this.state.items.length, 6);
      this.setState({
        items: this.state.items.concat(this.props.postStore.returnItems)
      });
    }, 500);
  };

  render() {
    const { items, hasMoreItems } = this.state;
    const returns = this.props.postStore.returnItems

    return (
      <InfiniteScroll
        dataLength={this.props.postStore.returnLength}
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
        endMessage={<h4>End</h4>}
      >
        <GridDiv>
          { returns? (returns.map((item, index) => (
            <PostCard key={index} post={item} />
          ))) : (<></>)}
          
        </GridDiv>
      </InfiniteScroll>
    );
  }
}
export default PostList;

const GridDiv = styled.div`
  padding: 2%;
  display: grid;
  grid-template-columns: repeat(auto-fit, 33%);
  grid-template-rows: repeat(auto-fit, 1fr);
  z-index: 1;

  @media (max-width: 1024px) {
    grid-template-columns: repeat(auto-fit, 50%);
    grid-template-rows: repeat(auto-fit, 1fr);
  }

  @media (max-width: 768px) {
    grid-template-columns: 100%;

    grid-template-rows: repeat(auto-fit, 1fr);
  }
`;
