import React, {Component} from 'react';
import styled from "styled-components";
import UserInfo from "./UserInfo";

class UserHead extends Component{
    render(){
        return(
            <UserHeadLayout>
                <Img></Img>
                <UserInfo>user info~</UserInfo>
            </UserHeadLayout>
        )
    }
}


const UserHeadLayout = styled.div`
    display: flex;
    height: 50%;

    @media (max-width: 1024px){
        
    }

    @media (max-width: 768px) {
        display: grid;
        flex-direction: column;
        justify-content: center;
    }
`;

const Img = styled.div`
    display: flex;
    background-color: pink;
    justify-content: center;
    text-align: center;
    width: 10rem;
    height: 10rem;
    object-fit: cover;
    border-radius: 50%;
`;

export default UserHead;