import React, { Component } from "react";
import styled from "styled-components";
import PostCard from "./PostCard";
import { inject, observer } from "mobx-react";
import InfiniteScroll from "react-infinite-scroll-component";
import Loader from "react-loader-spinner";

@inject("postStore")
@observer
class TabWrapper extends Component {
  state = {
    items: [],
    hasMoreItems: true
  };

  componentDidMount() {
    let userid = this.props.userid;
    const { postStore } = this.props;

    postStore.loadPosts(userid).then(res => {
      this.setState({
        items: postStore.postItems
      });
    });
  }

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
    return (
      <InfiniteScroll
        dataLength={items.length}
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
        <TabWrapperLayout>
          {console.log(items)}
          {items.map((item, index) => (
            <PostCard key={index} post={item} />
          ))}
        </TabWrapperLayout>
      </InfiniteScroll>
    );
  }
}

const TabWrapperLayout = styled.div`
  width: 85%;
  margin-left: 5rem;
  grid-template-columns: 100%;
  grid-template-rows: repeat(auto-fit, 1fr);

  @media (max-width: 768px) {
    margin-left: 0;
    margin-right: 0;
    width: 100%;
  }
`;

export default TabWrapper;
