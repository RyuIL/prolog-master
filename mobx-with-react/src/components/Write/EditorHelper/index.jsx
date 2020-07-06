import React, { Component } from "react";
import styled from "styled-components";
import Popup from "reactjs-popup";

import {
  ImageIcon,
  VideoIcon,
  HorizontalLineIcon
} from "../../../styles/iconStyle.js";

export default class EditorHelper extends Component {
  state = {
    imageUrl: "",
    mediaUrl: ""
  };

  mediaUrlChange = e => {
    this.setState({ mediaUrl: e.target.value });
  };

  imageUrlChange = e => {
    this.setState({ imageUrl: e.target.value });
  };

  onClickInsertMedia = () => {
    if (this.state.mediaUrl !== "") {
      this.props.editor.execute("mediaEmbed", this.state.mediaUrl);
      this.setState({ mediaUrl: "" });
    }
  };

  onClickInsertImage = () => {
    if (this.state.mediaUrl !== "") {
      this.props.editor.execute("imageInsert", { source: this.state.imageUrl });
      this.setState({ imageUrl: "" });
    }
  };

  onClickHorizontalLine = () => {
    this.props.editor.execute("horizontalLine");
  };

  render() {
    return (
      <EditorHelperLayout>
        <HorizontalLineIcon onClick={this.onClickHorizontalLine} />
        <Popup
          onClose={this.onClickInsertImage}
          trigger={open => (
            <ImageIcon color="black">
              Trigger - {open ? "Opened" : "Closed"}
            </ImageIcon>
          )}
          position="left center"
          closeOnDocumentClick
        >
          <span>InsertImage url</span>
          <input placeholder="http://" onChange={this.imageUrlChange}></input>
        </Popup>
        <Popup
          onClose={this.onClickInsertMedia}
          trigger={open => (
            <VideoIcon>Trigger - {open ? "Opened" : "Closed"}</VideoIcon>
          )}
          position="left center"
          closeOnDocumentClick
        >
          <span>InsertMedia url</span>
          <input placeholder="http://" onChange={this.mediaUrlChange}></input>
        </Popup>
      </EditorHelperLayout>
    );
  }
}

const EditorHelperLayout = styled.div`
  cursor: text;
  padding: 16px;
  border-radius: 2px;
  margin-bottom: 2em;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
