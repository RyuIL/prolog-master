import React, { Component } from "react";
import styled from "styled-components";
import { inject, observer } from "mobx-react";
import { EditP } from "../../styles/iconStyle.js";

@inject("userStore", "authStore", "portfolioStore")
@observer
class Contact extends Component{
    constructor(props){
        super(props);
    }

    render(){
        return(
            <ContactLayout>
            <ContTitle>Contact</ContTitle>
            {this.props.email ? (
              <Info>Email : {this.props.email}</Info>
            ) : (
              <Info>Email : 주소를 입력해주세요.</Info>
            )}
            {this.props.repository ? (
              <Info>Github : <a href={this.props.repository}>{this.props.repository}</a></Info>
            ) : (
              <Info>Github : 주소를 입력해주세요.</Info>
            )}
          </ContactLayout>
        )
    }
}

const ContactLayout = styled.div`
    grid-area: contact;
    height: 50vh;
    width: 100%;
`

const ContTitle = styled.div`
    text-align: center;
    font-size: 2.4rem;
    font-weight: 400;
    margin: 30px 0;
`

const Info = styled.div`
    text-align: center;
    font-size: 1.9em;
    font-weight: 500;
`;

export default Contact;