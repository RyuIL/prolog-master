import React, {Component} from 'react';
import { Link } from "react-router-dom";
import styled from "styled-components";
import UserHead from "./UserHead";
import UserContent from "./UserContent"
import UserProfile from "./UserProfile"

class UserPage extends Component{
    render(){
        return(
            <UserPageLayout>
                <Link to={"/"} style={{ textDecoration: "none" }}>
                    <MLogo>Prolog;</MLogo>
                </Link>
                <Div>
                    <UserProfile></UserProfile>
                    <UserContent></UserContent>
                </Div>
            </UserPageLayout>
        )
    }
}

const UserPageLayout = styled.div`
    width: 100%;
    height: 100%;
    display: grid;
    grid-template-rows: 5rem;

    @media (max-width: 768px) {
        width: 100%;
        height: 100%;
    }

    @media (max-width: 1024px) {
        width: 100%;
        height: 100%;
    }
`;

const MLogo = styled.div`
    padding-left: 2rem;
    padding-right: 2rem;
    text-align: left;
    cursor: pointer;
    color: black;
    font-size: 2rem;
    line-height: 3rem;
    font-family: Inconsolata;
    padding-top: 1rem;
`;

const Div = styled.div`
    font-family: Inconsolata;
    padding-top: 3rem;
    padding-left: 15%;
    padding-right: 15%;
    height: 90%;
    width: 70%;
    display: grid;
    grid-template-rows: 15rem;

    @media (max-width: 768px) {
        margin: 0;
        display: flex;
        flex-direction: column;
        height: 99%;
        width: 94%;
        padding-top: 1%;
        padding-left: 3%;
        padding-right: 3%;
    }

    @media (min-width:768px) and (max-width: 1024px) {
        margin: 0;
        height: 90%;
        width: 90%;
        padding-left: 5%;
        padding-right: 5%;
    }
`;

export default UserPage;