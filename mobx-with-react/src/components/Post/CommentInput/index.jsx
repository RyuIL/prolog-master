import React, { Component } from "react";
import { inject } from "mobx-react";
import styled from "styled-components";
import { Link } from "react-router-dom";

@inject("commentStore")
class CommentInput extends Component {
  constructor() {
    super();
    this.state = {
      body: ""
    };

    //커멘트 내용 입력 이벤트
    this.handleBodyChange = e => {
      this.setState({ body: e.target.value });
    };

    //댓글 저장 이벤트
    this.createComment = e => {
      e.preventDefault();
      this.props.commentStore.createComment({ body: this.state.body });
    };
  }

  render() {
    const { isCreatingComment } = this.props.commentStore;
    return (
      <form className="card comment-form" onSubmit={this.createComment}>
        <DIV className="card-block">
          <TextArea
            className="form-control"
            placeholder="댓글을 작성해주세요."
            value={this.state.body}
            disabled={isCreatingComment}
            onChange={this.handleBodyChange}
            rows="3"
          />
        </DIV>
        <div className="card-footer">
          <img
            src={this.props.currentUser.image}
            className="comment-author-img"
            alt=""
          />
          <CButton className="btn btn-sm btn-primary" type="submit">
            댓글 작성하기
          </CButton>
        </div>
      </form>
    );
  }
}

const DIV = styled.div`
  padding-right: 2%;
  width: 98%;
  max-height: 30rem;
  overflow: hidden;
`;

const TextArea = styled.textarea`
  margin-top: 1rem;
  width: 100%;
  border: none;
  outline: none;
  font-size: 1rem;
  border: 1px solid #e9ecef;
  border-radius: 4px;
  resize: none;
  color: #212529;
  display: block;
  line-height: 1.5;
  height: 10rem;
`;

const CButton = styled.button`
  margin-top: 1rem;
  border: 0;
  float: right;
  width: 7rem;
  height: 2rem;
  border-radius: 3px;
  background-color: #1a3365;
  color: white;
`;

export default CommentInput;
