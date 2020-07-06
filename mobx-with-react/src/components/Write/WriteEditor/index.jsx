import React, { Component } from "react";
import styled from "styled-components";
import CKEditor from "@ckeditor/ckeditor5-react";
import BalloonEditor from "@ckeditor/ckeditor5-build-balloon";
import "../../../styles/content-style.css";
import EditorHelper from "../EditorHelper";

export default class WriteEditor extends Component {
  state = {
    data1: "",
    ckeditor: undefined
  };

  constructor(props) {
    super(props);
  }

  createMarkup = () => {
    return { __html: this.state.data1 };
  };

  render() {
    let config = {
      simpleUpload: {
        uploadUrl: "http://i02a410.p.ssafy.io:8080/v1/file"
      }
    };

    return (
      <>
        <TestContainer>
          <div></div>
          <EditorLayout id="editor">
            <CKEditor
              editor={BalloonEditor}
              data={this.props.body}
              config={config}
              onInit={editor => {
                this.setState({ ckeditor: editor });
              }}
              onChange={(event, editor) => {
                this.setState({ data1: editor.getData() });
                this.props.setBody(editor.getData());
              }}
              onBlur={(event, editor) => {}}
              onFocus={(event, editor) => {}}
            />
          </EditorLayout>
          <div>
            <EditorHelper editor={this.state.ckeditor} />
          </div>
        </TestContainer>
      </>
    );
  }
}

const EditorLayout = styled.div`
  box-sizing: border-box;
  border: 1px solid #ddd;
  cursor: text;
  padding: 16px;
  border-radius: 2px;
  margin-bottom: 2em;
  box-shadow: inset 0px 1px 8px -3px #ababab;
  background: #fefefe;
  min-height: 25rem;
`;

const TestContainer = styled.div`
  display: grid;
  grid-template-columns: 15% 70% 15%;
`;
