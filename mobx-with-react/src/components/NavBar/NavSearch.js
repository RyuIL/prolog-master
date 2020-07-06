import React, { Component } from "react";
import styled from "styled-components";
import { Search } from "styled-icons/evil/Search";
import { inject, observer } from "mobx-react";
import { withRouter } from "react-router-dom";

export const SearchIcon = styled(Search)`
  width: 1em;
  height: 1em;
  cursor: pointer;
`;
@inject("postStore")
@withRouter
@observer
class NavSearch extends Component {
  state = {
    searchText: ""
  };
  handleChange = e => {
    this.setState({
      searchText: e.target.value
    });
  };

  render() {
    const SearchBtn = () => {
      this.props.postStore.searchTitle(this.state.searchText);
      this.props.history.push("/");
      this.setState({
        searchText: ""
      });
    };
    const Enterkey = () => {
      if (window.event.keyCode == 13) {
        SearchBtn();
      }
    };
    return (
      <NavSearchLayout>
        <NavSearchInput>
          <SearchIcon onClick={SearchBtn}></SearchIcon>
          <InputBox
            onKeyPress={Enterkey}
            value={this.state.searchText}
            onChange={this.handleChange}
          ></InputBox>
        </NavSearchInput>
      </NavSearchLayout>
    );
  }
}

const NavSearchLayout = styled.div`
  padding-left: 1rem;
  padding-right: 1rem;
  padding-bottom: 1rem;
  padding-top: 1rem;
`;
const NavSearchInput = styled.div`
  -webkit-transition: all 0.125s ease-in;
  -o-transition: 0.125s all ease-in;
  transition: all 0.125s ease-in;
  border-radius: 4px;
  display: -ms-flexbox;
  display: flex;
  padding-left: 0.5rem;
  background: white;
  border: 1px solid white;
  -ms-flex-align: center;
  align-items: center;
  color: #343a40;
  margin: 0 auto;
  width: 80%;
`;
const InputBox = styled.input`
  background: none;
  border: none;
  outline: none;
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
  font-size: 0.875rem;
  -ms-flex: 1 1;
  flex: 1 1;
  margin-left: 0.5rem;
  color: inherit;
`;

export default NavSearch;
