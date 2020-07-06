import React, {Component} from 'react';
import styled from "styled-components";
import TabsItems from "./TabsItems";


class Tabs extends Component{
    render(){
        return(
            <TabsLayout>
                <TabsItems></TabsItems>
            </TabsLayout>
        )
    }
}

const TabsLayout = styled.div`
    margin-bottom: 3rem;
    display: flex;
    justify-content: center;
    @media (max-width: 768px) {
        width: 100%;
    }
`

export default Tabs;