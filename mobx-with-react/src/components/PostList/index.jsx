import React, { useState } from "react";
import PostCard from "./PostCard";
import styled from "styled-components";
import { inject, observer } from "mobx-react";

const PostList = ({ posts, onAdd, onDelete }) => {
  // posts 는 그냥 api 호출을 통해서가져오는 것 뿐이다. 그럼 그냥 Posts를 axios로 호출하는 코드와
  // 그것을 보여주는 코드면 충분하다.
  // imgUrl, title, category, text, author

  const postCards = posts.map(item => <PostCard key={item.id} post={item} />);
  return (
    <Divs>
      <button onClick={onAdd}>추가추가</button>
      {/* <button onClick={onDelete}>삭제삭제</button> */}
      {postCards}
    </Divs>
  );
};

const Divs = styled.div`
  padding: 2%;
  display: grid;
  grid-template-columns: repeat(4, 25%);
  grid-template-rows: repeat(auto-fit, 1fr);
`;

export default inject(({ post }) => ({
  posts: post.postItems,
  onAdd: post.add,
  onDelete: post.delete, 
  nextId: post.nextId
}))(observer(PostList));
