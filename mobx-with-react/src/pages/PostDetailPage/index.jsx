import React, { Component } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { inject, observer } from "mobx-react";
import jwtDecode from "jwt-decode";

// component
import UserButton from "../../components/Common/UserButton";

@inject("postStore", "userStore", "commentStore", "authStore")
@observer
class PostDetailPage extends Component {
  componentDidMount() {
    const id = this.props.match.params.id;
    this.props.postStore.loadPost(id, { acceptcached: true });
    this.props.commentStore.setPostId(id);
  }

  handleDeletePost = id => {
    // 글을 지운다. 나만 가능
    this.props.postStore
      .deletePost(id)
      .then(() => this.props.history.replace("/"));
  };

  //댓글 삭제 해당 글 쓴 사람만 가능
  handleDeleteComment = id => {
    this.props.commentStore.deleteComment(id);
  };

  createMarkup = () => {
    return { __html: this.props.postStore.detailPost.body };
  };

  render() {
    const id = this.props.match.params.id;
    this.props.postStore.getPost(id);
    const post = this.props.postStore.detailPost;

    if (!this.props.postStore.detailPost)
      return <h1>Post가 없습니다. 에러처리</h1>;

    //author는 유저정보가 들어오고 클래스여야한다.
    const { values } = this.props.authStore;
    const Delete = () => {
      this.props.postStore
        .deletePost(id)
        .then(this.props.history.push("/"), window.location.reload());
    };
    if (
      window.sessionStorage.getItem("jwt") !== null &&
      window.sessionStorage.getItem("jwt") !== "" &&
      jwtDecode(window.sessionStorage.getItem("jwt")).sub * 1 === post.msrl
    ) {
      this.check = true;
    }
    const d = new Date();
    let date =
      1900 + d.getYear() + " " + (d.getMonth() + 1) + " " + d.getDate();
    return (
      <PostDetailPageLayout>
        <PostViewHeader color={post.coverColor}>
          <Link to={"/"} style={{ textDecoration: "none" }}>
            <MLogo>Prolog;</MLogo>
          </Link>
          <DetailUserButton></DetailUserButton>
        </PostViewHeader>
        <PostContentWrapper>
          <PostContent>
            {post.coverImage ? (
              <>
                <Coverimg
                  color={post.coverColor}
                  image={post.coverImage}
                ></Coverimg>
                <UTitle>{post.title}</UTitle>
                <UAuthor>작성자 : {post.userName}</UAuthor>
                <UWriteDate>작성날짜 : {date}</UWriteDate>
              </>
            ) : (
              <Cover color={post.coverColor}>
                <Title>{post.title}</Title>
                <Author>작성자 : {post.userName}</Author>
                <WriteDate>작성날짜 : {date}</WriteDate>
              </Cover>
            )}

            <TestContainer>
              <div></div>
              <EditorLayout>
                <div
                  className="ck-content"
                  dangerouslySetInnerHTML={this.createMarkup()}
                />
              </EditorLayout>

              <div></div>
            </TestContainer>
            <TagContainer>
              <div></div>
              {post.tagList ? (
                <TagBox>
                  {post.tagList.map((item, index) => (
                    <Tag key={index}>#{item}</Tag>
                  ))}
                </TagBox>
              ) : (
                <></>
              )}
              <div></div>
            </TagContainer>
            {this.check ? (
              <>
                <DeleteBtn onClick={Delete}>삭제</DeleteBtn>
                <Link to={"/write/" + id} style={{ textDecoration: "none" }}>
                  <UpdateBtn>수정</UpdateBtn>
                </Link>{" "}
              </>
            ) : (
              <></>
            )}
          </PostContent>
        </PostContentWrapper>
      </PostDetailPageLayout>
    );
  }
}
const TagContainer = styled.div`
  display: grid;
  grid-template-columns: 15% 70% 15%;
`;
const Tag = styled.div`
  font-size: 1rem;
  float: left;
  background-color: #e6e6e6;
  margin-right: 0.5rem;
  padding: 5px 7px 5px 7px;
  margin-bottom: 0.5rem;
`;
const TagBox = styled.div`
  float: left;
`;
const Author = styled.div`
  z-index: 2;
  padding-top: 2rem;
  padding-left: 15rem;
  width: 70%;
  font-size: 1rem;
  white-space: pre-line;
  font-family: Inconsolas;
  color: white;
`;
const UAuthor = styled.div`
  position: absolute;
  z-index: 2;
  margin-top: -8rem;
  padding-left: 15rem;
  width: 70%;
  font-size: 1rem;
  white-space: pre-line;
  font-family: Inconsolas;
  color: white;
`;
const DeleteBtn = styled.div`
  width: 3rem;
  height: 1.5rem;
  cursor: pointer;
  border-color: black;
  float: right;
  border-width: 1px;
  border-style: solid;
  text-align: center;
  margin: 1rem 15rem 1rem 1rem;
`;

const UpdateBtn = styled.div`
  width: 3rem;
  height: 1.5rem;
  cursor: pointer;
  border-width: 1px;
  border-style: solid;
  border-color: black;
  color: black;
  float: right;
  text-align: center;
  margin: 1rem 0rem 1rem 1rem;
`;
const UTitle = styled.div`
  z-index: 2;
  margin-top: -13rem;
  padding-left: 15rem;
  width: 70%;
  font-size: 3.5rem;
  white-space: pre-line;
  font-family: Inconsolas;
  color: white;
  position: absolute;
  filter: brightness(100%) !important;
`;
const Title = styled.div`
  z-index: 2;
  padding-top: 15rem;
  padding-left: 15rem;
  width: 70%;
  font-size: 3.5rem;
  white-space: pre-line;
  font-family: Inconsolas;
  color: white;
  filter: brightness(100%) !important;
`;
const WriteDate = styled.div`
  z-index: 2;
  padding-left: 15rem;
  width: 70%;
  font-size: 1rem;
  white-space: pre-line;
  font-family: Inconsolas;
  color: white;
`;
const UWriteDate = styled.div`
  position: absolute;
  z-index: 2;
  margin-top: -6.5rem;
  padding-left: 15rem;
  width: 70%;
  font-size: 1rem;
  white-space: pre-line;
  font-family: Inconsolas;
  color: white;
`;
const Coverimg = styled.div`
  background-color: ${props => props.color};
  background-image: url(${props => props.image});
  z-index: 1;
  height: 28rem;
  width: 100%;
  position: relative;
  filter: brightness(50%);
`;

const Cover = styled.div`
  z-index: 2;
  height: 28rem;
  position: relative;
  background-color: ${props => props.color};
`;

export default PostDetailPage;
export const LINKS = styled(Link)``;

export const DetailUserButton = styled(UserButton)``;

const EditorLayout = styled.div`
  box-sizing: border-box;
  cursor: text;
  padding: 16px;
  border-radius: 2px;
  margin-bottom: 2em;
  background: #fefefe;
`;
const TestContainer = styled.div`
  display: grid;
  grid-template-columns: 15% 70% 15%;
`;

const PostDetailPageLayout = styled.div`
  flex-direction: row;
  align-items: flex-end;
  width: 100%;
  display: grid;
  grid-template-rows: 5rem;
  height: 100%;
  width: 100%;
  display: grid;
  grid-template-rows: 5rem;
`;

const PostViewHeader = styled.div`
  display: grid;
  grid-template-areas: "logo . . . . . . . . . . . test .";
  height: 100%;
  width: 100%;
  background-color: ${props => props.color};
`;

const MLogo = styled.div`
  grid-area: logo;
  padding-left: 1.5rem;
  align-items: end;
  cursor: pointer;
  color: white;
  font-size: 2rem;
  line-height: 2rem;
  font-family: Inconsolata;
  padding-top: 1rem;
`;

const PostContentWrapper = styled.div`
  /* padding-top: 5rem; */
  padding-bottom: 5rem;
  display: grid;
  grid-template-columns: 0% 100% 0%;
  grid-template-areas: "left contents right";

  @media (max-width: 768px) {
    grid-template-columns: 100%;
    grid-template-areas: "contents";
  }
`;

const PostContent = styled.div`
  grid-area: contents;

  @media (max-width: 768px) {
  }
`;
