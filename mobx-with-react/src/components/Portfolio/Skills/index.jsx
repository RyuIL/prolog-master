import React, { Component } from "react";
import styled from "styled-components";
import { Edit } from "styled-icons/boxicons-regular/Edit";
import { inject, observer } from "mobx-react";
import SkillItemList from "../SkillItemList";
import SkillComboBox from "../SkillComboBox";

export const EditP = styled(Edit)`
  color: #dcdcdc;
  width: 1rem;
  height: 1rem;
  margin-bottom: 2.4rem;
`;

@inject("portfolioStore")
@observer
class Skills extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isEdit: false,
      skills: this.props.portfolioStore.values.skills
    };

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick = () => {
    if (this.state.isEdit) {
      this.props.portfolioStore.setSkills(this.state.skills);
      this.props.portfolioStore.saveSkills();
    }
    const { isEdit } = this.state;
    this.setState({
      isEdit: !isEdit
    });
  };

  handleChangeSkills = values => {
    this.setState({
      skills: values
    });
  };

  render() {
    const { skills } = this.props.portfolioStore.values;
    const isCurrentUser = this.props.isCurrentUser;

    
    const commonView = (
      <SkillsLayout>
        <SkTitle>
          Skills
          {isCurrentUser ? (
              <EditP onClick={this.handleClick} />
            ) : (
              <></>
            )}
        </SkTitle>
        <SkContent>
          <SkillItemList skills={skills} />
        </SkContent>
      </SkillsLayout>
    );

    const editView = (
      <SkillsLayout>
        <SkTitle>
          Skills
          <EditP onClick={this.handleClick} />
        </SkTitle>
        <SkContent>
          <SkillComboBox
            skills={skills}
            change={this.handleChangeSkills}
          ></SkillComboBox>
          <SkillItemList skills={skills} />
        </SkContent>
      </SkillsLayout>
    );

    return <div>{this.state.isEdit ? editView : commonView}</div>;
  }
}

const SkillsLayout = styled.div`
  height: 100%;
  width: auto;
  padding: 5%;

  @media (max-width: 768px) {
    padding: 1rem;
  }
`;

const SkTitle = styled.div`
  text-align: center;
  font-size: 2.4rem;
`;

const SkContent = styled.div`
  text-align: center;
  padding: 2%;

  @media (max-width: 768px) {
    display: inline-block;
    margin-top: 0;
    margin-right: 0;
    width: auto;
    padding: 1rem;
  }
`;

export default Skills;
