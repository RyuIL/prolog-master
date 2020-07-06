import React, { Component } from "react";
import styled from "styled-components";
import { languageMapper } from "../data.js";

class SkillItem extends Component {
  render() {
    const { text } = this.props;
    const version = text + "-" + languageMapper[text];
    const srcAddress = `https://cdn.rawgit.com/konpa/devicon/master/icons/${text}/${version}.svg`
    return (
      <SkillItemLayout>
        <img src={srcAddress} alt="" />
      </SkillItemLayout>
    );
  }
}

const SkillItemLayout = styled.div`
  width: 200px;
  height: 200px;
  /* border:1px solid red; */
  display: inline-flex;
  vertical-align: top;
  justify-content: center;
  align-items: center;
`;

export default SkillItem;
