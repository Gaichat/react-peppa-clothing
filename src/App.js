import React from 'react';
import './App.css';
import HomePage from './pages/homepage/homepage.component';
import { Switch, Route } from 'react-router-dom';
import ShopPage from './pages/shop/shop.component';
import HatsPage from "./pages/hatspage/hatspage.component";
import Header from "./components/header/header.component";

function App() {
  return (
    <div>
        <Header/>
        <Switch>
            <Route exact path='/' component={HomePage}/>
            <Route exact path='/hats' component={HatsPage}/>
            <Route exact path='/shop' component={ShopPage}/>
        </Switch>
    </div>
  );
}

export default App;
