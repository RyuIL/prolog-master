import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { inject, observer } from "mobx-react";

const NavItems = ({
  onSortByViews,
  onSortByAuthors,
  onSortByDates,
  values
}) => {
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
    </NavItemsLayout>
  );
};

const NavItemsLayout = styled.ul`
  list-style: none;
  padding-left: 0;
`;

const NavItem = styled.li`
  color: white;
  cursor: pointer;
  font-size: 20px;
  padding-top: 5px;
  padding-bottom: 12px;
  :hover {
    background-color: white;
    color: black;
  }
`;

const ItemContent = styled.div`
  padding-top: 0.75rem;
  padding-bottom: 0.75rem;
  font-size: 1.125rem;
  padding-left: 1.75rem;
  display: -ms-flexbox;
  display: flex;
  -ms-flex-align: center;
  align-items: center;
`;

export default inject(({ postStore, authStore }) => ({
  onSortByViews: postStore.sortByViews,
  onSortByAuthors: postStore.sortByAuthors,
  onSortByDates: postStore.sortByDates,
  values: authStore.values
}))(observer(NavItems));
