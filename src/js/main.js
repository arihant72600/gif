import React from 'react';

import ReactDOM from 'react-dom';

var id = chrome.contextMenus.create({"title":"Generate gifs", "contexts":["selection"]});

function generateGifs(info, tab) {}

class App extends React.Component {

    render() {
  
      return (
  
        <div> Your App injected to DOM correctly! </div>
  
      )
  
    }
  
  }