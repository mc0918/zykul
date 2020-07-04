import React, { Component } from 'react';
import { WarfareUnitGenerator } from './components/WarfareUnitGenerator/WarfareUnitGenerator';
import './App.css'
import { Header } from './components/Header/Header';
import { Container } from '@material-ui/core';

class App extends Component {


  render(){
      return(
          <div className="app-container">
            <div className="header-container">
              <Header />
            </div>
            <Container className="content-container">
              <WarfareUnitGenerator />
            </Container>
          </div>
      )
  }
}

export default App;
