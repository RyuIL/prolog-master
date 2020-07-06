import React, { useState } from "react";
import { Switch, Route } from "react-router-dom";
import { createGlobalStyle } from "styled-components";

// Pages
import MainPage from "./pages/MainPage";
import LoginPage from "./pages/LoginPage";
import PostDetailPage from "./pages/PostDetailPage";
import MyPage from "./pages/MyPage";
import PostWritePage from "./pages/PostWritePage";
import SearchPage from "./pages/SearchPage";
import { signIn } from "./components/Auth/auth";
import PortfolioPage from "./pages/PortfolioPage";

const App = () => {
  const [user, setUser] = useState(null);
  return (
    <div>
      <GlobalStyle></GlobalStyle>
      <Switch>
        <Route path="/login" component={LoginPage} />
        <Route path="/post/:id" component={PostDetailPage} />
        <Route path="/mypage/:msrl" component={MyPage} />
        <Route path="/write/:postCode" component={PostWritePage} />
        <Route path="/write" component={PostWritePage} />
        <Route path="/searchpage" component={SearchPage} />
        <Route path="/portfolio/:msrl" component={PortfolioPage} />
        <Route path="/" component={MainPage} />
      </Switch>
    </div>
  );
};

const GlobalStyle = createGlobalStyle`
  #root{
    width: 100%;
    height: 100%;
    margin: 0;
    padding: 0;
    vertical-align: top;
    border:0;
    outline:0;
    
  }
  html{
    width: 100%;
    height: 100%;
    margin: 0;
    padding: 0;
    vertical-align: top;
    border:0;
    outline:0;
  }
  body{
    width: 100%;
    height: 100%;
    margin: 0;
    padding: 0;
    vertical-align: top;
    border:0;
    outline:0;
  }
`;
export default App;
