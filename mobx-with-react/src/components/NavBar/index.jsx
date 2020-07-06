import React from 'react';
import NavSearch from './NavSearch';
import NavItems from './NavItems';
import Logo from './Logo';
import styled from 'styled-components';

const NavBar = () => {
    return (
        <NavBarLayout >
            <Logo></Logo>
            <NavSearch></NavSearch>
            <NavItems></NavItems>
        </NavBarLayout>
    );
};

const NavBarLayout = styled.div`
    background-color : #1a3365;

    @media (max-width: 768px) {
        display: none;
  }
`;

export default NavBar;
