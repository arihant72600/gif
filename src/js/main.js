import React from 'react';

import ReactDOM from 'react-dom';
function generateGifs(info, tab) {console.log("test");console.log(info.selectionText);console.log(process.env);}

var id = chrome.contextMenus.create({"title":"Generate gifs", "contexts":["selection"], "onclick":generateGifs});
class App extends React.Component {

    render() {
  
      return (
  
        <div> Your App injected to DOM correctly! </div>
  
      )
  
    }
  
  }





