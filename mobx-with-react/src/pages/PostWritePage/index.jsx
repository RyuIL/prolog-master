import React, { Component } from "react";
import WriteTopBar from "../../components/Write/WriteTopBar";
import WriteEditor from "../../components/Write/WriteEditor";
import WriteTags from "../../components/Write/WriteTags";
import styled from "styled-components";
import { inject, observer } from "mobx-react";
import { withRouter } from "react-router-dom";
import { Link } from "react-router-dom";

@inject("editorStore", "userStore")
@withRouter
@observer
class PostWritePage extends Component {
  state = {
    tagInput: "",
    title: "",
    coverColor: "",
    coverImage: "",
    body: "",
    tagList: "",
    postCode: "",
    modify: false
  };

  componentWillMount() {
    if (this.props.match.params.postCode) {
      this.props.editorStore.setPostId(this.props.match.params.postCode);
      this.props.editorStore.loadInitialData().then();
    }
  }

  componentDidMount() {
    this.props.editorStore.loadInitialData();
  }

  componentDidUpdate(prevProps) {
    if (this.props.match.params.id !== prevProps.match.params.id) {
      this.props.editorStore.setPostId(this.props.match.params.id);
      this.props.editorStore.loadInitialData();
    }
  }

  changeTitle = e => this.props.editorStore.setTitle(e.target.value);

  changeCoverColor = color => this.props.editorStore.setCoverColor(color);

  changeCoverImage = src =>{
    this.props.editorStore.setCoverImage(src)
  } ;
  changeDescription = e =>
    this.props.editorStore.setDescription(e.target.value);
  changeBody = e => this.props.editorStore.setBody(e.target.value);
  changeTags = tags => this.props.editorStore.setTags(tags);
  changeTagInput = e => this.setState({ tagInput: e.target.value });

  handleTagInputKeyDown = ev => {
    switch (ev.keyCode) {
      case 13: // Enter
      case 9: // Tab
      case 188: // ,
        if (ev.keyCode !== 9) ev.preventDefault();
        this.handleAddTag();
        break;
      default:
        break;
    }
  };

  handleAddTag = () => {
    if (this.state.tagInput) {
      this.props.editorStore.addTag(this.state.tagInput.trim());
      this.setState({ tagInput: "" });
    }
  };

  handleRemoveTag = tag => {
    if (this.props.editorStore.inProgress) return;
    this.props.editorStore.removeTag(tag);
  };

  save = ev => {
    ev.preventDefault();
    const { editorStore } = this.props;
    editorStore.save(this.props.match.params.postCode);
    this.props.history.push("/");
    window.location.reload();
  };

  setBody = b => {
    this.props.editorStore.setBody(b);
  };

  render() {
    const {
      inProgress,
      errors,
      title,
      coverColor,
      coverImage,
      body,
      tagList,
      postCode
    } = this.props.editorStore;

    return (
      <PostWritePageLayout>
        <WriteTopBar
          title={title}
          coverColor={coverColor}
          coverImage={coverImage}
          changeTitle={this.changeTitle}
          changeCoverColor={this.changeCoverColor}
          changeCoverImage={this.changeCoverImage}
          postCode={this.props.match.params.postCode}
          save={this.save}
        ></WriteTopBar>
        <WriteEditor
          setBody={this.setBody}
          body={body}
          postCode={this.props.match.params.postCode}
        ></WriteEditor>
        <WriteAreaLayout>
          <div></div>
          <div>
            <WriteTags
              changeTags={this.changeTags}
              tagList={this.props.editorStore.tagList}
              inProgress={this.inProgress}
              postCode={this.props.match.params.postCode}
            >
              {" "}
            </WriteTags>
            <Link to={"/"} style={{ textDecoration: "none" }}>
              <SaveBtn
                title={title}
                coverColor={coverColor}
                coverImage={coverImage}
                changeTitle={this.changeTitle}
                changeCoverColor={this.changeCoverColor}
                changeCoverImage={this.changeCoverImage}
                postCode={this.postCode}
                save={this.save}
                onClick={this.save}
              >
                저장
              </SaveBtn>
            </Link>
          </div>
          <div></div>
        </WriteAreaLayout>
      </PostWritePageLayout>
    );
  }
}

const PostWritePageLayout = styled.div`
  height: 100%;
`;

const WriteAreaLayout = styled.div`
  display: grid;
  grid-template-columns: 15% 70% 15%;
`;

const SaveBtn = styled.div`
  border-radius: 5px;
  border-color: black;
  border: 1px solid black;
  color: black;
  cursor: pointer;
  height: 30px;
  width: 60px;
  background-color: white;
  float: right;
  margin-top: 1%;
  margin-right: 1%;
  text-align: center;
  padding-top: 3px;
`;

export default PostWritePage;
