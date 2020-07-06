import React from "react";
import styled from "styled-components";
import { inject, observer } from "mobx-react";
import { Link } from "react-router-dom";

const MNavItems = ({ onSortByViews, onSortByAuthors, onSortByDates }) => {
  return (
    <NavItemsLayout>
      <Link to={"/"} style={{ textDecoration: "none" }}>
        <NavItem onClick={onSortByDates}>
          <ItemContent>최신순</ItemContent>
        </NavItem>
      </Link>
      <Link to={"/"} style={{ textDecoration: "none" }}>
        <NavItem onClick={onSortByViews}>
          <ItemContent>조회수순</ItemContent>
        </NavItem>
      </Link>
      <Link to={"/"} style={{ textDecoration: "none" }}>
        <NavItem onClick={onSortByAuthors}>
          <ItemContent>내가 쓴 글</ItemContent>
        </NavItem>
      </Link>
    </NavItemsLayout>
  );
};

const NavItemsLayout = styled.div``;

const NavItem = styled.div`
  color: white;
  cursor: pointer;
  font-size: 20px;
  width: 33.3333%;
  height: 3rem;
  float: left;
  padding-top: 1.3rem;
  padding-bottom: auto;
  :hover {
    background-color: white;
    color: black;
  }
`;

const ItemContent = styled.div`
  font-size: 1.125rem;
  text-align: center;
`;

export default inject(({ postStore }) => ({
  onSortByViews: postStore.sortByViews,
  onSortByAuthors: postStore.sortByAuthors,
  onSortByDates: postStore.sortByDates
}))(observer(MNavItems));
