import React, {Component} from 'react';
import styled from "styled-components";
import Content from "./Content";
import Tabs from "./Tabs";

class UserContent extends Component{
    render(){
        return(
            <UserContentLayout>
                <Tabs></Tabs>
                <Content></Content>
            </UserContentLayout>
        )
    }
}

const UserContentLayout = styled.div`
    margin-top: 3%;
    height: 97%;
    display: grid;
    grid-template-rows: 5rem;
`

export default UserContent;