import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import MyCalendar from './component/calendar'

class TopBar extends React.Component {
  render() {
    return (
      <div className="topbar">
        我的台历
      </div>
    );
  }
}

class LeftView extends React.Component {
  render() {
    return (
      <div className="left_view">
        <MyCalendar/>
      </div>
    );
  }
}

class App extends Component {
  render() {
    return (
      <div className="App">
        {/* <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header> */}
        <TopBar/>
        <div className="wrap">
          <LeftView/>
        </div>
      </div>
    );
  }
}

export default App;
