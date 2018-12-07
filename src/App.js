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
        {/* <div style={{width:'100%', height:'300px'}}> djijdqd</div> */}
      </div>
    );
  }
}

class RightContainer extends React.Component {
  render() {
    return (
      <div className="right_container">
        右边内容
      </div>
    );
  }
}

class App extends Component {
  componentDidMount () {
    let height = document.documentElement.clientHeight || document.body.clientHeight;
    console.log('height', height);
    document.getElementsByClassName('App')[0].style.height = height + 'px';
  }
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
          {/* <RightContainer/> */}
        </div>
      </div>
    );
  }
}

export default App;
