import React, {Component} from 'react';
import styled from "styled-components";
import Content from "./Content";

class UserContent extends Component{
    render(){
        return(
            <UserContentLayout>
                <Content userid={this.props.userid}></Content>
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