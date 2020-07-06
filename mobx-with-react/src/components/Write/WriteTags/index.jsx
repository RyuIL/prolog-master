import React, { Component } from "react";
import styled from "styled-components";

import TagEditor from "react-tageditor";
import "react-tageditor/dist/style/default.css";

class WriteTags extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tags: this.props.tagList
    };
    this.handleTagsChange = this.handleTagsChange.bind(this);
  }

  handleTagsChange(tagsChanged, allTags, action) {
    this.props.changeTags(allTags);
  }

  render() {
    return (
      <WriteTagLayout>
        <TagEditor
          ref="tagEditor"
          tags={this.state.tags}
          delimiters={[13, ","]}
          placeholder="태그를 입력해주세요."
          onChange={this.handleTagsChange}
        />
      </WriteTagLayout>
    );
  }
}

const WriteTagLayout = styled.div``;

export default WriteTags;
