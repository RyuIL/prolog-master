import React, {Component} from 'react';
import styled from "styled-components";
import TabWrapper from "./TabWrapper";
import SideWrapper from "./SideWrapper";

class Content extends Component{
    render(){
        return(
            <ContentLayout>
                <SideWrapper userid={this.props.userid}></SideWrapper>
                <TabWrapper userid={this.props.userid}></TabWrapper>
            </ContentLayout>
        )
    }
}

const ContentLayout = styled.div`
    padding-top: 1%;
    height: 97%;
    display: grid;
    grid-template-columns: 12rem;
    grid-template-areas: "nav content";
    @media (max-width: 768px) {
        grid-template-columns: 100%;
    }
`    

export default Content;