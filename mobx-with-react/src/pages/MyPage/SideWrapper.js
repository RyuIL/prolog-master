import React, { Component } from "react";
import styled from "styled-components";
import { inject, observer } from "mobx-react";
import agent from "../../agent";

@inject("postStore")
@observer
class SideWrapper extends Component {
  state = {
    tags: []
  };

  componentDidMount() {
    const userid = this.props.userid;
    const { postStore } = this.props;
    agent.Tags.getTags(userid).then(res => {
      this.setState({
        tags: res.data
      });
    });
  }

  render() {
    return (
      <SideWrapperLayout>
        {this.state.tags.map((item, index) => (
          <SideTags key={index}>{item}</SideTags>
        ))}
      </SideWrapperLayout>
    );
  }
}

const SideWrapperLayout = styled.div`
  flex-shrink: 0;
  @media (max-width: 768px) {
    display: none;
  }
`;

const SideTags = styled.div`
  display: inline-block;
  background: #AAA;
  color: #FFF;
  padding: 5px 10px;
  margin:5px 5px 5px 5px;
  font: normal 16px sans-serif;
  position: relative;
  cursor: default;
  box-shadow:1px 1px 0 rgba(0,0,0,.2);
  -webkit-transform-origin:0% 50%;
  -webkit-animation: swing 1s;
  -o-animation: swing 1s;
  animation: swing 1s ;
}
`;

export default SideWrapper;
