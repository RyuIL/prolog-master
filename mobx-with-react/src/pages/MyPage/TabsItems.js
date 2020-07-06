import React from "react";
import styled from "styled-components";
import { inject, observer } from "mobx-react";
import { Link } from 'react-router-dom';

const TabsItems = ({posts}) => {
    return(
        <TabsItemsLayout>
            <Link to={"/portfolio"} style={{textDecoration:"none"}}>
                <TabsItem onClick={""}>
                <ItemContent>포트폴리오</ItemContent>
                </TabsItem>
            </Link>
            <Link to={""} style={{textDecoration:"none"}}>
                <TabsItem onClick={""}>
                <ItemContent>포스트</ItemContent>
                </TabsItem>
            </Link>
            <Link to={""} style={{textDecoration:"none"}}>
                <TabsItem onClick={""}>
                <ItemContent>시리즈</ItemContent>
                </TabsItem>
            </Link>
        </TabsItemsLayout>
    )
}

const TabsItemsLayout = styled.div`
    display: flex;
    padding-bottom: 3rem;
`;

const TabsItem = styled.div`
    width: 5rem;
`;

const ItemContent = styled.div`
    text-align: center;
`;

export default inject(({postStore})=>({
    posts: postStore.postItems,
}))(observer(TabsItems))
